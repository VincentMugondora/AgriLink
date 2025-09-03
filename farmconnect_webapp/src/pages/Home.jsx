import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import HowItWorks from '../components/home/HowItWorks'
import CTA from '../components/home/CTA'

const Home = () => {
  const { user } = useAuth()

  return (
    <div>
      <Hero user={user} />
      <Features />
      <HowItWorks />
      <CTA user={user} />
    </div>
  )
}

export default Home
