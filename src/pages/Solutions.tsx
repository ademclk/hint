import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Solutions() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.development-notice', {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.development-notice',
                    start: 'top center',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <div className="development-notice text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Solutions Coming Soon</h1>
                <p className="text-lg text-muted-foreground mb-6">
                    We're currently developing our comprehensive solutions documentation.
                    Soon you'll find detailed information about:
                </p>
                <ul className="text-muted-foreground space-y-2">
                    <li>• Microservices Architecture</li>
                    <li>• Real-time Application Development</li>
                    <li>• Data Processing Solutions</li>
                    <li>• API Development Patterns</li>
                </ul>
            </div>
        </div>
    );
} 