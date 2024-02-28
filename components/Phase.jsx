import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

function Phase() {
  const control = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [control]);

  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };


  return (
    <motion.div ref={ref} initial="hidden" animate={control} variants={variants} className="px-10 mb-10 flex-col justify-start items-center gap-20 inline-flex bg-white dark:bg-black text-black dark:text-white ">
    <div className="flex-col justify-start items-center flex">
    <div className="flex flex-col items-center gap-20">
      <div className="flex-col items-center gap-4 flex">
        <div className="text-center text-5xl font-bold leading-[57.60px]">Transforming Your Vision into a Reality</div>
        <div className="text-center text-lg font-normal leading-[27px]">At Brander, we combine in-depth research, creative design, and the latest digital solutions to propel your brand to the forefront of your industry. Our strategic approach ensures that your vision is brought to life.</div>
      </div>
      <div className="flex w-full flex-col TB:flex-row justify-between items-center gap-10">
      <div className="flex-1 min-w-0 flex flex-col justify-center items-center gap-6 text-center">
  <img className="drop-shadow-lg mx-auto" src="Research.png" alt="Research" />
  <div className="TB:text-[32px] font-bold leading-[41.60px]">Research and Analysis</div>
  <div className="text-base font-normal leading-normal">We conduct thorough research and analysis to understand your target audience, market trends, and competitors.</div>
</div>

        <div className="flex-1 min-w-0 flex-col justify-center items-center gap-6">
          <img className="drop-shadow-lg mx-auto" src="Creative.png" alt="Creative" />
          <div className="text-center text-[32px] font-bold leading-[41.60px]">Creative Design</div>
          <div className="text-center text-base font-normal leading-normal">Our team of designers creates visually stunning and impactful designs that resonate with your audience.</div>
        </div>
        <div className="flex-1 min-w-0 flex-col justify-center items-center gap-6">
          <img className="drop-shadow-lg mx-auto" src="Digital.png" alt="Digital" />
          <div className="text-center text-[32px] font-bold leading-[41.60px]">Digital Solutions</div>
          <div className="text-center text-base font-normal leading-normal">We leverage the latest digital solutions to enhance your brand's online presence and drive growth.</div>
        </div>
      </div>
      <div className="px-6 py-3 rounded-[30px] border border-black dark:border-white dark:text-white dark:hover:text-Bl hover:bg-black hover:text-white justify-center items-center gap-2 flex text-lg dark:transition dark:ease-in-out cursor-pointer">
                    <div className="text-base font-normal leading-normal">Contact</div>
                </div>
    </div>
    </div>
    </motion.div>
  )
}

export default Phase