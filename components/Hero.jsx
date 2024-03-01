"use client";
import React, { useContext } from 'react';
import Nav from "./Nav";
import Header from "./Header";
import ParticlesBackground from "./ParticlesBackground";
import AboutUs from "./AboutUs";
import Services from "./Services"
import Portfolio from "./Portfolio"
import Phase from "./Phase"
import TestimonialsSlider from "./TestimonialsSlider"
import Marquee from "./Marquee"
import FAQ from "./FAQ"
import Locations from "./Locations"
import Contact from "./Contact"
import Footer from "./Footer"

import { ThemeContext } from "./ThemeContext";


const Hero = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className="mx-auto bg-white dark:bg-black text-black dark:text-white ">
      <Nav />
      <div className="relative">
        
        <div className="absolute inset-0 z-0 ">
          <ParticlesBackground key={theme}/>
        </div>
       
        <div className="relative z-10">
        <div className="absolute top-0 w-full h-screen z-0 glass-matt1">
    
  </div>
          
          <Header />
        </div>
      </div>

      
      <div className="mx-auto max-w-[1440px] relative z-10">
        <AboutUs />
        <Services/>
        <Portfolio/>
        <TestimonialsSlider/>
        <Phase/>
        <Marquee/>
        
        <FAQ/>
        <Locations/>
        <Contact/>
        <Footer/>
        
      </div>
    </section>
  );
};

export default Hero;
