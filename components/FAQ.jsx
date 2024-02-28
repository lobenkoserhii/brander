import React, { useState,useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {FAQData} from "../constants/index";

function FAQ() {
    const [openedFAQ, setOpenedFAQ] = useState(null);
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

    const toggleFAQ = (index) => {
        setOpenedFAQ(openedFAQ === index ? null : index);
    };

    return (
        <motion.div ref={ref} initial="hidden" animate={control} variants={variants} className="mx-10 bg-white dark:bg-black text-black dark:text-white flex flex-col gap-12">
            <div className="flex flex-col justify-start items-start TB:justify-center TB:items-center gap-5">
                <div className="text-stone-300 text-[40px] TB:text-[64px] TB:leading-[76.80px] font-bold leading-[48px] text-center">FAQs</div>
                       
            </div>
            <div className='flex flex-row max-w-[800px] justify-start items-start'>
                <div className="text-lg font-normal leading-[27px]">Explore our FAQs to understand Brander's personalized branding, web development services, timelines, budgeting, and our commitment to your project's success.</div>
                </div>
            <div className="w-full">
                {FAQData.map((faq, index) => (
                    <div key={index} className="w-full border-solid border-b-2 border-black py-4">
                        <div className="flex justify-between items-center cursor-pointer gap-5" onClick={() => toggleFAQ(index)}>
                            <div className="text-base TB:text-lg font-bold flex-1">{faq.title}</div>
                            {openedFAQ === index ? (
                                <motion.svg initial={{ rotate: 0 }} animate={{ rotate: 180 }} className="flex-shrink-0 w-6 h-6 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </motion.svg>
                            ) : (
                                <motion.svg initial={{ rotate: 0 }} animate={{ rotate: 0 }} className="flex-shrink-0 w-6 h-6 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </motion.svg>
                            )}
                        </div>
                        {openedFAQ === index && (
                            <div className="text-lg font-normal mt-2">{faq.text}</div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex-col justify-start items-start gap-6 flex">
                <div className="flex-col justify-start items-start gap-4 flex">
                    <div className="text-2xl font-bold leading-[33.60px]">Still have a question?</div>
                    <div className="text-base TB:text-lg max-w-[800px] font-normal leading-normal">If you have any questions or want to discuss your unique project, our Brander team is here to help. Understanding the importance of finding the perfect partner for your vision, we guarantee a personalized approach to each project.</div>
                </div>
                <div className="px-6 py-3 rounded-[30px] border border-black dark:border-white dark:text-white dark:hover:text-Bl hover:bg-black hover:text-white justify-center items-center gap-2 flex text-lg dark:transition dark:ease-in-out cursor-pointer">
                    <div className="text-base font-normal leading-normal">Contact</div>
                </div>
            </div>
        </motion.div>
    );
}

export default FAQ;