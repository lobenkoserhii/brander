import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { locationsData } from "../constants/index";

const Locations = () => {
  const control = useAnimation();
  const ref = useRef(null);

  const extendedData = [...locationsData, ...locationsData, ...locationsData, ...locationsData, ...locationsData];

  useEffect(() => {
    let mounted = true;
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && mounted) {
          control.start('visible');
        } else {
          control.start('hidden');
        }
      },
      { threshold: 0.1 }
    );
  
    if (ref.current) {
      observer.observe(ref.current);
    }
  
    return () => {
      mounted = false;
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [control]);

  const itemWidth = 200;
  const totalLength = extendedData.length * itemWidth;
  
  const marqueeVariants = {
    animate: {
      x: [0, -totalLength],
      transition: {
        repeat: Infinity,
        duration: 7 * extendedData.length,
        ease: "linear"
      }
    },
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div className="overflow-hidden" ref={ref} variants={marqueeVariants} initial="hidden" animate={control}>
      <div className="text-center text-stone-300 text-[64px] font-bold leading-[76.80px] mt-10">Locations</div>
      <h2>Мы тут</h2>
      <motion.div className="flex" variants={marqueeVariants} animate="animate">
        {extendedData.map((item, index) => (
          <motion.div key={index} className="flex flex-row justify-center items-center gap-2 px-2 p-4 m-2 bg-gray-200 dark:bg-gray-800 rounded-lg drop-shadow-lg" style={{ minWidth: '150px', maxWidth: '300px' }}>
            <p className="text-xl text-black dark:text-white">{item.name}</p>
          </motion.div>
        ))}
      </motion.div>
      <div className="absolute left-0 top-0 bottom-0 w-[30px] bg-gradient-to-r from-white to-transparent dark:from-black"></div>
      <div className="absolute right-0 top-0 bottom-0 w-[30px] bg-gradient-to-l from-white to-transparent dark:from-black"></div>
    </motion.div>
  );
};

export default Locations;
