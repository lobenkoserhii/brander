import React, { useState, useEffect, useRef } from 'react';
import { Serv } from "@/constants";
import { motion, useAnimation } from 'framer-motion';


function Services() {
    const controls = useAnimation();
    const [activeBlock, setActiveBlock] = useState(Serv[0].id);
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
                threshold: 0.1 // Настройте по желанию, чтобы изменить, когда анимация должна срабатывать
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

    const handleBlockClick = (blockId) => {
      setActiveBlock(blockId);
    };
  
    const activeService = Serv.find(service => service.id === activeBlock);

    const variants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    return (
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="max-w-[1440px] relative mx-auto my-5 bg-white dark:bg-black text-black dark:text-white mx-[70px] flex flex-col items-center justify-between gap-10"
      >
        <div className="text-center text-stone-300 text-[40px] TB:text-[64px] TB:leading-[76.80px] font-bold leading-[48px]">Services</div>
        <div className="flex-col NPC:flex-row-reverse justify-between items-center gap-12 flex mx-10">
          <div className="flex flex-col justify-between items-start gap-10">
            {Serv.map((service, index) => (
              <motion.div key={service.id}
                variants={variants}
                onClick={() => handleBlockClick(service.id)}
                className={`justify-start items-start gap-8 relative cursor-pointer ${activeBlock === service.id ? "before:absolute before:inset-y-0 before:left-0 before:w-[4px] before:rounded-[30px] before:bg-border-gradient " : ""}`}
              >
                <div className="flex-col justify-center items-start gap-3 ml-8">
                  <div className="text-[32px] font-bold TB:leading-[41.60px] leading-[38.40px]">{service.title}</div>
                  <div className="text-base font-normal leading-normal">{service.text}</div>
                </div>
              </motion.div>
            ))}
          </div>
         
          <motion.img 
  className="w-full rounded-[30px] drop-shadow-lg" 
  src={activeService.src} 
  alt={activeService.alt}
  variants={variants}
  style={{ minWidth: '400px' }} 
/>
        </div>
      </motion.div>
    );
}

export default Services;
