'use client';

import React, { useEffect } from 'react';
import Hero from './components/Hero/Hero';
import Service from './components/Services/Services';
import AboutPage from './components/About/About';
import Blog from './components/Blogs/Blogs';
import ContactUs from './components/ContactUs/ContactUs';
import Footer from './components/Footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div className='overflow-x-hidden scroll-smooth'> 
      <Hero />
      <section id='services'>
        <Service />
      </section>
      <section id='about'>
        <AboutPage />
      </section>
      <section id='blogs'>
        <Blog />
      </section>
      <section id='contactUs'>
        <ContactUs />
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
