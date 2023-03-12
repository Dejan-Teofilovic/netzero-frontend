import React from 'react'
import HeroSection from './HeroSection'
import GetInvolvedSection from './GetInvolvedSection'
import TrustedBySection from './TrustedBySection'
import NotAllSection from './NotAllSection'
import MarketDrivenSection from './MarketDrivenSection'

/* -------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24">
      <div>
        <HeroSection />
        <GetInvolvedSection />
      </div>
      <TrustedBySection />
      <NotAllSection />
      <MarketDrivenSection />
    </div>
  )
}