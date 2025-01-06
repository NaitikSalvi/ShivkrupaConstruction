import Aboutus from '@/components/Aboutus'
import Faq from '@/components/Faq'
import FeaturedProperty from '@/components/FeaturedProperty'
import Hero from '@/components/Hero'
import HowItsWork from '@/components/HowItsWork'
import Navbar from '@/components/Navbar'
import Reviews from '@/components/Reviews'
import Services from '@/components/Services'
import Footer from '@/components/Footer'
import React from 'react'


export const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <HowItsWork/>
    <FeaturedProperty/>
    <Services/>
    <Aboutus/>
    <Reviews/>
    <Faq/>
    <Footer/>
    </>
  )
}

export default Home