'use client'

import React, { useEffect } from 'react'
import Hero from './Hero/Hero'
import Features from './Features/Features'
import CustomerSupport from './CustomerSupport/CustomerSupport'
import Price from './Price/Price'
import SupportTeams from './SuppoetTeam/SupportTeams'
import Footer from './Footer/Footer'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      anchorPlacement: "top-bottom"
    });
  }, [])

  return (
    <div>
      <Hero/>
      <Features/>
      <CustomerSupport/>
      <Price/>
      <SupportTeams/>
      <Footer/>
    </div>
  )
}

export default Home
