import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import SynerthinkLogo from "./synerthink-logo"; // Assuming this path is correct
import { useSpring, animated } from '@react-spring/web';
import { ModeToggle } from './mode-toggle'; // Assuming this path is correct
// import { Button } from './ui/button'; // Button was not used in the original example, commented out

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
    const location = useLocation();
    // const menuButtonRef = useRef<HTMLButtonElement>(null); // Not strictly needed for react-spring version unless for direct manipulation

    useBodyScrollLock(isMenuOpen);

    // Animation for the top line of hamburger
    const topLineAnimation = useSpring({
        transform: isMenuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'rotate(0deg) translate(0px, 0px)',
        config: { duration: 240 }
    });

    // Animation for the middle line (opacity)
    const middleLineAnimation = useSpring({
        opacity: isMenuOpen ? 0 : 1,
        config: { duration: 200 }
    });

    // Animation for the bottom line of hamburger
    const bottomLineAnimation = useSpring({
        transform: isMenuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'rotate(0deg) translate(0px, 0px)',
        config: { duration: 240 }
    });

    // Animation for menu overlay
    const menuOverlayAnimation = useSpring({
        opacity: isMenuOpen ? 1 : 0,
        transform: isMenuOpen ? 'translateY(0%) scale(1)' : 'translateY(-5%) scale(0.98)',
        config: { duration: 300, tension: 280, friction: 26 },
        pointerEvents: isMenuOpen ? 'auto' : 'none',
    });


    useEffect(() => {
        // Close menu on location change
        if (isMenuOpen) {
            setMenuOpen(false);
        }
    }, [location]);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
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
                            <Link key={name} to={href} className="text-sm font-extralight text-link"> {/* Consider a more visible text color */}
                                {name}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center lg:order-3">
                        <ModeToggle />
                        <button
                            // ref={menuButtonRef}
                            className="md:hidden p-2 ml-2" // Added ml-2 for spacing from ModeToggle
                            onClick={toggleMenu}
                            aria-label="Toggle navigation menu"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" style={{ overflow: 'visible' }}>
                                <animated.line
                                    style={topLineAnimation}
                                    x1="2" y1="5" x2="16" y2="5"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <animated.line
                                    style={middleLineAnimation}
                                    x1="2" y1="10" x2="16" y2="10"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <animated.line
                                    style={bottomLineAnimation}
                                    x1="2" y1="15" x2="16" y2="15"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
            <animated.div
                style={menuOverlayAnimation}
                className="fixed inset-0 z-[99] bg-background/80 backdrop-blur-3xl flex flex-col px-8 py-8 h-full overflow-y-auto"
                // The style prop for react-spring handles display and pointerEvents
            >
                <nav className="mt-24 space-y-8 flex flex-col"> {/* Increased mt for spacing from header */}
                    {NAV_LINKS.map(({ name, href }) => (
                        <Link
                            key={name}
                            to={href}
                            className="group text-2xl font-semibold text-gray-800 dark:text-gray-100 block px-0 transition relative"
                            style={{ paddingRight: "2.5rem" }} // Keep this style for the arrow hover effect
                            onClick={closeMenu} // Close menu on link click
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
            </animated.div>
        </>
    );
}
