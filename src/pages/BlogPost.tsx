import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBackground from '../components/AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

const BlogPost: React.FC = () => {
    const mainContentRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial animations for the hero section
            gsap.from(headingRef.current, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top bottom-=100",
                    end: "top center",
                    toggleActions: "play none none reverse"
                }
            });

            gsap.from(descriptionRef.current, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: descriptionRef.current,
                    start: "top bottom-=100",
                    end: "top center",
                    toggleActions: "play none none reverse"
                }
            });

            // Animate sections as they come into view
            sectionRefs.current.forEach((section, index) => {
                if (section) {
                    gsap.from(section, {
                        y: 50,
                        opacity: 0,
                        duration: 1.2,
                        delay: index * 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom-=100",
                            end: "top center",
                            toggleActions: "play none none reverse"
                        }
                    });
                }
            });
        }, mainContentRef)

        return () => {
            ctx.revert();
        };
    }, []);

    const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
        sectionRefs.current[index] = el;
    };

    return (
        <>
            <title>Introducing Dotlanth | Synerthink Blog</title>
            <meta name="description" content="Learn about our vision for simplifying software development with Dotlanth, a new foundation for your software projects." />
            <meta name="keywords" content="Dotlanth, Synerthink, software development, technology, innovation, software foundation" />
            <meta property="og:title" content="Introducing Dotlanth | Synerthink Blog" />
            <meta property="og:description" content="Learn about our vision for simplifying software development with Dotlanth, a new foundation for your software projects." />
            <meta property="og:type" content="article" />
            <meta property="article:published_time" content="2025-05-01" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Introducing Dotlanth | Synerthink Blog" />
            <meta name="twitter:description" content="Learn about our vision for simplifying software development with Dotlanth, a new foundation for your software projects." />

            <main className="relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden transition-colors">
                {/* Hero Section with Animated Background */}
                <div className="relative w-full flex items-center justify-center min-h-[60vh] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
                    <div className="absolute inset-0">
                        <AnimatedBackground />
                    </div>
                    <div className="absolute inset-0 mx-2 my-4 md:mx-4 lg:mx-8 xl:mx-12 bg-background/40 backdrop-blur-sm rounded-3xl" style={{ pointerEvents: 'auto' }} />
                    <div ref={mainContentRef} className="relative flex flex-col justify-center items-center w-full h-full min-h-[40vh] max-w-4xl mx-auto px-2 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-12 z-10">
                        <div ref={headingRef} className="w-full flex flex-col gap-1 sm:gap-2 items-center">
                            <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
                                Introducing Dotlanth
                            </h1>
                        </div>
                        <div ref={descriptionRef} className="w-full max-w-3xl flex flex-col gap-8 sm:gap-8 items-center mt-8">
                            <p className="text-center text-lg sm:text-xl md:text-2xl font-light text-foreground leading-relaxed">
                                At Synerthink, we believe building software should be simpler. Much simpler. For a long time, developers have had to wrestle with a lot of complexity that gets in the way of actually creating. We think there's a better way.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <article className="prose prose-lg dark:prose-invert">
                        {/* What is Dotlanth Section */}
                        <div ref={setSectionRef(0)} className="mb-16">
                            <h2 className="text-3xl font-semibold mb-6">So, what is Dotlanth?</h2>
                            <p className="mb-6">
                                Think of it as a new foundation for your software projects. We're taking ideas from how virtual machines work and applying them to everyday software development, but without the blockchain part. Our goal is to let you write your business logic – the actual rules and processes that make your application work – and have it run easily and efficiently.
                            </p>
                            <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg mb-6">
                                <h3 className="text-xl font-semibold mb-4">What is a Dot?</h3>
                                <p className="mb-4">
                                    A Dot is a unit of logic on Dotlanth – lightweight, composable, and infinitely scalable. It's the fundamental building block of your application, representing a single piece of business logic that can be combined with other dots to create complex systems.
                                </p>
                                <p>
                                    Dots come in different variants to serve specific purposes:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li><strong>ParaDots</strong> – Parallelizable dots for high-performance computing</li>
                                    <li><strong>DataDots</strong> – Dots that act as schemas and data sources</li>
                                    <li><strong>UILinks</strong> – Auto-bound UI components to dots</li>
                                </ul>
                            </div>
                        </div>

                        {/* Technical Architecture Section */}
                        <div ref={setSectionRef(1)} className="mb-16">
                            <h2 className="text-3xl font-semibold mb-6">Technical Architecture</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-4">DOTVM (Dotlanth Virtual Machine)</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Custom bytecode interpreter for efficient dot execution</li>
                                        <li>Built-in concurrency support with actor model</li>
                                        <li>Hot-reloading capabilities for instant updates</li>
                                        <li>Memory-safe execution environment</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-4">DOTDB (Dotlanth Database)</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Distributed key-value store with ACID compliance</li>
                                        <li>Built-in versioning and conflict resolution</li>
                                        <li>Automatic sharding and replication</li>
                                        <li>Zero-configuration setup</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* ParaDots Section */}
                        <div ref={setSectionRef(2)} className="mb-16">
                            <h2 className="text-3xl font-semibold mb-6">ParaDots: Parallel Processing</h2>
                            <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg mb-6">
                                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Automatic parallelization of independent operations</li>
                                    <li>Built-in deadlock prevention</li>
                                    <li>Resource-aware scheduling</li>
                                    <li>Cross-dot communication primitives</li>
                                </ul>
                            </div>
                        </div>

                        {/* Dot Variants Section */}
                        <div ref={setSectionRef(3)} className="mb-16">
                            <h2 className="text-3xl font-semibold mb-6">Dot Variants</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-4">ParaDots</h3>
                                    <p className="mb-4">Parallelizable dots for high-performance computing:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Automatic parallelization</li>
                                        <li>Resource optimization</li>
                                        <li>Cross-dot communication</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-4">DataDots</h3>
                                    <p className="mb-4">Dots that act as schemas and data sources:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Schema validation</li>
                                        <li>Data transformation</li>
                                        <li>Real-time updates</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-4">UILinks</h3>
                                    <p className="mb-4">Auto-bound UI components to dots:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Automatic UI generation</li>
                                        <li>Real-time updates</li>
                                        <li>Responsive design</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Development Experience Section */}
                        <div ref={setSectionRef(4)} className="mb-16">
                            <h2 className="text-3xl font-semibold mb-6">Development Experience</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-4">Local Development</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Instant local environment setup</li>
                                        <li>Hot-reloading development server</li>
                                        <li>Built-in debugging tools</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-4">Testing</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Automated test generation</li>
                                        <li>Property-based testing</li>
                                        <li>Performance benchmarking</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-4">Deployment</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>One-command deployment</li>
                                        <li>Automatic scaling</li>
                                        <li>Zero-downtime updates</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Future Goals Section */}
                        <div ref={setSectionRef(5)} className="mb-16">
                            <h2 className="text-3xl font-semibold mb-6">Future Goals</h2>
                            <div className="space-y-6">
                                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-4">AI-Powered Development</h3>
                                    <p className="mb-4">We're working on integrating AI capabilities to assist developers:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Automated code generation from natural language</li>
                                        <li>Intelligent test case generation</li>
                                        <li>Performance optimization suggestions</li>
                                        <li>Security vulnerability detection</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-100 dark:bg-neutral-900 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-4">Zero-Knowledge Integration</h3>
                                    <p className="mb-4">Advanced privacy features in development:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Private computation capabilities</li>
                                        <li>Secure multi-party computation</li>
                                        <li>Privacy-preserving analytics</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div ref={setSectionRef(6)} className="text-center mt-16">
                            <h2 className="text-3xl font-semibold mb-6">Join Us in Building the Future</h2>
                            <p className="mb-8 text-lg">
                                We're excited to build this future with you. Stay tuned for updates as we continue to develop Dotlanth.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                Thanks,<br />
                                The Synerthink Team
                            </p>
                        </div>
                    </article>
                </div>
            </main>
        </>
    );
};

export default BlogPost; 