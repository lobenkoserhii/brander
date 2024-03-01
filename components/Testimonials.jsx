import React, { useState, useRef, useEffect } from 'react';
import { testimonialsData } from "@/constants"; // Убедитесь, что путь корректный
import { motion, useAnimation } from 'framer-motion';

const Testimonial = ({ testimonial, name, position, rating }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex text-[30px]">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < rating ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}>
            ★
          </span>
        ))}
      </div>
      <div className={`${isExpanded ? 'h-auto' : 'h-[100px] overflow-hidden'} relative`}>
        <p className="text-xl TB:text-2xl TB:leading-[33.60px] font-bold leading-[30px]">
          {testimonial}
        </p>
      </div>
      {testimonial.length > 300 && (
        <button onClick={toggleExpand} className="px-6 py-3 rounded-[30px] border-solid border dark:border-white dark:text-white dark:hover:text-black hover:bg-black hover:text-white dark:hover:bg-white justify-center items-center gap-2 flex text-lg transition ease-in-out duration-150 cursor-pointer">
          {isExpanded ? 'Read Less' : 'Learn More'}
        </button>
      )}
      <h1 className="text-base font-semibold TB:text-xl leading-normal">{name}</h1>
      <h2 className="text-base font-normal TB:text-xl leading-normal">{position}</h2>
    </div>
  );
};

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  const goToPrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <motion.div ref={ref} initial="hidden" animate={control} variants={variants} className="mx-auto bg-white dark:bg-black text-black dark:text-white">
      <div className="mx-auto">
        <div className="text-center text-stone-300 text-[40px] TB:text-[64px] TB:leading-[76.80px] font-bold leading-[48px]">Testimonials</div>
        <div className="flex flex-col TB:flex-row justify-center items-center gap-8 m-10 bg-gray-200 dark:bg-gray-800 rounded-[30px] p-10 drop-shadow-lg">
          <Testimonial
            testimonial={currentTestimonial.testimonial}
            name={currentTestimonial.name}
            position={currentTestimonial.position}
            rating={currentTestimonial.rating}
          />
        </div>
        <div className="flex justify-center items-center gap-4 mt-8">
          <button onClick={goToPrev} className="p-3 rounded-full border border-black dark:border-white flex justify-center items-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-150">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button onClick={goToNext} className="p-3 rounded-full border border-black dark:border-white flex justify-center items-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-150">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        <div className="flex justify-center mt-4">
          {testimonialsData.map((_item, index) => (
            <span key={index} className={`inline-block mx-1 w-3 h-3 rounded-full ${currentIndex === index ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'}`} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Testimonials;
