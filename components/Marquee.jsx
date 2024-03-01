import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { LogoS } from "../constants/index"; // Убедитесь, что LogoS импортированы корректно

const CustomMarquee = () => {
  const control = useAnimation();
  const ref = useRef(null);
  const extendedLogos = [...LogoS, ...LogoS, ...LogoS, ...LogoS, ...LogoS, ...LogoS, ...LogoS, ...LogoS, ...LogoS, ...LogoS, ...LogoS, ...LogoS];

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

  const itemWidth = 200; // Предполагаемая ширина элемента
  const totalLength = extendedLogos.length * itemWidth;

  const marqueeVariants = {
    animate: {
      x: [0, -totalLength],
      transition: {
        repeat: Infinity,
        duration: 7 * extendedLogos.length,
        ease: "linear"
      }
    },
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div className="overflow-hidden relative" ref={ref} variants={marqueeVariants} initial="hidden" animate={control}>
      
      <motion.div className="flex " variants={marqueeVariants} animate="animate">
        {extendedLogos.map((logo, index) => (
          <motion.div key={index} className="flex flex-row justify-center items-center gap-2 p-3 m-2 bg-gray-200 dark:bg-gray-800 rounded-lg drop-shadow-lg" style={{ minWidth: '200px', maxWidth: '350px' }}>
            <img src={logo.src} alt={logo.alt} className="w-12 h-12" />
            <p className="text-xl text-black dark:text-white">{logo.text}</p>
          </motion.div>
        ))}
      </motion.div>
      <div className="absolute left-0 top-0 bottom-0 w-[30px] bg-gradient-to-r from-white to-transparent dark:from-black"></div>
      <div className="absolute right-0 top-0 bottom-0 w-[30px] bg-gradient-to-l from-white to-transparent dark:from-black"></div>
    </motion.div>
  );
};

export default CustomMarquee;
