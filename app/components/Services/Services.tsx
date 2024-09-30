import React, { useEffect, useState } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import FeatureCard from './ServiceCard';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

// Define the shape of a feature
interface Feature {
  title: string;
  image: string;
  description: string;
}

const Features = () => {
  const [features, setFeatures] = useState<Feature[]>([]); 

  useEffect(() => {
    const fetchFeatures = async () => {
      const response = await fetch('/api/services'); 
      const data = await response.json(); 
      console.log("data: ", data);
      setFeatures(data);
    };

    fetchFeatures();
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <div>
      <div className='pt-[5rem] pb-[3rem]'>
        <SectionHeading
           headingMini="Ideal Solution for You"
           headingPrimary="Explore Ultimate Features"
        />
        <div className='pt-[5rem] w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-[1.4rem]'>
          {features.map((feature, index) => (
            <div 
              key={index}
              data-aos="zoom-in"  
              data-aos-delay={index * 200} // Dynamic delay based on index
              data-aos-anchor-placement='top-center'
            >
              <FeatureCard 
                title={feature.title} 
                image={feature.image} 
                description={feature.description} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
