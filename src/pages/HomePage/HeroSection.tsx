import React, { ReactNode } from "react"
import { Icon } from "@iconify/react";
import parse from 'html-react-parser'

/* -------------------------------------------------------------------- */

interface IItem {
  id: number;
  icon: ReactNode;
  label: string;
  description: string;
}

/* -------------------------------------------------------------------- */

const ITEMS: Array<IItem> = [
  {
    id: 1,
    icon: <Icon icon="fluent:leaf-three-20-filled" className="text-3xl lg:text-5xl text-white" />,
    label: '18+',
    description: 'Carbon Removal Projects'
  },
  {
    id: 2,
    icon: <Icon icon="fluent:earth-leaf-16-filled" className="text-3xl lg:text-5xl text-white" />,
    label: '123k<sup>+</sup>',
    description: 'Tonnes of Carbon Removed'
  },
  {
    id: 3,
    icon: <Icon icon="material-symbols:account-balance-wallet" className="text-3xl lg:text-5xl text-white" />,
    label: '$1.8m<sup>+</sup>',
    description: 'Paid to Farmers'
  }
]

/* -------------------------------------------------------------------- */

export default function HeroSection() {
  return (
    <div
      className="pt-16 lg:pt-32 pb-32 lg:pb-64 bg-cover"
      style={{
        background: 'url(/assets/images/home-bg-hero.png) no-repeat',
        backgroundPosition: 'bottom'
      }}
    >
      <div className="container max-w-6xl mx-auto relative flex flex-col gap-16 lg:gap-32 px-4 lg:px-0">
        <div className="grid grid-cols-2 items-center gap-12">
          <div className="col-span-2 lg:col-span-1">
            <h1 className="text-white text-3xl lg:text-6xl font-black text-center lg:text-left lg:leading-tight">
              Own, Track, and Showcase Verified Carbon Removal
            </h1>
            <p className="text-white font-bold text-center lg:text-left text-md lg:text-xl mt-4">
              Reverse climate change with the most transparent carbon removal marketplace
            </p>
          </div>

          <div className="col-span-2 lg:col-span-1 flex justify-center">
            <img src="/assets/images/hero_certificate.png" alt="Hero Certificate" className="w-4/5" />
          </div>
        </div>

        <div className="grid lg:hidden grid-cols-3">
          {ITEMS.map(item => (
            <div key={item.id} className="col-span-1 flex flex-col items-center gap-2">
              {item.icon}
              <span className="text-3xl lg:text-6xl text-white font-extrabold">{parse(item.label)}</span>
              <span className="text-center text-sm lg:text-xl text-white font-bold">{item.description}</span>
            </div>
          ))}
        </div>
        <div className="hidden lg:flex items-center justify-between relative">
          {ITEMS.map(item => (
            <div key={item.id} className="flex flex-col items-center gap-2">
              {item.icon}
              <span className="text-3xl lg:text-6xl text-white font-extrabold">{parse(item.label)}</span>
              <span className="text-center text-sm lg:text-xl text-white font-bold">{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}