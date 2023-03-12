import React from "react";
import SectionTitle from "../../components/SectionTitle";

/* -------------------------------------------------------------------- */

interface IDataItem1 {
  id: number;
  image: string;
}

interface IDataItem2 {
  id: number;
  title: string;
  description: string;
  image: string;
}

/* -------------------------------------------------------------------- */

const DATA_1: Array<IDataItem1> = [
  {
    id: 1,
    image: '/assets/images/logogroup-m13.jpg'
  },
  {
    id: 2,
    image: '/assets/images/logogroup-toyota.jpg'
  },
  {
    id: 3,
    image: '/assets/images/logogroup-placeholder.jpg'
  },
  {
    id: 4,
    image: '/assets/images/logogroup-northisland.jpg'
  },
  {
    id: 5,
    image: '/assets/images/logogroup-cargill.png'
  },
  {
    id: 6,
    image: '/assets/images/logogroup-tenaciousv.png'
  },
  {
    id: 7,
    image: '/assets/images/logogroup-techstars.jpg'
  }
]

const DATA_2: Array<IDataItem2> = [
  {
    id: 1,
    title: 'See and Track the Carbon Removal You Pay For',
    description: 'Verify it’s real (don’t just trust us). See who you paid and keep track of the project’s practices over its lifetime straight from your certificate.',
    image: '/assets/images/rarible_certificate.jpg'
  },
  {
    id: 2,
    title: 'Credible, Third Party Verified and Quantified Carbon Removals',
    description: 'Our partners help quantify the amount of carbon removed from each project, and independent verifiers then audit the projects to ensure practice changes and land authority.',
    image: '/assets/images/verified carbon removals.jpg'
  },
  {
    id: 3,
    title: 'No Double-Counting, Ever',
    description: 'We require buyers to state where they bought NRTs from, which allows us to transparently report where Nori’s carbon removals are supplied and purchased.',
    image: '/assets/images/removal location.jpg'
  }
]

/* -------------------------------------------------------------------- */

export default function BackedBySection() {
  return (
    <div className="flex flex-col gap-24">
      <div className="container max-w-5xl mx-auto flex flex-col items-center gap-16">
        <SectionTitle title="Backed By" />
        <div className="grid grid-cols-3 gap-8">
          {DATA_1.map(dataItem => (
            <div key={dataItem.id} className="col-span-1 flex justify-center">
              <img src={dataItem.image} alt="" className="w-3/5 h-fit" />
            </div>
          ))}
        </div>
      </div>

      <div className="container max-w-5xl mx-auto flex flex-col gap-24">
        {DATA_2.map(dataItem => (
          <div key={dataItem.id} className="grid grid-cols-2 items-center gap-8">
            {dataItem.id % 2 === 1 ? (
              <>
                <div className="col-span-1">
                  <h3 className="text-3xl font-bold">{dataItem.title}</h3>
                  <p className="mt-4">{dataItem.description}</p>
                </div>
                <div className="col-span-1">
                  <img src={dataItem.image} alt="" />
                </div>
              </>
            ) : (
              <>
                <div className="col-span-1">
                  <img src={dataItem.image} alt="" />
                </div>
                <div className="col-span-1">
                  <h3 className="text-3xl font-bold">{dataItem.title}</h3>
                  <p className="mt-4">{dataItem.description}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}