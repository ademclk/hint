import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-section', {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 80%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="container mx-auto px-4 pt-32 pb-20">
            <div className="max-w-4xl mx-auto">
                <div className="about-section mb-16">
                    <h1 className="text-4xl font-bold mb-6">About Dotlanth</h1>
                    <p className="text-lg text-muted-foreground">
                        Dotlanth is a revolutionary platform that simplifies software development by introducing a new paradigm of building applications. We believe that software development should be accessible, efficient, and enjoyable for everyone.
                    </p>
                </div>

                <div className="about-section mb-16">
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                        Our mission is to democratize software development by eliminating the complexity of traditional development approaches. We're building a future where developers can focus on creating value rather than managing infrastructure.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-lg border bg-card">
                            <h3 className="text-xl font-semibold mb-4">Simplify Development</h3>
                            <p className="text-muted-foreground">
                                We're making software development more accessible by removing the need for complex infrastructure and deployment processes.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg border bg-card">
                            <h3 className="text-xl font-semibold mb-4">Empower Developers</h3>
                            <p className="text-muted-foreground">
                                Our platform gives developers the tools they need to build powerful applications without the traditional overhead.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
