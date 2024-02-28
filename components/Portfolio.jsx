// Portfolio.jsx
import React from 'react';
import Project from './Project';
import { projects } from "@/constants";

function Portfolio() {
    return (
        <div className="flex flex-col items-center w-full mx-auto my-10">
            <div className="text-center text-stone-300 text-[40px] TB:text-[64px] TB:leading-[76.80px] font-bold leading-[48px]">Project</div>
            {projects.map((project) => (
                <Project key={project.id} project={project} />
            ))}
        </div>
    );
}

export default Portfolio;
