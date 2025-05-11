import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import SynerthinkLogo from "./synerthink-logo";
import gsap from "gsap";
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';

const NAV_LINKS = [
    { name: "About", href: "/about" },
    { name: "Solutions", href: "/solutions" },
    { name: "Resources", href: "/resources" },
    { name: "Blog", href: "/blog" },
];

function useBodyScrollLock(isLocked) {
    useEffect(() => {
        if (isLocked) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => (document.body.style.overflow = "");
    }, [isLocked]);
}

export default function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const location = useLocation();
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const menuOverlayRef = useRef<HTMLDivElement>(null);
    const topLineRef = useRef<SVGPolylineElement>(null);
    const middleLineRef = useRef<SVGPolylineElement>(null);
    const bottomLineRef = useRef<SVGPolylineElement>(null);
    useBodyScrollLock(isMenuOpen);

    useEffect(() => {
        if (topLineRef.current && middleLineRef.current && bottomLineRef.current) {
            const topLine = topLineRef.current;
            const middleLine = middleLineRef.current;
            const bottomLine = bottomLineRef.current;

            if (isMenuOpen) {
                setIsAnimating(true);
                // Animate to X
                gsap.to(topLine, {
                    attr: { points: "3.5 3.5, 15 15" },
                    duration: 0.24,
                    ease: "power2.inOut"
                });
                gsap.to(middleLine, {
                    opacity: 0,
                    duration: 0.2
                });
                gsap.to(bottomLine, {
                    attr: { points: "3.5 15, 15 3.5" },
                    duration: 0.24,
                    ease: "power2.inOut"
                });

                // Animate menu overlay
                if (menuOverlayRef.current) {
                    menuOverlayRef.current.style.display = 'flex';
                    gsap.fromTo(menuOverlayRef.current,
                        {
                            opacity: 0,
                            y: -20,
                            scale: 0.98
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.4,
                            ease: "power2.out",
                            onComplete: () => setIsAnimating(false)
                        }
                    );
                }
            } else {
                setIsAnimating(true);
                // Animate back to hamburger
                gsap.to(topLine, {
                    attr: { points: "2 5, 16 5" },
                    duration: 0.24,
                    ease: "power2.inOut"
                });
                gsap.to(middleLine, {
                    opacity: 1,
                    duration: 0.2,
                    delay: 0.1
                });
                gsap.to(bottomLine, {
                    attr: { points: "2 15, 16 15" },
                    duration: 0.24,
                    ease: "power2.inOut"
                });

                // Animate menu overlay out
                if (menuOverlayRef.current) {
                    gsap.to(menuOverlayRef.current, {
                        opacity: 0,
                        y: -20,
                        scale: 0.98,
                        duration: 0.4,
                        ease: "power2.in",
                        onComplete: () => {
                            if (menuOverlayRef.current) {
                                menuOverlayRef.current.style.display = 'none';
                                setIsAnimating(false);
                            }
                        }
                    });
                }
            }
        }
    }, [isMenuOpen]);

    const closeMenu = () => {
        if (!isAnimating) {
            setMenuOpen(false);
        }
    };

    return (
        <>
            <header className="sticky top-0 z-[100] flex h-12 items-center justify-between bg-background/40 backdrop-blur-3xl px-4 lg:px-6">
                <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base lg:order-1" onClick={closeMenu}>
                        <SynerthinkLogo className="h-10 w-10 pt-2" />
                        <span className="sr-only">Synerthink</span>
                    </Link>
                    <nav className="hidden md:flex flex-1 justify-center space-x-10 lg:order-2">
                        {NAV_LINKS.map(({ name, href }) => (
                            <Link key={name} to={href} className="text-sm font-extralight text-link">
                                {name}
                            </Link>
                        ))}
                    </nav>
                    <div className="relative z-[101]">
                        <button
                            ref={menuButtonRef}
                            className="md:hidden lg:order-3 p-2"
                            onClick={() => {
                                if (!isAnimating) {
                                    setMenuOpen(!isMenuOpen);
                                }
                            }}
                            aria-label="Toggle navigation menu"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <polyline
                                    ref={topLineRef}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    points="2 5, 16 5"
                                />
                                <polyline
                                    ref={middleLineRef}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    points="2 10, 16 10"
                                />
                                <polyline
                                    ref={bottomLineRef}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    points="2 15, 16 15"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
            <div
                ref={menuOverlayRef}
                className="fixed inset-0 z-[99] bg-background/80 backdrop-blur-3xl flex flex-col px-8 py-8 h-full overflow-y-auto"
                style={{
                    minHeight: "100dvh",
                    display: 'none',
                    isolation: 'isolate'
                }}
            >
                <nav className="mt-24 space-y-8 flex flex-col">
                    {NAV_LINKS.map(({ name, href }) => (
                        <Link
                            key={name}
                            to={href}
                            className="group text-2xl font-semibold text-gray-800 dark:text-gray-100 block px-0 transition relative"
                            style={{ paddingRight: "2.5rem" }}
                            onClick={closeMenu}
                        >
                            <span className="cursor-pointer">{name}</span>
                            <span className="opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-opacity">
                                <svg className="inline h-6 w-6 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}  