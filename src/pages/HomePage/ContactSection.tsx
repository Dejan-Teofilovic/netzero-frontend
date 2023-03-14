import React, { lazy } from "react";
import { Button } from "@material-tailwind/react";
import { Icon } from "@iconify/react";

const SectionTitle = lazy(() => import('../../components/SectionTitle'))
const Input = lazy(() => import('../../components/Input'))


/* -------------------------------------------------------------------- */

interface IDataItem {
  id: number;
  url: string;
  icon: string
}

/* -------------------------------------------------------------------- */

const DATA: Array<IDataItem> = [
  {
    id: 1,
    url: '#',
    icon: 'ri:facebook-fill'
  },
  {
    id: 2,
    url: '#',
    icon: 'mdi:twitter'
  },
  {
    id: 3,
    url: '#',
    icon: 'mdi:youtube'
  },
  {
    id: 4,
    url: '#',
    icon: 'ph:instagram-logo-fill'
  },
  {
    id: 5,
    url: '#',
    icon: 'mdi:linkedin'
  },
  {
    id: 6,
    url: '#',
    icon: 'ic:baseline-discord'
  }
]

/* -------------------------------------------------------------------- */

export default function ContactSection() {
  return (
    <div className="py-24 lg:py-36 bg_ocean bg_cover bg_bottom px-4 lg:px-0">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-16">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <SectionTitle title="The Nori Wrap" />
            <p className="text-center lg:text-left">
              Sign up for Nori's weekly newsletter, The Nori Wrap, to stay updated on Nori news, events, job listings, and more.
            </p>
            <Input type="email" placeholder="Email address" className="text-lg border border-gray-400" />
            <Button className="bg-primary w-full rounded-md normal-case text-base">
              Sign up now
            </Button>
          </div>

          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <SectionTitle title="Say Hello 👋" />
            <p className="text-center lg:text-left">Reach out to us on social!</p>
            <div className="flex items-center gap-4">
              {DATA.map(dataItem => (
                <a key={dataItem.id} className="text-5xl text-primary" href={dataItem.url} target="_blank">
                  <Icon icon={dataItem.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}