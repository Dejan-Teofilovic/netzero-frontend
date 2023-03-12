import React from "react"
import SectionTitle from "../../components/SectionTitle";

/* -------------------------------------------------------------------- */

interface IData {
  id: number;
  image: string;
  description: string;
}

/* -------------------------------------------------------------------- */

const DATA: Array<IData> = [
  {
    id: 1,
    image: '/assets/images/Buy carbon removal 4.png',
    description: 'Track details with your unique certificate'
  },
  {
    id: 2,
    image: '/assets/images/Buy NORI 4.png',
    description: 'Stay updated on when the NORI token launches'
  },
  {
    id: 3,
    image: '/assets/images/sell carbon 5.png',
    description: "Get paid for your farm's soil carbon"
  }
]

/* -------------------------------------------------------------------- */

export default function GetInvolvedSection() {
  return (
    <div
      className="pt-16 pb-32 bg-cover"
      style={{
        backgroundImage: 'url(/assets/images/yellow-map-bg.jpg)'
      }}
    >
      <SectionTitle title="Get Involved in the Nori Marketplace" />

      <div className="container max-w-6xl mx-auto mt-16">
        <div className="grid grid-cols-3 gap-16">
          {DATA.map(dataItem => (
            <div key={dataItem.id} className="col-span-1 flex flex-col gap-4 items-center">
              <div className="w-4/5">
                <img src={dataItem.image} alt="" />
              </div>
              <p className="text-xl font-bold text-center">{dataItem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}