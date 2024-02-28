import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { testimonialsData } from "@/constants"; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialsSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [testimonials, setTestimonials] = useState(
      testimonialsData.map(testimonial => ({ ...testimonial, isExpanded: false }))
    );
    const swiperRef = useRef(null);

    const toggleExpand = (index) => {
      const newTestimonials = [...testimonials];
      newTestimonials[index].isExpanded = !newTestimonials[index].isExpanded;
      setTestimonials(newTestimonials);
    };

    const trimText = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      let trimmedText = text.substr(0, maxLength);
      trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")));
      return `${trimmedText} ...`;
    };

    return (
      <div className="py-[60px] mx-auto bg-white dark:bg-black text-black dark:text-white p-10">
        <div className="mx-auto">
          <div className="text-center text-stone-300 text-[40px] TB:text-[64px] TB:leading-[76.80px] font-bold leading-[48px]">Testimonials</div>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            navigation={{
              nextEl: '.custom-next-btn',
              prevEl: '.custom-prev-btn',
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
            ref={swiperRef}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center gap-2 p-10 bg-gray-200 dark:bg-gray-800 rounded-[30px] drop-shadow-lg mt-10 min-h-[400px]">
                  <div className="flex text-[30px]">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={i < testimonial.rating ? 'text-black dark:text-white' : 'text-gray-300 dark:text-gray-600'}>★</span>
                    ))}
                  </div>
                  <div className={`${testimonial.isExpanded ? 'h-auto' : 'h-[250px] overflow-hidden'} flex flex-col items-center justify-start`}>
                    {testimonial.testimonial.length > 150
                      ? <p onClick={() => toggleExpand(index)} className="text-base TB:text-xl TB:leading-[33.60px] leading-[30px] text-start cursor-pointer">
                          {testimonial.isExpanded ? testimonial.testimonial : trimText(testimonial.testimonial, 150)}
                        </p>
                      : <p className="text-base TB:text-xl TB:leading-[33.60px] leading-[30px] text-start">{testimonial.testimonial}</p>
                    }
                  </div>
                  <h1 className="text-base font-bold TB:text-xl leading-normal">{testimonial.name}</h1>
                  <h2 className="text-base font-normal TB:text-xl leading-normal">{testimonial.position}</h2>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
  
          <div className='flex w-full justify-between items-center mt-8'>
          <div className="flex justify-center mt-4">
            {testimonialsData.map((_item, index) => (
              <span key={index} onClick={() => goToSlide(index)} className={`inline-block mx-1 w-3 h-3 rounded-full cursor-pointer ${activeIndex === index ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'}`} />
            ))}
          </div>
  
          <div className='flex flex-row justify-center items-center gap-5 mt-8'>
            <button className="custom-prev-btn p-3 rounded-full border border-black dark:border-white flex justify-center items-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-150">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="custom-next-btn p-3 rounded-full border border-black dark:border-white flex justify-center items-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-150">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TestimonialsSlider;