import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import HowItWorks from '../components/home/HowItWorks'
import CTA from '../components/home/CTA'
import StatsBar from '../components/home/StatsBar'
import CategoryChips from '../components/home/CategoryChips'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Testimonials from '../components/home/Testimonials'
import Partners from '../components/home/Partners'

const Home = () => {
  const { user } = useAuth()

  return (
    <div>
      <Hero user={user} />
      <StatsBar />
      <CategoryChips />
      <section id="portfolio" className="scroll-mt-28 md:scroll-mt-32">
        <FeaturedProducts />
      </section>
      <section id="services" className="scroll-mt-28 md:scroll-mt-32">
        <Features />
      </section>
      <section id="how-it-works" className="scroll-mt-28 md:scroll-mt-32">
        <HowItWorks />
      </section>
      <section id="testimonials" className="scroll-mt-28 md:scroll-mt-32">
        <Testimonials />
      </section>
      <Partners />
      <section id="contact" className="scroll-mt-28 md:scroll-mt-32">
        <CTA user={user} />
      </section>
    </div>
  )
}

export default Home
