import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
// SynerthinkLogo import removed
import gsap from "gsap";
// ModeToggle import removed
// Button import was already commented out / not used

const NAV_LINKS = [
    { name: "About", href: "/about" },
    { name: "Solutions", href: "/solutions" },
    { name: "Resources", href: "/resources" },
    { name: "Blog", href: "/blog" },
];

function useBodyScrollLock(isLocked: boolean) {
    useEffect(() => {
        if (isLocked) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
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
        // Close menu on location change
        if (isMenuOpen && !isAnimating) { // Check !isAnimating to prevent closing during animation
            setMenuOpen(false);
        }
    // Adding isAnimating to dependency array as per eslint suggestion if it were active
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, isMenuOpen]); // Removed isAnimating from here as it might cause loop if menu closes while animating out. Simpler to just close.

    useEffect(() => {
        if (topLineRef.current && middleLineRef.current && bottomLineRef.current) {
            const topLine = topLineRef.current;
            const middleLine = middleLineRef.current;
            const bottomLine = bottomLineRef.current;

            if (isMenuOpen) {
                setIsAnimating(true);
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
                // Only animate if not the initial render (menuOverlayRef.current exists and might be visible)
                if (menuOverlayRef.current && menuOverlayRef.current.style.display === 'flex') {
                    setIsAnimating(true);
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
                                }
                                setIsAnimating(false); // Set isAnimating to false after close animation completes
                            }
                        });
                    }
                } else {
                     // Ensure menu is hidden on initial load if isMenuOpen is false
                    if (menuOverlayRef.current) {
                         menuOverlayRef.current.style.display = 'none';
                         menuOverlayRef.current.style.opacity = '0';
                    }
                    // Reset lines to initial hamburger state without animation if not closing
                    if (topLineRef.current) gsap.set(topLineRef.current, { attr: { points: "2 5, 16 5" } });
                    if (middleLineRef.current) gsap.set(middleLineRef.current, { opacity: 1 });
                    if (bottomLineRef.current) gsap.set(bottomLineRef.current, { attr: { points: "2 15, 16 15" } });
                }
            }
        }
    }, [isMenuOpen]);

    const closeMenu = () => {
        if (!isAnimating) {
            setMenuOpen(false);
        }
    };

    const toggleMenu = () => {
        if (!isAnimating) {
            setMenuOpen(!isMenuOpen);
        }
    };

    return (
        <>
            <header className="sticky top-0 z-[100] flex h-12 items-center justify-between bg-background/40 backdrop-blur-3xl px-4 lg:px-6">
                <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base lg:order-1" onClick={closeMenu}>
                        {/* SynerthinkLogo replaced with HINT text */}
                        <span className="font-bold text-xl">HINT</span>
                        <span className="sr-only">HINT Protocol</span>
                    </Link>
                    <nav className="hidden md:flex flex-1 justify-center space-x-10 lg:order-2">
                        {NAV_LINKS.map(({ name, href }) => (
                            <Link key={name} to={href} className="text-sm font-extralight text-link">
                                {name}
                            </Link>
                        ))}
                    </nav>
                    <div className="relative z-[101] flex items-center lg:order-3"> {/* Ensure this div is flex for proper alignment if ModeToggle was the only other item */}
                        {/* ModeToggle removed */}
                        <button
                            ref={menuButtonRef}
                            className="md:hidden p-2" // Removed ml-2 as ModeToggle is gone
                            onClick={toggleMenu}
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
                                    points="2 5, 16 5" // Initial state
                                />
                                <polyline
                                    ref={middleLineRef}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    points="2 10, 16 10" // Initial state
                                />
                                <polyline
                                    ref={bottomLineRef}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    points="2 15, 16 15" // Initial state
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
            <div
                ref={menuOverlayRef}
                className="fixed inset-0 z-[99] bg-background/80 backdrop-blur-3xl flex-col px-8 py-8 h-full overflow-y-auto"
                style={{
                    minHeight: "100dvh", // Ensure it covers viewport height
                    display: 'none', // Initially hidden
                    isolation: 'isolate' // For stacking context
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
