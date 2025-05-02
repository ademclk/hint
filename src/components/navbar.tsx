import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SynerthinkLogo from "./synerthink-logo";

const NAV_LINKS = [
    { name: "About", href: "/about" },
    { name: "Solutions", href: "/solutions" },
    { name: "Dotlanth", href: "https://www.dotlanth.com", external: true },
    { name: "Industries", href: "/industries" },
    { name: "Resources", href: "/resources" },
    { name: "Alpha", href: "/alpha" },
    { name: "Contact", href: "/contact" }
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
    const location = useLocation();
    useBodyScrollLock(isMenuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <header className="sticky top-0 z-50 flex h-12 items-center justify-between bg-background/40 px-4 backdrop-blur-3xl lg:px-6">
                <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base lg:order-1" onClick={closeMenu}>
                        <SynerthinkLogo className="h-10 w-10 pt-2" />
                        <span className="sr-only">Synerthink</span>
                    </Link>
                    <nav className="hidden md:flex flex-1 justify-center space-x-10 lg:order-2">
                        {NAV_LINKS.map(({ name, href, external }) =>
                            external ? (
                                <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-extralight text-link">
                                    {name}
                                </a>
                            ) : (
                                <Link key={name} to={href} className="text-sm font-extralight text-link">
                                    {name}
                                </Link>
                            )
                        )}
                    </nav>
                    <button className="md:hidden lg:order-3 p-2" onClick={() => setMenuOpen(true)} aria-label="Toggle navigation menu">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-[999] bg-white dark:bg-neutral-950 flex flex-col px-8 py-8 h-full overflow-y-auto"
                    style={{ minHeight: "100dvh" }}
                >
                    <button
                        className="absolute top-3 right-10 text-lg cursor-pointer text-gray-700 dark:text-gray-100 hover:text-black dark:hover:text-white"
                        aria-label="Close navigation menu"
                        onClick={closeMenu}
                        style={{
                            appearance: "none",
                            background: "none",
                            border: 0,
                            fontSize: "2rem",
                            lineHeight: 1,
                            fontWeight: 100,
                        }}
                        tabIndex={0}
                    >
                        &times;
                    </button>
                    <nav className="mt-24 space-y-8 flex flex-col">
                        {NAV_LINKS.map(({ name, href, external }) =>
                            external ? (
                                <a
                                    key={name}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group text-2xl font-semibold text-gray-800 dark:text-gray-100 block px-0 transition relative"
                                    style={{ paddingRight: "2.5rem" }}
                                >
                                    <span className="cursor-pointer">{name}</span>
                                    <span className="opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-opacity">
                                        <svg className="inline h-6 w-6 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </a>
                            ) : (
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
                            )
                        )}
                    </nav>
                </div>
            )}
        </>
    );
}  