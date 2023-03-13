import React, { lazy } from "react";
import { Button } from "@material-tailwind/react";
const SectionTitle = lazy(() => import('../../components/SectionTitle'))

/* -------------------------------------------------------------------- */

export default function PurchaseCarbonSection() {
  return (
    <div className="container max-w-6xl mx-auto flex flex-col items-center gap-16">
      <SectionTitle title="Purchase Carbon Removals Today" />
      <div className="grid grid-cols-2 gap-16 items-center">
        <div className="col-span-1">
          <div className="border-4 border-black rounded-lg">
            <img src="/assets/images/out-of-stock-accf4840961e96d809689b7ccc6796ce.png" alt="" />
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <h3 className="text-3xl font-bold">
            Pre-Order Nori Carbon Removal Tonnes (NRTs)
          </h3>
          <p>
            We're currently out of stock but are accepting pre-orders for Nori Carbon Removal Tonnes. We've received overwhelming support from people like you (thank you!) and are ramping up our supply.
          </p>
          <p>
            To place a pre-order, your card will be charged now and within 1 year you’ll get a certificate when your order is filled.
          </p>
          <Button className="bg-secondary w-full text-base text-black normal-case">
            Pre-Order
          </Button>
        </div>
      </div>
    </div>
  )
}