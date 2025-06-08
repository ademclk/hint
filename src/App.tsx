import './App.css';
import { ThemeProvider } from './components/theme-provider';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import BottomNavbar from './components/BottomNavbar';
import ScrollToTop from './components/ScrollToTop';

// Lazy load page components
const Home = lazy(() => import('./pages/Home.tsx').then(module => ({ default: module.Home })));
const Solutions = lazy(() => import('./pages/Solutions.tsx'));
const Resources = lazy(() => import('./pages/Resources.tsx'));
const Blog = lazy(() => import('./pages/Blog.tsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.tsx'));
const Series = lazy(() => import('./pages/Series.tsx'));
const SeriesPost = lazy(() => import('./pages/SeriesPost.tsx'));
const Experiments = lazy(() => import('./pages/Experiments.tsx').then(module => ({ default: module.Experiments })));
import { sdk } from '@farcaster/frame-sdk';
import { useEffect } from 'react';
import Navbar from './components/navbar.tsx';

function App() {

  // Initialize Farcaster mini app
  useEffect(() => {
    async function initializeFarcaster() {
      try {
        // Check if we're in a Farcaster mini app environment
        const isMiniApp = await sdk.isInMiniApp();

        if (isMiniApp) {
          // Hide the Farcaster client's native splash screen
          await sdk.actions.ready();
        }
      } catch (error) {
        console.error('Error initializing Farcaster:', error);
      }
    }

    // Initialize Farcaster immediately when the app loads
    initializeFarcaster();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar></Navbar>
      <ScrollToTop />
      <div className="pb-16"> {/* Main content wrapper with bottom padding for BottomNavbar */}
        <Suspense fallback={<div className='flex justify-center items-center h-screen w-full'><p>Loading...</p></div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/solutions' element={<Solutions />} />
            <Route path='/resources' element={<Resources />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/:slug' element={<BlogPost />} />
            <Route path='/series' element={<Series />} />
            <Route path='/series/:id' element={<SeriesPost />} />
            <Route path='/experiments' element={<Experiments />} />
          </Routes>
        </Suspense>
      </div> {/* End of main content wrapper */}
    </ThemeProvider>
  );
}

export default App;
