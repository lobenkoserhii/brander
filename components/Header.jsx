import React, { useContext, useEffect } from 'react';
import gsap from 'gsap';
import Link from "next/link";
import { ThemeContext } from "./ThemeContext"; 

const Header = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
   
    const tl = gsap.timeline({ paused: true });
    tl.to('.gradient-text', {
      duration: 2,
      backgroundPosition: '100% 0',
      repeat: -1,
      yoyo: true,
      ease: "linear"
    });

   
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tl.play();
        } else {
          tl.pause();
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.1
    });

    
    const element = document.querySelector('.gradient-text');
    if (element) observer.observe(element);

    
    return () => {
      if (element) observer.unobserve(element);
      tl.kill();
    };
  }, []);

  
  const gradientClass = theme === 'dark' ? 'radial-gradient-background dark' : 'radial-gradient-background';

  return (
    <header className="relative mt-[200px] w-full overflow-hidden">
      <div className="relative absolute inset-0 flex justify-center items-center">
        <div className={`${gradientClass}z-10 w-[870px] mx-[70px] my-16 flex flex-col justify-center items-center gap-6 text-black dark:text-white`}>
          <div className="text-center text-4xl leading-[43.20px] TB:text-[64px] font-bold TB:leading-[76.80px]">
            <span>Elevate Your </span>
            <span className="gradient-text">Brand<br/></span>
            <span> with Brander's Expertise</span>
          </div>
          <div className="text-center text-xl font-medium leading-[30px]">
            Welcome to Brander, where innovation meets creativity to transform your business. As Toronto's premier branding and web development agency, we specialize in turning your vision into a reality. Our strategic approach combines in-depth research, creative design, and the latest digital solutions to propel your brand to the forefront of your industry.
          </div>
          <Link href="/contacts" passHref 
            className="px-6 py-3 rounded-[30px] border-solid border border-black dark:border-white dark:text-white dark:hover:text-Bl hover:bg-black hover:text-white dark:hover:bg-white justify-center items-center gap-2 flex text-lg dark:transition dark:ease-in-out cursor-pointer">
              Get Started
           
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
