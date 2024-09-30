'use client'

import React, { useEffect } from 'react'
import Hero from './Hero/Hero'
import Services from './Services/Services'
import AboutPage from './About/About'
import Price from './Price/Price'
import SupportTeams from './SupportTeam/SupportTeams'
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
      <Services/>
      <AboutPage/>
      <Price/>
      <SupportTeams/>
      <Footer/>
    </div>
  )
}

export default Home
