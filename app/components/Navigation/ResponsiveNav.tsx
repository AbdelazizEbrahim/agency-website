'use client'

import React, { useState } from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'

const ResponsiveNav = () => {

  const [showNav, setShowNav] = useState(false);
  const showNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);

  return (
    <div className='fixed top-0 left-0 w-full z-50'>
      <Nav openNav={showNavHandler} />
      <MobileNav nav={showNav} closeNav={closeNavHandler} />
    </div>
  )
}

export default ResponsiveNav
