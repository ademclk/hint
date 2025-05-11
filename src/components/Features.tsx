import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createNoise2D } from "simplex-noise";
import { Noise } from "noisejs";

gsap.registerPlugin(ScrollTrigger);

// Animated SVG for Instant Scale
function InstantScaleAnimation() {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        // Clean up previous animation
        if (animationRef.current) {
            animationRef.current.kill();
        }

        // Reduce complexity for mobile
        const isMobile = window.innerWidth < 768;
        const nPts = isMobile ? 100 : 200; // Fewer points on mobile
        const radius = 160;
        const wraps = 53;

        // Remove previous children if any
        while (svg.firstChild) svg.removeChild(svg.firstChild);

        // Create circles with reduced complexity
        for (let i = 0; i < nPts; i++) {
            const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            const angle = (i / nPts * Math.PI * wraps) - Math.PI / wraps;
            const x = Math.cos(angle) * (i / nPts * radius);
            const y = Math.sin(angle) * (i / nPts * radius);

            gsap.set(c, {
                x: 180,
                y: 180,
                attr: {
                    class: 'c c' + i,
                    r: gsap.utils.wrapYoyo(0, nPts / 2, i) / nPts * 10 + 0.1,
                    cx: x,
                    cy: y,
                    fill: '#34d399'
                }
            });
            svg.appendChild(c);
        }

        // Create animation timeline
        animationRef.current = gsap.timeline();

        // Slower rotation for better performance
        animationRef.current.to('.c', {
            duration: isMobile ? 120 : 99,
            rotate: 360,
            ease: 'none',
            repeat: -1
        });

        // Simplified initial animation
        animationRef.current.from('.c', {
            duration: 1,
            attr: { cx: 0, cy: 0, r: 0 },
            yoyo: true,
            ease: 'power1.inOut',
            repeat: -1,
            stagger: isMobile ? -0.04 : -0.02
        });

        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full">
            <svg
                ref={svgRef}
                viewBox="0 0 360 360"
                className="w-[90%] h-[180px] md:w-[95%] md:h-[320px] lg:h-[340px] xl:h-[360px] -ml-2 -mt-2"
                style={{ overflow: 'visible' }}
            />
        </div>
    );
}

// Warp Speed Animation for Auto Updates
function WarpSpeedAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Clean up previous rays
        container.innerHTML = '';
        const rays = document.createElement('div');
        rays.id = 'rays';
        rays.style.position = 'absolute';
        rays.style.left = '50%';
        rays.style.top = '50%';
        rays.style.width = '0';
        rays.style.height = '0';
        container.appendChild(rays);

        // Ray template
        const rayTemplate = document.createElement('div');
        rayTemplate.className = 'ray';
        rayTemplate.style.position = 'absolute';
        const rayFill = document.createElement('div');
        rayFill.className = 'rayFill';
        rayFill.style.position = 'absolute';
        rayFill.style.width = '1px';
        rayFill.style.height = '0px';
        rayFill.style.background = 'var(--ray-color, #fff)';
        rayTemplate.appendChild(rayFill);
        rays.appendChild(rayTemplate);

        // Add rays with reduced count
        const nRays = 150;
        for (let i = 1; i < nRays; i++) {
            const _r = rayTemplate.cloneNode(true) as HTMLDivElement;
            _r.id = 'r' + i;
            startRay(_r, i);
            rays.appendChild(_r);
        }

        function startRay(_r: HTMLDivElement, i: number) {
            if (!container) return;
            const _h = Math.max(container.offsetWidth, container.offsetHeight);
            gsap.set(_r, {
                rotation: 360 * Math.random(),
            });
            gsap.fromTo(
                _r.children[0],
                { opacity: 0.15, scaleY: 1, height: 0, y: _h / 5 * Math.random() },
                {
                    opacity: 1,
                    y: _h / 2 + _h / 2 * Math.random(),
                    delay: i / 150,
                    height: _h,
                    onComplete: endRay,
                    onCompleteParams: [_r, i],
                    ease: 'power4.in',
                }
            );
        }

        function endRay(_r: HTMLDivElement, i: number) {
            gsap.fromTo(
                _r.children[0],
                { transformOrigin: '0% 100%' },
                {
                    scaleY: 0,
                    ease: 'linear',
                    onComplete: startRay,
                    onCompleteParams: [_r, i],
                }
            );
        }

        // Color for light/dark mode
        const updateRayColor = () => {
            if (!container) return;
            const isDark = document.documentElement.classList.contains('dark');
            const color = isDark ? '#fff' : '#222';
            container.querySelectorAll('.rayFill').forEach((el) => {
                (el as HTMLElement).style.background = color;
            });
        };

        updateRayColor();
        const observer = new MutationObserver(updateRayColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            observer.disconnect();
            container.innerHTML = '';
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: 'none', overflow: 'hidden' }} />
    );
}

