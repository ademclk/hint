import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StepProps {
    title: string;
    description: string;
    colorClass: string;
    number: number;
}

const Step = ({ title, description, colorClass, number }: StepProps) => {
    return (
        <div className="flex items-start gap-6">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full ${colorClass} bg-opacity-10 flex items-center justify-center`}>
                <span className={`text-2xl font-bold ${colorClass}`}>{number}</span>
            </div>
            <div className="flex-1">
                <h3 className={`text-xl md:text-2xl font-bold ${colorClass}`}>{title}</h3>
                <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
                    {description}
                </p>
            </div>
        </div>
    );
};

export function HowItWorks() {
    const sectionRef = useRef<HTMLElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the section title and description
            gsap.from(".how-it-works-title", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".how-it-works-title",
                    start: "top bottom-=100",
                    end: "top center",
                    toggleActions: "play none none none"
                }
            });

            gsap.from(".how-it-works-description", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".how-it-works-description",
                    start: "top bottom-=100",
                    end: "top center",
                    toggleActions: "play none none none"
                }
            });

            // Animate steps with stagger
            const steps = stepsRef.current?.children;
            if (steps) {
                gsap.from(steps, {
                    x: -50,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: stepsRef.current,
                        start: "top bottom-=100",
                        end: "top center",
                        toggleActions: "play none none none"
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
                <div className="relative">
                    {/* Background rectangle */}
                    <div className="absolute inset-0 bg-gray-50 dark:bg-neutral-900/50 rounded-[2.5rem] -mx-6 sm:-mx-10 md:-mx-16 lg:-mx-24 xl:-mx-32" />

                    {/* Content */}
                    <div className="relative z-10 py-12 sm:py-16 md:py-20 px-6 sm:px-8 md:px-12 lg:px-16">
                        <div className="text-center mb-12 sm:mb-16 md:mb-20">
                            <h2 className="how-it-works-title text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
                            <p className="how-it-works-description text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
                                A simple, powerful way to build and deploy your applications.
                            </p>
                        </div>
                        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            <Step
                                number={1}
                                title="Write"
                                description="Craft your business logic as lightweight dots – no servers, no infrastructure."
                                colorClass="text-blue-400"
                            />
                            <Step
                                number={2}
                                title="Deploy"
                                description="Push your dot to Dotlanth's VM in one click. We handle the runtime, parallel execution, and state."
                                colorClass="text-green-400"
                            />
                            <Step
                                number={3}
                                title="Scale"
                                description="Instantly serve thousands of users with built-in auto-scaling and live updates. Your code just works."
                                colorClass="text-purple-400"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 