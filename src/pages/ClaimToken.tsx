import React, { ChangeEvent, useEffect, useMemo, useState } from "react"
import { Button } from "@material-tailwind/react"
import { useWeb3Modal } from "@web3modal/react"
import { useAccount, useDisconnect, usePrepareSendTransaction, useSendTransaction, useSigner, useWaitForTransaction } from "wagmi"
import { utils } from "ethers"
import { Icon } from "@iconify/react"
import useAlertMessage from "../hooks/useAlertMessage"
import useWalletAddress from "../hooks/useWalletAddress"
import useLoading from '../hooks/useLoading'
import useUser from "../hooks/useUser"
import Input from "../components/Input"
import { ADMIN_WALLET_ADDRESS, FEE_PERCENTAGE_FOR_PLATFORM, RATIO_ETH_TO_NZCT, RATIO_NZCT_TO_CARBON, REGEX_NUMBER_VALID } from "../utils/constants"
import api from "../utils/api"

export default function ClaimToken() {
  const { open } = useWeb3Modal()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: signer } = useSigner()

  const { openLoading, closeLoading } = useLoading()
  const { openAlert } = useAlertMessage()
  const { user } = useUser()
  const { connectWalletAct, walletAddressId } = useWalletAddress()

  const [carbonAmount, setCarbonAmount] = useState<string>('0')
  const [tokenAmount, setTokenAmount] = useState<string>('0')
  const [ethAmount, setEthAmount] = useState<string>('0')

  const fee = useMemo<number>(() => {
    if (ethAmount) {
      return Number(ethAmount) * FEE_PERCENTAGE_FOR_PLATFORM
    }
    return 0.0000
  }, [ethAmount])

  const { config, isError } = usePrepareSendTransaction({
    request: {
      to: ADMIN_WALLET_ADDRESS,
      value: utils.parseEther(`${Number(ethAmount) + Number(fee)}` || '0'),
    },
    signer,
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      api.post('/claim/create', {
        tokenAmount: Number(tokenAmount),
        ethAmount: Number(ethAmount),
        carbonAmount: Number(carbonAmount),
        feeAmount: fee,
        walletAddressId
      }).then(response => {
        closeLoading()
        openAlert({
          color: 'green',
          icon: <Icon icon="material-symbols:check-small-rounded" className="text-2xl" />,
          title: 'Success',
          message: 'Claim is registered.'
        })
      }).catch(error => {
        closeLoading()
        openAlert({
          color: 'red',
          icon: <Icon icon="fluent-mdl2:status-error-full" className="text-2xl" />,
          title: 'Error',
          message: error?.response?.statusText || 'Claim error.'
        })
      })
    }
  });

  useEffect(() => {
    if (isLoading) {
      openLoading();
    }
  }, [isLoading]);

  useEffect(() => {
    if (address && user) {
      openLoading()
      connectWalletAct(user?.id, address)
    }
  }, [address, user])

  const handleClaim = () => {
    sendTransaction?.();
  };

  //  Input carbon amount
  const handleCarbonAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value.match(REGEX_NUMBER_VALID)) {
      const _tokenAmount = Number(value) / RATIO_NZCT_TO_CARBON
      const _ethAmount = _tokenAmount * RATIO_ETH_TO_NZCT

      setCarbonAmount(value)
      setTokenAmount(`${_tokenAmount}`)
      setEthAmount(`${_ethAmount}`)
    }
  }

  //  Input token amount
  const handleTokenAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value.match(REGEX_NUMBER_VALID)) {
      const _carbonAmount = Number(value) * RATIO_NZCT_TO_CARBON
      const _ethAmount = Number(value) * RATIO_ETH_TO_NZCT

      setTokenAmount(value)
      setCarbonAmount(`${_carbonAmount}`)
      setEthAmount(`${_ethAmount}`)
    }
  }

  //  Input ethereum amount
  const handleEthAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value.match(REGEX_NUMBER_VALID)) {
      const _tokenAmount = Number(value) / RATIO_ETH_TO_NZCT
      const _carbonAmount = _tokenAmount * RATIO_NZCT_TO_CARBON

      setEthAmount(value)
      setTokenAmount(`${_tokenAmount}`)
      setCarbonAmount(`${_carbonAmount}`)
    }
  }

  return (
    <div className="container max-w-md mx-auto my-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-center font-bold text-3xl mt-4">Claim Token</h1>

        <div className="flex flex-col gap-4 mt-8">
          {/* Carbon amount */}
          <div className="flex flex-col gap-1">
            <label htmlFor="carbonAmount">Carbon</label>
            <Input
              id="carbonAmount"
              className="border border-gray-400 rounded-md"
              endAdornment={<span>t</span>}
              value={carbonAmount}
              onChange={handleCarbonAmount}
            />
          </div>

          {/* Token amount */}
          <div className="flex flex-col gap-1">
            <label htmlFor="tokenAmount">Token</label>
            <Input
              id="tokenAmount"
              name="tokenAmount"
              className="border border-gray-400 rounded-md"
              value={tokenAmount}
              onChange={handleTokenAmount}
              endAdornment={<span>NZCT</span>}
            />
          </div>

          {/* Eth amount */}
          <div className="flex flex-col gap-1">
            <label htmlFor="ethAmount">Ethereum</label>
            <Input
              id="ethAmount"
              name="ethAmount"
              className="border border-gray-400 rounded-md"
              value={ethAmount}
              onChange={handleEthAmount}
              endAdornment={<span>ETH</span>}
            />
          </div>

          {/* Fee amount */}
          <div className="flex flex-col gap-1">
            <label htmlFor="ethAmount">Fee</label>
            <span>{fee.toFixed(4)} ETH</span>
          </div>
        </div>
        <div className="flex justify-between items-center px-8 mt-8">
          {isConnected ? (
            <Button
              className="bg-primary normal-case rounded-sm text-base"
              onClick={() => disconnect()}
            >Disconnect wallet</Button>
          ) : (
            <Button
              className="bg-primary normal-case rounded-sm text-base"
              onClick={() => open()}
            >Connect Wallet</Button>
          )}
          <Button
            className="bg-primary normal-case rounded-sm text-base"
            disabled={!isConnected || fee <= 0 || isError}
            onClick={handleClaim}
          >Claim Token</Button>
        </div>
      </div>
    </div>
  )
}