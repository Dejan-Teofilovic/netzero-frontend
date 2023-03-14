import React, { lazy } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper';
const SectionTitle = lazy(() => import('../../components/SectionTitle'))

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
      className="pt-4 lg:pt-16 pb-16 lg:pb-32 bg-cover flex flex-col items-center gap-8 lg:gap-16"
      style={{
        backgroundImage: 'url(/assets/images/yellow-map-bg.jpg)'
      }}
    >
      <SectionTitle title="Get Involved in the Nori Marketplace" />

      <div className="container max-w-6xl mx-auto px-4 lg:px-0">
        <div className="hidden lg:grid grid-cols-3 gap-16">
          {DATA.map(dataItem => (
            <div key={dataItem.id} className="col-span-1 flex flex-col gap-4 items-center">
              <div className="w-4/5">
                <img src={dataItem.image} alt="" />
              </div>
              <p className="text-xl font-bold text-center">{dataItem.description}</p>
            </div>
          ))}
        </div>

        <div className="block lg:hidden">
          <Swiper
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 30
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30
              }
            }}
            pagination={{ clickable: true }}
            modules={[Pagination]}
          >
            {DATA.map(dataItem => (
              <SwiperSlide key={dataItem.id}>
                <div className="flex flex-col gap-4 items-center">
                  <div className="w-4/5">
                    <img src={dataItem.image} alt="" />
                  </div>
                  <p className="text-xl font-bold text-center">{dataItem.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}