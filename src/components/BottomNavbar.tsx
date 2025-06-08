import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, BeakerIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, BookOpenIcon as BookOpenIconSolid, BeakerIcon as BeakerIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';

const navigationItems = [
  { name: 'Home', href: '/', icon: HomeIcon, activeIcon: HomeIconSolid },
  { name: 'Series', href: '/series', icon: BookmarkIcon, activeIcon: BookmarkIconSolid },
  { name: 'Blog', href: '/blog', icon: BookOpenIcon, activeIcon: BookOpenIconSolid },
  { name: 'Experiments', href: '/experiments', icon: BeakerIcon, activeIcon: BeakerIconSolid },
];

export default function BottomNavbar() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-secondary/80 dark:bg-card/80 backdrop-blur-xl border-t border-border z-50 transition-all duration-300">
      <div className="max-w-lg mx-auto h-full flex justify-around items-center px-6">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.name}
              to={item.href}
              className="relative group flex flex-col items-center justify-center py-2 px-4"
            >
              <div className={`transition-all duration-300 ease-out ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} absolute -top-1 h-1 w-10 rounded-full bg-primary`}></div>

              <div className={`relative transition-all duration-200 ease-out ${isActive ? 'text-primary transform scale-110' : 'text-muted-foreground group-hover:text-foreground'}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>

              <span className={`mt-1 text-xs font-medium transition-all duration-200 ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
