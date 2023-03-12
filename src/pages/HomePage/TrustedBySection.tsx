import React from "react";
import { Button } from "@material-tailwind/react";
import SectionTitle from "../../components/SectionTitle";

/* -------------------------------------------------------------------- */

interface IData {
  id: number;
  image: string;
}

/* -------------------------------------------------------------------- */

const DATA: Array<IData> = [
  {
    id: 1,
    image: '/assets/images/logogroup-rarible.png'
  },
  {
    id: 2,
    image: '/assets/images/logogroup-sandbox.png'
  },
  {
    id: 3,
    image: '/assets/images/logogroup-freshpet.png'
  },
  {
    id: 4,
    image: '/assets/images/logogroup-avalanche.png'
  },
  {
    id: 5,
    image: '/assets/images/logogroup-coinfund.png'
  },
  {
    id: 6,
    image: '/assets/images/logogroup-shopify.png'
  },
  {
    id: 7,
    image: '/assets/images/ForGround Bayer_green.png'
  },
  {
    id: 8,
    image: '/assets/images/logogroup-imogen.png'
  },
  {
    id: 9,
    image: '/assets/images/logogroup-orange-comet.png'
  },
]

/* -------------------------------------------------------------------- */

export default function TrustedBySection() {
  return (
    <div className="relative">
      <img
        src="/assets/images/white-leaves-bg.jpg"
        alt=""
        className="absolute w-full h-full top-0 object-fill"
      />
      <div className="container max-w-6xl mx-auto flex flex-col items-center gap-12 relative pb-24">
        <SectionTitle title="We're Trusted By" />
        <div className="grid grid-cols-3 gap-8 items-center">
          {DATA.map(dataItem => (
            <div key={dataItem.id} className="col-span-1 flex justify-center">
              <img src={dataItem.image} alt="" className="w-3/5 h-fit" />
            </div>
          ))}
        </div>
        <div className="max-w-xl mx-auto">
          <p className="text-center text-base">
            Join a community of people passionate about reversing climate change. Our Discord community features much more info on Nori, the NORI token, and is the best place to meet the Nori team, network, and ask any questions.
          </p>
        </div>
        <Button className="bg-primary rounded-md normal-case text-base">
          Join the Nori Discord Community
        </Button>
      </div>
    </div>
  )
}