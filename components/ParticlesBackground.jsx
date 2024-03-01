"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from "./ThemeContext";

const ParticlesBackground = ({ speed = 2, size = 5, number = 100 }) => {
    const { theme } = useTheme();
    const canvasRef = useRef(null);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    let particlesArray = [];
    const mouse = {
        x: null,
        y: null,
        radius: 50
    };

    class Particle {
        constructor() {
            this.x = Math.random() * windowSize.width;
            this.y = Math.random() * windowSize.height;
            this.size = Math.random() * size + 1;
            this.speedX = Math.random() * speed * 2 - speed;
            this.speedY = Math.random() * speed * 2 - speed;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            // Логика взаимодействия с курсором мыши
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                this.speedX += dx / distance;
                this.speedY += dy / distance;
            }

            if (this.x > windowSize.width || this.x < 0) this.speedX *= -1;
            if (this.y > windowSize.height || this.y < 0) this.speedY *= -1;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = theme === 'dark' ? '#FFFFFF' : '#000000'; 
            ctx.fill();
        }
    }

    useEffect(() => {
        const updateWindowSize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        updateWindowSize();
        window.addEventListener('resize', updateWindowSize);

        return () => window.removeEventListener('resize', updateWindowSize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = windowSize.width;
        canvas.height = windowSize.height;

        const init = () => {
            particlesArray = [];
            for (let i = 0; i < number; i++) {
                particlesArray.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(particle => {
                particle.update();
                particle.draw(ctx);
            });
            requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [windowSize]); 

    return <canvas ref={canvasRef} />;
};

export default ParticlesBackground;