// Modular APIs Animation with Perlin noise and reference effect
function ModularAPIsAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<any[]>([]);
    const noiseRef = useRef<Noise>();
    const animationFrameRef = useRef<number>();
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Setup
        const cw = 1200, ch = 1200;
        canvas.width = cw;
        canvas.height = ch;
        noiseRef.current = new Noise(Math.random());
        const noise = noiseRef.current;
        const dots: any[] = [];
        for (let x = 0; x < cw; x += 12) {
            for (let y = 0; y < ch; y += 12) {
                dots.push({
                    r: gsap.utils.clamp(.5, 10, noise.perlin2(x / 200, y / 200) * 10),
                    x: x + 5,
                    y: y + 5,
                    h: gsap.utils.random(300, 400, 1),
                    a: 1
                });
            }
        }
        dotsRef.current = dots;

        function drawDot(d: any) {
            if (!ctx) return;
            ctx.fillStyle = `hsla(${d.h}, 100%, 50%, ${d.a})`;
            ctx.beginPath();
            ctx.arc(d.x + d.r, d.y - d.r, d.r, 0, 2 * Math.PI);
            ctx.fill();
        }
        function render() {
            if (!ctx) return;
            ctx.clearRect(0, 0, cw, ch);
            dotsRef.current.forEach(drawDot);
        }

        // GSAP timeline
        const tl = gsap.timeline({ onUpdate: render });
        tl.to(dots, {
            duration: 2,
            h: () => gsap.utils.random(180, 240, 1),
            r: 0.5,
            ease: 'power3',
            yoyoEase: 'power2.inOut',
            stagger: {
                amount: 4,
                from: 'center',
                grid: [100, 100],
                yoyo: true,
                repeat: -1,
                repeatRefresh: true
            }
        }).seek(999);
        tlRef.current = tl;

        // Randomize seed + speed every 3 seconds
        const randomize = () => {
            noise.seed(Math.random());
            dots.forEach(d => {
                d.r = gsap.utils.clamp(.5, 20, noise.perlin2(d.x / 200, d.y / 200) * 10);
                d.h = gsap.utils.random(300, 400, 1);
            });
            tl.invalidate();
            gsap.to(tl, { timeScale: gsap.utils.random(1, 4), ease: 'sine.inOut' });
        };
        const interval = setInterval(randomize, 3000);

        // Animation frame for continuous rendering
        function animate() {
            render();
            animationFrameRef.current = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            clearInterval(interval);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (tlRef.current) tlRef.current.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: 'none' }}
            />
        </div>
    );
}

interface FeatureCardProps {
    title: string;
    colorClass: string;
    bgClass: string;
    subLabel?: string;
    span?: string;
    compact?: boolean;
    children?: React.ReactNode;
}

