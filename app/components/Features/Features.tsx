import React from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import FeatureCard from './FeatureCard'
import icon1 from '@/public/icon1.png'
import icon2 from '@/public/icon2.png'
import icon3 from '@/public/icon3.png'
import icon4 from '@/public/icon4.png'
import icon5 from '@/public/icon5.png'

const Features = () => {
  return (
    <div>
      <div className='pt-[5rem] pb-[3rem]'>
        <SectionHeading
           headingMini="Ideal Solution for You"
           headingPrimary="Explore Ultimate Features"
        />
        <div className='pt-[5rem] w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            items-center gap-[1.4rem]'>
              <div>
                <FeatureCard title={"Email Subscription"} image={icon1.src}/>
               </div>
               <div>
                <FeatureCard title={"Email Subscription"} image={icon2.src}/>
               </div>
               <div>
                <FeatureCard title={"Email Subscription"} image={icon3.src}/>
               </div>
               <div>
                <FeatureCard title={"Email Subscription"} image={icon4.src}/>
               </div>
               <div>
                <FeatureCard title={"Email Subscription"} image={icon5.src}/>
               </div>
               <div>
                <FeatureCard title={"Email Subscription"} image={icon1.src}/>
               </div>
        </div>
      </div>
    </div>
  )
}

export default Features
