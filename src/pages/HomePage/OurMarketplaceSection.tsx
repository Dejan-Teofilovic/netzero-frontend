import React, { lazy } from "react";
const SectionTitle = lazy(() => import('../../components/SectionTitle'))

/* -------------------------------------------------------------------- */

interface IDataItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

/* -------------------------------------------------------------------- */

const DATA: Array<IDataItem> = [
  {
    id: 1,
    image: '/assets/images/NFT marketplaces.png',
    title: 'NFT Marketplaces',
    description: 'Partners like Rarible reduce their carbon footprint by empowering NFT creators and collectors to remove carbon.'
  },
  {
    id: 2,
    image: '/assets/images/blockchain transparency.png',
    title: 'Blockchain Transparency',
    description: 'We bring transparency to carbon-markets with blockchain by publicy recording when carbon removal is bought and retired.'
  },
  {
    id: 3,
    image: '/assets/images/monthly subscriptions.png',
    title: 'Monthly Subscriptions',
    description: 'The Sandbox’s monthly carbon removal subscription reverses their carbon emissions from in-game NFTs.'
  }
]

/* -------------------------------------------------------------------- */

export default function OurMarketplaceSection() {
  return (
    <div className="bg-blue-900 py-24">
      <div className="container max-w-6xl mx-auto flex flex-col items-center gap-16">
        <SectionTitle className="text-white" title="Our Marketplace is Built with Web3 In Mind" />
        <div className="grid grid-cols-3 gap-8">
          {DATA.map(dataItem => (
            <div key={dataItem.id} className="col-span-1 flex flex-col items-center gap-8">
              <div className="flex justify-center">
                <img src={dataItem.image} alt="" className="w-4/5" />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h3 className="text-white text-center text-xl font-bold">{dataItem.title}</h3>
                <p className="text-white text-center text-base">{dataItem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}