import { Icon } from "@iconify/react";
import { Button } from "@material-tailwind/react";
import { useWeb3Modal } from "@web3modal/react";
import { utils } from "ethers";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount, useContractWrite, useDisconnect, usePrepareContractWrite, useSigner, useWaitForTransaction } from "wagmi";
import Input from "../components/Input";
import useAlertMessage from "../hooks/useAlertMessage";
import useLoading from "../hooks/useLoading";
import useUser from "../hooks/useUser";
import useWalletAddress from "../hooks/useWalletAddress";
import api from "../utils/api";
import { CHAIN_ID, CONTRACT_ABI, CONTRACT_ADDRESS, FEE_OF_OFFSETTER, RATIO_ETH_TO_NZCT, RATIO_NZCT_TO_CARBON, REGEX_NUMBER_VALID } from "../utils/constants";
import { IClaim, IMyClaim } from "../utils/interfaces";

export default function OffsetCarbon() {
  const navigate = useNavigate()
  const { claimId } = useParams()
  const { open } = useWeb3Modal()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: signer } = useSigner();
  const { user } = useUser()
  const { connectWalletAct } = useWalletAddress()
  const { openLoading, closeLoading } = useLoading()
  const { openAlert } = useAlertMessage()

  const [claim, setClaim] = useState<IMyClaim>({
    id: 0,
    id_wallet_address: 0,
    wallet_address: '',
    token_amount: 0,
    eth_amount: 0,
    carbon_amount: 0,
    fee_amount: 0,
    mintable_token_amount: 0,
    created_at: '',
    updated_at: ''
  })
  const [carbonAmount, setCarbonAmount] = useState<string>('0')
  const [ethAmount, setEthAmount] = useState<string>('0')
  const [tokenAmount, setTokenAmount] = useState<number>(0)

  const getClaimById = () => {
    api.get(`/claim/get-claim-by-id/${claimId}`)
      .then(response => {
        console.log('>>>>> claim => ', response.data)
        setClaim(response.data)
      })
      .catch(error => {
        console.log('>>>>>>> error of getClaimById => ', error)
      })
  }

  const fee = useMemo<number>(() => {
    if (ethAmount) {
      return Number(ethAmount) * FEE_OF_OFFSETTER
    }
    return 0.0000
  }, [ethAmount])

  useEffect(() => {
    getClaimById()
  }, [claimId])

  useEffect(() => {
    if (address && user) {
      openLoading()
      connectWalletAct(user?.id, address)
    }
  }, [address])


  const disabledMaxButton = useMemo<boolean>(() => {
    const _carbonAmount = Number(carbonAmount)
    const _tokenAmount = _carbonAmount / RATIO_NZCT_TO_CARBON

    if (_tokenAmount >= claim.mintable_token_amount) {
      return true
    }

    return false
  }, [carbonAmount])

  //  Input carbon amount
  const handleCarbonAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value.match(REGEX_NUMBER_VALID)) {
      const _tokenAmount = Number(value) / RATIO_NZCT_TO_CARBON
      const _ethAmount = _tokenAmount * RATIO_ETH_TO_NZCT

      setCarbonAmount(value)
      setEthAmount(`${_ethAmount}`)
      setTokenAmount(_tokenAmount)
    }
  }

  //  Set the maximum amount of carbon can be offset
  const setMaximumCarbonAmount = () => {
    const _carbonAmount = claim.mintable_token_amount * RATIO_NZCT_TO_CARBON
    const _tokenAmount = _carbonAmount / RATIO_NZCT_TO_CARBON
    const _ethAmount = _tokenAmount * RATIO_ETH_TO_NZCT

    setCarbonAmount(`${_carbonAmount}`)
    setEthAmount(`${_ethAmount}`)
    setTokenAmount(_tokenAmount)
  }


  /* ------------------ Mint NZCT token into the claimer wallet --------------- */
  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'mint',
    args: [claim.wallet_address, utils.parseUnits(`${tokenAmount}` || '0', 9)],
    chainId: CHAIN_ID,
    signer
  });

  const { data, write } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async () => {
      await api.post('/wallet/send-eth-to-offsetter', {
        claimId,
        claimedTokenAmount: claim.token_amount,
        walletAddress: address,
        ethAmount,
        feeAmount: fee,
        tokenAmount,
        carbonAmount
      })
      openAlert({
        color: 'green',
        icon: <Icon icon="material-symbols:check-small-rounded" className="text-2xl" />,
        title: 'Success',
        message: 'Your offset is registered. The reward has been sent to your wallet.'
      })
      closeLoading()
      navigate('/offset-projects')
    },
    onError: (error) => {
      console.log('>>>>>>> error => ', error)
      closeLoading();
    }
  });

  const handleOffset = async () => {
    try {
      openLoading()
      await api.get('/wallet/enable-mint')
      write?.();

    } catch (error) {
      console.log('>>>>>> error => ', error)
      closeLoading()
      openAlert({
        color: 'red',
        icon: <Icon icon="fluent-mdl2:status-error-full" className="text-2xl" />,
        title: 'Error',
        message: 'Offset Carbon error.'
      })
    }
  }

  useEffect(() => {
    if (isLoading) {
      openLoading();
    }
  }, [isLoading]);
  /* ------------------------------------------------------------------------------ */



  return (
    <div className="container max-w-md mx-auto my-8">
      <h1 className="text-center font-bold text-3xl mt-4">Offset Carbon</h1>

      <div className="flex flex-col gap-4 mt-8">
        {/* Carbon amount */}
        <div className="flex flex-col gap-1">
          <label htmlFor="carbonAmount">Carbon</label>
          <Input
            id="carbonAmount"
            className="border border-gray-400 rounded-md"
            endAdornment={
              <div className="flex items-center gap-4">
                <span>t</span>
                <Button
                  variant="text"
                  className="text-primary py-0 px-0"
                  disabled={disabledMaxButton}
                  onClick={setMaximumCarbonAmount}
                >Max</Button>
              </div>
            }
            value={carbonAmount}
            onChange={handleCarbonAmount}
          />
        </div>

        {/* Reward amount */}
        <div className="flex flex-col gap-1">
          <label htmlFor="carbonAmount">Reward</label>
          <Input
            id="carbonAmount"
            className="border border-gray-400 rounded-md"
            endAdornment={<span>ETH</span>}
            value={ethAmount}
            disabled
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
          disabled={!isConnected || fee <= 0}
          onClick={handleOffset}
        >Offset Carbon</Button>
      </div>
    </div>
  )
}