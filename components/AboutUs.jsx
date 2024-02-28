import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { AUs } from "@/constants";

// Определение вариантов анимации для контейнера и дочерних элементов
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

function AboutUs() {
  const controls = useAnimation();
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        } else {
          controls.start('hidden');
        }
      },
      {
        threshold: 0.1, // Настройте значение по необходимости
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      className='max-w-[1440px] mx-auto my-10 bg-white dark:bg-black text-black dark:text-white mx-[70px]'
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="px-5 py-[60px] flex flex-col justify-center items-center gap-12 mx-10">
        <motion.div className="flex flex-col justify-center items-center gap-3" variants={childVariants}>
          <div className="text-center text-4xl font-bold leading-[43.20px]">
            Transform Your Business with Innovative Branding Solutions
          </div>
          <div className="text-center text-base font-normal leading-normal">
          Brander is Toronto's premier branding and web development agency, specializing in innovative brand strategies, captivating visual identities, and cutting-edge web design and development. We combine in-depth research, creative design, and the latest digital solutions to transform your business and propel your brand to the forefront of your industry. Unlock your brand's potential and stay ahead of the competition with our strategic approach. Learn more about how Brander can help you achieve your business goals and sign up for our services today.
          </div>
        </motion.div>
        <motion.div className="w-full TB:flex TB:flex-row mt-5 TB:justify-between gap-5" variants={containerVariants}>
          {AUs.map(({ src, alt, title, text }, index) => (
            <motion.div key={alt} className="flex flex-col gap-5 items-center flex-col-reverse TB:flex-col" variants={childVariants}>
              <img className="w-full rounded-[30px] drop-shadow-lg mt-5" src={src} alt={alt}/>
              <div className="max-w-[400px] text-center ">
                <div className="text-2xl font-bold leading-[33.60px]">{title}</div>
                <div className="text-base font-normal leading-normal">{text}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
       
        <motion.div className="flex flex-col TB:flex-row justify-center items-center gap-10" variants={childVariants}>
          <Link href="/contacts" passHref>
            <motion.div className="px-6 py-3 rounded-[30px] border-solid border border-black dark:border-white dark:text-white dark:hover:text-Bl hover:bg-black hover:text-white hover:bg-black dark:hover:bg-white justify-center items-center gap-2 flex text-lg dark:transition dark:ease-in-out cursor-pointer">
              Get Started
            </motion.div>
          </Link>
          <Link href="/contacts" passHref>
            <motion.div className="px-6 py-3 rounded-[30px] border-solid border dark:border-white dark:text-white dark:hover:text-Bl hover:bg-black hover:text-white hover:bg-black dark:hover:bg-white justify-center items-center gap-2 flex text-lg dark:transition dark:ease-in-out cursor-pointer">
            Get centered
            </motion.div>
          </Link>
         </motion.div>
         
      </div>
    </motion.div>
  );
}

export default AboutUs;
