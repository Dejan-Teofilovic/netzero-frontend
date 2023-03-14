import React, { lazy, Suspense } from 'react'
import Loading from '../../components/Loading'

const HeroSection = lazy(() => import('./HeroSection'))
const GetInvolvedSection = lazy(() => import('./GetInvolvedSection'))
const TrustedBySection = lazy(() => import('./TrustedBySection'))
const NotAllSection = lazy(() => import('./NotAllSection'))
const MarketDrivenSection = lazy(() => import('./MarketDrivenSection'))
const BackedBySection = lazy(() => import('./BackedBySection'))
const OurMarketplaceSection = lazy(() => import('./OurMarketplaceSection'))
const PurchaseCarbonSection = lazy(() => import('./PurchaseCarbonSection'))
const AsSeenSection = lazy(() => import('./AsSeenSection'))
const ContactSection = lazy(() => import('./ContactSection'))

/* -------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24">
      <Suspense fallback={<Loading />}>
        <div>
          <HeroSection />
          {/* <GetInvolvedSection /> */}
        </div>
        {/* <TrustedBySection /> */}
        {/* <NotAllSection /> */}
        {/* <MarketDrivenSection /> */}
        {/* <BackedBySection /> */}
        {/* <OurMarketplaceSection /> */}
        {/* <PurchaseCarbonSection /> */}
        {/* <AsSeenSection /> */}
        {/* <ContactSection /> */}
      </Suspense>
    </div>
  )
}