const FeatureCard = ({ title, colorClass, bgClass, subLabel, span = "", compact = false, children }: FeatureCardProps) => {
    return (
        <div
            className={`flex flex-col items-center justify-center rounded-2xl ${compact ? 'p-3 sm:p-4 md:p-5' : 'p-4 sm:p-6 md:p-8'} min-h-[80px] sm:min-h-[100px] md:min-h-[120px] shadow-lg ${bgClass} transition-colors ${span}`}
        >
            {children ? (
                children
            ) : (
                <>
                    <span className={`font-bold text-lg md:text-2xl text-center ${colorClass}`}>{title}</span>
                    {subLabel && (
                        <span className="mt-1 text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 text-center opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]">
                            {subLabel}
                        </span>
                    )}
                </>
            )}
        </div>
    );
};

export default function Features() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the section title and description
            gsap.from(".features-title", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".features-title",
                    start: "top bottom-=100",
                    end: "top center",
                    toggleActions: "play none none reverse"
                }
            });

            gsap.from(".features-description", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".features-description",
                    start: "top bottom-=100",
                    end: "top center",
                    toggleActions: "play none none reverse"
                }
            });

            // Animate feature cards with stagger
            const cards = cardsRef.current?.children;
            if (cards) {
                gsap.from(cards, {
                    y: 50,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top bottom-=100",
                        end: "top center",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <h2 className="features-title text-4xl md:text-5xl font-bold mb-4">Introducing Dotlanth</h2>
                    <p className="features-description text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
                        Write your business logic once, deploy instantly, and get a polished UI out of the box.
                    </p>
                </div>
                <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 auto-rows-[90px] sm:auto-rows-[100px] md:auto-rows-[120px] lg:auto-rows-[140px]">
                    {/* Modular APIs at top-left */}
                    <FeatureCard
                        title=""
                        colorClass=""
                        bgClass="bg-gray-100 dark:bg-neutral-900 relative overflow-hidden"
                        span="col-span-2 row-span-2"
                    >
                        <ModularAPIsAnimation />
                        <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-full pointer-events-none">
                            <span className="font-bold text-2xl md:text-3xl text-black-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] text-center select-none">Modular APIs</span>
                        </div>
                    </FeatureCard>

                    {/* Regular cards in the middle */}
                    <FeatureCard title="Instant Scale" colorClass="text-green-400" bgClass="bg-gray-100 dark:bg-neutral-900" subLabel="Launch from zero to thousands" />
                    <FeatureCard title="Built-In UI" colorClass="text-yellow-400" bgClass="bg-gray-100 dark:bg-neutral-900" subLabel="Interactive by default" />
                    <FeatureCard title="Live Metrics" colorClass="text-cyan-400" bgClass="bg-gray-100 dark:bg-neutral-900" subLabel="Real-time data" compact />
                    <FeatureCard title="Custom Workflows" colorClass="text-purple-400" bgClass="bg-gray-100 dark:bg-neutral-900" subLabel="Validation, logging, AI" compact />

                    {/* Privacy Controls - wider card */}
                    <FeatureCard
                        title="Privacy Controls"
                        colorClass="text-lime-400"
                        bgClass="bg-gray-100 dark:bg-neutral-900"
                        subLabel="E2E encryption, Zero-Knowledge"
                        span="col-span-2"
                    />

                    {/* Auto Updates at bottom-right */}
                    <FeatureCard
                        title=""
                        colorClass=""
                        bgClass="bg-gray-100 dark:bg-neutral-900 relative overflow-hidden"
                        span="col-span-2 row-span-2"
                    >
                        <WarpSpeedAnimation />
                        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                            <span className="font-bold text-2xl md:text-3xl text-pink-500 text-center">Auto Updates</span>
                            <span className="mt-1 text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 text-center opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]">
                                Live in seconds - Instant deployment
                            </span>
                        </div>
                    </FeatureCard>

                    {/* Built-In Storage - wider card */}
                    <FeatureCard
                        title="Built-In Storage"
                        colorClass="text-orange-400"
                        bgClass="bg-gray-100 dark:bg-neutral-900"
                        subLabel="No external DB"
                        span="col-span-2"
                    />
                </div>
            </div>
        </section>
    );
} 