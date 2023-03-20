import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../utils/api"
import { INTERVAL_TIME } from "../utils/constants"
import { getVisibleDateTime } from "../utils/functions"
import { IMintableClaim } from "../utils/interfaces"

export default function OffsetProjects() {
  const [claims, setClaims] = useState<Array<IMintableClaim>>([])

  const getMintableClaims = async () => {
    api.get('/claim/get-mintable-claims')
      .then(response => {
        setClaims(response.data)
      })
      .catch(error => {
        console.log('>>>>>> error of getMintableClaims => ', error)
      })
  }

  useEffect(() => {
    getMintableClaims()
    const interval = setInterval(() => {
      getMintableClaims()
    }, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="container max-w-7xl mx-auto my-8">
      <h1 className="text-center font-bold text-3xl mt-4">Offset Projects</h1>
      <table className="w-full mt-8">
        <thead>
          <tr className="border-b-2 border-primary">
            <th className="pb-2 text-left">Id</th>
            <th className="pb-2 text-left">Wallet</th>
            <th className="pb-2 text-left">Carbon</th>
            <th className="pb-2 text-left">Invest</th>
            <th className="pb-2 text-left">Mintable Token</th>
            <th className="pb-2 text-left">Claimed at</th>
            <th className="pb-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {claims?.map((dataItem) => (
            <tr key={dataItem.id}>
              <td className="py-2">#{dataItem.id}</td>
              <td>{dataItem.wallet_address}</td>
              <td>{dataItem.carbon_amount} t</td>
              <td>{dataItem.eth_amount} ETH</td>
              <td>{dataItem.mintable_token_amount} NZCT</td>
              <td>{getVisibleDateTime(new Date(dataItem.created_at))}</td>
              <td>
                <Link to={`/offset/${dataItem.id}`} className="text-primary underline">Offset</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}