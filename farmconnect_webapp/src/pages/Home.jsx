import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import HeroNav from '../components/home/HeroNav'
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
      <HeroNav />
      <Hero user={user} />
      <StatsBar />
      <CategoryChips />
      <FeaturedProducts />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Partners />
      <CTA user={user} />
    </div>
  )
}

export default Home
