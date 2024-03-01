import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

function Contact() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={control} variants={variants} className="mx-auto px-10 my-10 flex flex-col justify-start items-center gap-10 relative">
      <div className="text-center">
        <h1 className="text-stone-300 text-6xl font-bold">Contact</h1>
        <p className="text-lg font-normal mt-4">Have a question or need more information? Contact us today!</p>
      </div>
      <form className="w-full flex flex-col gap-6">
  <div className="flex flex-col TB:flex-row gap-6 justify-center">
    <div className="flex flex-col TB:w-1/2">
      <label className="text-base font-normal">First name</label>
      <input className="p-3 border-b-2 focus:outline-none focus:border-black bg-transparent" type="text" />
    </div>
    <div className="flex flex-col TB:w-1/2">
      <label className="text-base font-normal">Last name</label>
      <input className="p-3 border-b-2 focus:outline-none focus:border-black bg-transparent" type="text" />
    </div>
  </div>
  <div className="flex flex-col TB:flex-row gap-6 justify-center">
    <div className="flex flex-col TB:w-1/2">
      <label className="text-base font-normal">Email</label>
      <input className="p-3 border-b-2 focus:outline-none focus:border-black bg-transparent" type="email" />
    </div>
    <div className="flex flex-col TB:w-1/2">
      <label className="text-base font-normal">Phone number</label>
      <input className="p-3 border-b-2 focus:outline-none focus:border-black bg-transparent" type="text" />
    </div>
  </div>
  <div className="flex flex-col">
    <label className="text-base font-normal">Message</label>
    <textarea className="p-3 border-b-4 h-40 focus:outline-none focus:border-black bg-transparent" placeholder="Type your message..."></textarea>
  </div>
</form>
      <motion.div className="px-10 py-3 rounded-[30px] border-solid border dark:border-white dark:text-white dark:hover:text-Bl hover:bg-black hover:text-white hover:bg-black dark:hover:bg-white justify-center items-center gap-2 flex text-lg dark:transition dark:ease-in-out cursor-pointer">
            Submit
            </motion.div>
    </motion.div>
  );
}

export default Contact;
