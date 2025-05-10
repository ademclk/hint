import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
    products: [
        { label: "Platform", href: "/" },
        { label: "Solutions", href: "/" },
        { label: "Features", href: "/" }
    ],
    solutions: [
        { label: "Enterprise", href: "/" },
        { label: "Startups", href: "/" },
        { label: "Developers", href: "/" }
    ],
    developer: [
        { label: "Documentation", href: "/" },
        { label: "API Reference", href: "" },
        { label: "SDK", href: "/" }
    ],
    research: [
        { label: "Publications", href: "/" },
        { label: "Case Studies", href: "/" },
        { label: "Research Papers", href: "/" }
    ],
    about: [
        { label: "Company", href: "/" },
        { label: "Careers", href: "/" },
        { label: "Press", href: "/" }
    ],
    contact: [
        { label: "Support", href: "/" },
        { label: "Sales", href: "/" },
        { label: "Partners", href: "/" }
    ],
    training: [
        { label: "Courses", href: "/" },
        { label: "Certification", href: "/" },
        { label: "Workshops", href: "/" }
    ],
    investor: [
        { label: "Investors", href: "/" },
        { label: "Financials", href: "/" },
        { label: "News", href: "/" }
    ]
};

export function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const sectionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(sectionsRef.current?.children || [], {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top bottom-=100",
                    end: "top center",
                    toggleActions: "play none none none"
                }
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const renderFooterSection = (section: string, title: string, items: typeof footerLinks.products) => (
        <div>
            <h3 className="text-xs font-semibold leading-6 text-gray-800 dark:text-gray-200">{title}</h3>
            <ul role="list" className="space-y-1">
                {items.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.href}
                            className="text-xs leading-6 text-gray-800 dark:text-gray-200 hover:underline"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );

    const renderFooterLinks = (section: string, items: typeof footerLinks.products) => (
        <ul role="list" className="space-y-1">
            {items.map((item, index) => (
                <li key={index}>
                    <Link
                        to={item.href}
                        className="text-xs leading-6 text-gray-800 dark:text-gray-200 hover:underline"
                    >
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );

    return (
        <footer
            ref={footerRef}
            className="py-8 bg-zinc-100 dark:bg-zinc-900 px-4"
            aria-labelledby="footer-heading"
        >
            <div className="max-w-4xl mx-auto text-left">
                <p className="max-w-4xl text-sm text-center text-gray-800 dark:text-gray-200">
                    Advancing technology for all. Building the next generation of digital infrastructure that enables people to connect, create, and collaborate.
                </p>

                <div className="h-4" />
                <div className="border-t border-gray-200 dark:border-gray-800" />
                <div className="h-4" />

                <div className="hidden md:grid md:grid-cols-2 gap-8 mt-16 xl:col-span-2 xl:mt-0">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        {renderFooterSection("products", "Products", footerLinks.products)}
                        {renderFooterSection("solutions", "Solutions", footerLinks.solutions)}
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        {renderFooterSection("developer", "Developer", footerLinks.developer)}
                        {renderFooterSection("research", "Research", footerLinks.research)}
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        {renderFooterSection("about", "About", footerLinks.about)}
                        {renderFooterSection("contact", "Contact", footerLinks.contact)}
                    </div>
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        {renderFooterSection("training", "Training", footerLinks.training)}
                        {renderFooterSection("investor", "Investor", footerLinks.investor)}
                    </div>
                </div>

                <div className="md:hidden">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="products">
                            <AccordionTrigger className="text-sm">Products</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks("products", footerLinks.products)}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="solutions">
                            <AccordionTrigger className="text-sm">Solutions</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks("solutions", footerLinks.solutions)}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="developer">
                            <AccordionTrigger className="text-sm">Developer</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks("developer", footerLinks.developer)}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="research">
                            <AccordionTrigger className="text-sm">Research</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks("research", footerLinks.research)}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="about">
                            <AccordionTrigger className="text-sm">About</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks("about", footerLinks.about)}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="contact">
                            <AccordionTrigger className="text-sm">Contact</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks("contact", footerLinks.contact)}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="training">
                            <AccordionTrigger className="text-sm">Training</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks("training", footerLinks.training)}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="investor">
                            <AccordionTrigger className="text-sm">Investor</AccordionTrigger>
                            <AccordionContent>
                                {renderFooterLinks("investor", footerLinks.investor)}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className="h-4" />
                <div className="px-2 mt-2 pt-4 flex justify-center">
                    <p className="text-xs leading-5 text-gray-500 text-center">
                        © {new Date().getFullYear()} Synerthink. All rights reserved.
                    </p>
                </div>
                <div className="h-2" />
                <div className="border-t border-gray-200 dark:border-gray-800" />
                <div className="px-2 md:px-unit-xl py-4 flex justify-center">
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://github.com/synerthink"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-800 dark:text-gray-200 hover:underline"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/company/synerthink"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-800 dark:text-gray-200 hover:underline"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://twitter.com/synerthink"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-800 dark:text-gray-200 hover:underline"
                        >
                            Twitter
                        </a>
                        <a
                            href="https://instagram.com/synerthink"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-800 dark:text-gray-200 hover:underline"
                        >
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
} 