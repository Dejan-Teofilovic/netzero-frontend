import React, { useEffect, useState } from "react"
import useLoading from "../hooks/useLoading"
import useUser from "../hooks/useUser"
import api from "../utils/api"
import { getVisibleDateTime } from "../utils/functions"
import { IMyClaim } from "../utils/interfaces"

export default function MyClaims() {
  const { user } = useUser()
  const { openLoading, closeLoading } = useLoading()

  const [claims, setClaims] = useState<Array<IMyClaim>>()

  useEffect(() => {
    openLoading()
    api.get(`/claim/get-claims-by-user-id/${user?.id}`)
      .then(response => {
        setClaims(response.data)
        closeLoading()
      })
      .catch(error => {
        closeLoading()
        console.log('>>>>>>> error of getClaimsByUserId => ', error)
      })
  }, [])

  return (
    <div className="container max-w-7xl mx-auto my-8">
      <h1 className="text-center font-bold text-3xl mt-4">My Claims</h1>

      <table className="w-full mt-8">
        <thead>
          <tr className="border-b-2 border-primary">
            <th className="pb-2 text-left">No</th>
            <th className="pb-2 text-left">Wallet</th>
            <th className="pb-2 text-left">Carbon</th>
            <th className="pb-2 text-left">Token</th>
            <th className="pb-2 text-left">Invest</th>
            <th className="pb-2 text-left">Mintable Token</th>
            <th className="pb-2 text-left">Claimed at</th>
          </tr>
        </thead>
        <tbody>
          {claims?.map((dataItem, index) => (
            <tr key={dataItem.id}>
              <td className="py-2">{index + 1}</td>
              <td>{dataItem.wallet_address}</td>
              <td>{dataItem.carbon_amount} t</td>
              <td>{dataItem.token_amount} NZCT</td>
              <td>{dataItem.eth_amount} ETH</td>
              <td>{dataItem.mintable_token_amount} NZCT</td>
              <td>{getVisibleDateTime(new Date(dataItem.created_at))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}