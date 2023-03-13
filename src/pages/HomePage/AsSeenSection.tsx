import React, { lazy } from "react";
const SectionTitle = lazy(() => import('../../components/SectionTitle'))

/* -------------------------------------------------------------------- */

interface IDataItem {
  id: number;
  image: string;
}

/* -------------------------------------------------------------------- */

const DATA: Array<IDataItem> = [
  {
    id: 1,
    image: '/assets/images/The_New_York_Times_logo.png'
  },
  {
    id: 2,
    image: '/assets/images/seen-coindesk.png'
  },
  {
    id: 3,
    image: '/assets/images/1200px-The_Logo_of_The_Washington_Post_Newspaper.svg.png'
  },
  {
    id: 4,
    image: '/assets/images/CNBC_logo_horizontal.png'
  },
  {
    id: 5,
    image: '/assets/images/1280px-Fast_Company_logo.svg.png'
  },
  {
    id: 6,
    image: '/assets/images/seen-wsj.png'
  },
  {
    id: 7,
    image: '/assets/images/seen-techcrunch.png'
  },
  {
    id: 8,
    image: '/assets/images/seen-geekwire.png'
  },
  {
    id: 9,
    image: '/assets/images/npr-logo 2.png'
  },
  {
    id: 10,
    image: '/assets/images/logo-ieee-spectrum.png'
  },
  {
    id: 11,
    image: '/assets/images/the nature conservancy logo.png'
  },
  {
    id: 12,
    image: '/assets/images/Polygon_blockchain_logo.png'
  },
  {
    id: 13,
    image: '/assets/images/messari-logo-vector 2.png'
  },
  {
    id: 14,
    image: '/assets/images/seen-usatoday.png'
  },
  {
    id: 15,
    image: '/assets/images/dezeen_dezeens-new-logo_1 (1) 1.png'
  }
]

/* -------------------------------------------------------------------- */

export default function AsSeenSection() {
  return (
    <div className="container max-w-6xl mx-auto flex flex-col items-center gap-16">
      <SectionTitle title="As Seen In" />
      <div className="grid grid-cols-3 gap-8 items-center">
        {DATA.map(dataItem => (
          <div key={dataItem.id} className="col-span-1 flex justify-center">
            <img src={dataItem.image} alt="" className="w-3/5 h-fit" />
          </div>
        ))}
      </div>
    </div>
  )
}