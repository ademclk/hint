import { Link } from "react-router-dom";

const hintFooterLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Experiments", href: "/experiments" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export function Footer() {
  return (
    <footer
      className="py-8 bg-zinc-100 dark:bg-zinc-900 px-4"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          HINT: Exploring the frontiers of quantum understanding, together.
        </p>

        <nav className="mb-6" aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {hintFooterLinks.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="text-sm leading-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} HINT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
 