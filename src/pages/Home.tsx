import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CanvasBackground } from "@/components/CanvasBackground";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { EcosystemSnapshot } from "@/components/EcosystemSnapshot";
import { ModeToggle } from "@/components/mode-toggle";
import { Footer } from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export function Home() {
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const mainContentRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Continuous bounce animation
        gsap.to(scrollIndicatorRef.current, {
            y: 15,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: 1.5
        });

        // Arrow pulse animation
        const arrow = scrollIndicatorRef.current?.querySelector("svg");
        if (arrow) {
            gsap.to(arrow, {
                scale: 1.1,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                delay: 1.5
            });
        }

        // Scroll-triggered animations
        const ctx = gsap.context(() => {
            // Initial state
            gsap.set([headingRef.current, descriptionRef.current], {
                y: 50,
                opacity: 0
            });

            // Animate heading
            gsap.to(headingRef.current, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top bottom-=100",
                    end: "top center",
                    toggleActions: "play none none none"
                }
            });

            // Animate description with a slight delay
            gsap.to(descriptionRef.current, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: descriptionRef.current,
                    start: "top bottom-=100",
                    end: "top center",
                    toggleActions: "play none none none"
                }
            });
        }, mainContentRef);

        return () => {
            ctx.revert(); // Cleanup animations
        };
    }, []);

    return (
        <main className="relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden transition-colors">
            <div className="relative w-full flex items-center justify-center min-h-[85vh] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
                <CanvasBackground />
                <div className="absolute inset-0 mx-2 my-4 md:mx-4 lg:mx-8 xl:mx-12 bg-background/40 backdrop-blur-sm rounded-3xl" style={{ pointerEvents: 'auto' }} />
                <div ref={mainContentRef} className="relative flex flex-col justify-center items-center w-full h-full min-h-[60vh] max-w-4xl mx-auto px-2 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-12 z-10">
                    <div className="flex flex-1 flex-col gap-12 justify-between w-full h-full">
                        <div ref={headingRef} className="w-full flex flex-col gap-1 sm:gap-2 items-center">
                            <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground whitespace-normal md:whitespace-nowrap">
                                Advancing technology. For all.
                            </h2>
                            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground whitespace-normal md:whitespace-nowrap">
                                Welcome to Synerthink.
                            </h1>
                        </div>
                        <div ref={descriptionRef} className="w-full max-w-3xl flex flex-col gap-8 sm:gap-8 items-center mt-0 md:mt-6 flex-1 justify-center">
                            <p className="text-center text-lg sm:text-xl md:text-2xl font-light text-foreground leading-relaxed">
                                We believe in a future where technology empowers everyone trusted, open, and fundamentally human.
                            </p>
                            <p className="text-center text-base sm:text-lg md:text-xl font-light text-foreground leading-relaxed">
                                Building the next generation of digital infrastructure that enables people to connect, create, and collaborate with genuine security, privacy, and clarity at the core.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ModeToggle />
            <HowItWorks />
            <Features />
            <EcosystemSnapshot />
            <Footer />
        </main>
    );
}  