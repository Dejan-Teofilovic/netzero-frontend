import React from 'react'
import HeroSection from './HeroSection'
import GetInvolvedSection from './GetInvolvedSection'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-32 mt-32">
      <HeroSection />
      <GetInvolvedSection />
    </div>
  )
}