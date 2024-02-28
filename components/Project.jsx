import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence  } from 'framer-motion';
import { projects } from "@/constants";

function Project({ project }) {
    const control = useAnimation();
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    control.start('visible');
                } else {
                    control.start('hidden');
                }
            },
            { threshold: 0.5 }
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
        hidden: { 
            opacity: 0,
            transition: {
                duration: 1,
                ease: "easeInOut", 
                delay: 0 
            }
        },
        visible: { 
            opacity: 1, 
            transition: {
                duration: 1,
                ease: "easeInOut",
                delay: 0.1
            }
        }
    };

    const fadeInOutVariants = {
        hidden: { 
            opacity: 0,
            transition: {
                duration: 1, 
                ease: "easeInOut"
            }
        },
        visible: { 
            opacity: 1,
            transition: {
                duration: 1, 
                ease: "easeInOut"
            }
        }
    };

    
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    

    const scrollVariants = {
        start: { y: 0 },
        end: { y: '-100%', transition: { duration: 40, ease: "linear" } }
    };

    return (
        <motion.div ref={ref} initial="hidden" animate={control} variants={variants} className="bg-white dark:bg-black dark:text-white w-full mx-auto m-10 flex-col justify-between items-center inline-flex">
            <div className="relative w-full overflow-hidden drop-shadow-lg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <img className="drop-shadow-lg w-full h-full object-fill" src={project.src} alt={project.alt} />
                <AnimatePresence>
                {isHovered && (
    <motion.div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        initial="hidden"
        animate="visible"
        exit="hidden" 
        variants={fadeInOutVariants}
    >
        <motion.img src={project.animationSrc} alt="Animated Overlay" initial="start" animate="end" variants={scrollVariants} className="object-fill " style={{ height: 'full' }} />
    </motion.div>
)}
</AnimatePresence>
            </div>
            <div className="p-10 justify-center items-start inline-flex w-full">
                <div className="justify-start items-start gap-20 flex flex-col TB:flex-row">
                    <div className="flex-col justify-start items-start gap-6 inline-flex">
                        <div className="flex-col justify-start items-start gap-6 flex w-full">
                            <div className="text-5xl font-bold leading-[57.60px]">{project.title}</div>
                            <div className="text-base TB:text-lg font-normal leading-normal">{project.description}</div>
                        </div>
                        <div className="justify-start items-start gap-2 inline-flex w-full">
                            <a href={project.website} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-[30px] border border-black dark:border-white dark:text-white dark:hover:text-Bl hover:bg-black hover:text-white dark:hover:bg-white justify-center items-center gap-2 flex text-lg dark:transition dark:ease-in-out cursor-pointer">
                                View project
                            </a>
                        </div>
                    </div>
                    <div className="flex-col justify-start items-start gap-5 inline-flex">
                        <div className="justify-start items-start gap-5 inline-flex">
                            <div className="flex-col justify-start items-start gap-2 inline-flex">
                                <div className="text-xl TB:text-2xl font-bold leading-7 TB:leading-8 whitespace-nowrap">Client</div>
                                <div className="text-base TB:text-lg font-normal leading-normal">{project.client}</div>
                            </div>
                            <div className="flex-col justify-start items-start gap-2 inline-flex">
                                <div className="text-xl TB:text-2xl font-bold leading-7 TB:leading-8 whitespace-nowrap">Date</div>
                                <div className="text-base TB:text-lg font-normal leading-normal whitespace-nowrap">{project.date}</div>
                                <div className="justify-start items-start gap-5 inline-flex">
                                </div>
                                                   
                            </div>
                            
                        </div>
                        <div className="flex-col justify-start items-start gap-2 inline-flex">
                                <div>Website</div>
                                 <a href={project.website} target="_blank" rel="noopener noreferrer">
                                {project.website}
                                </a>
                                </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Project;
