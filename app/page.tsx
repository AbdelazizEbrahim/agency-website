'use client'

import React from 'react'
import { useEffect } from 'react'
import Hero from './components/Hero/Hero'
import Features from './components/Services/Services'
import CustomerSupport from './components/About/About'
import SupportTeams from './components/SupportTeam/SupportTeams'
import Footer from './components/Footer/Footer'
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      anchorPlacement: "top-bottom"
    });
  }, [])

  return (
<div className='overflow-x-hidden scroll-smooth'> 
      <Hero/>
     <section id='services'>
         
      </section>
      <section id='about'>
         <Features/>
      </section>
      <section id='blogs'>
        <CustomerSupport/>
      </section>
      <section id='contactUs'>
         <SupportTeams/>
      </section>
      <section id='services'>
         <Footer/>
      </section>
    </div>
  )
}

export default HomePage
