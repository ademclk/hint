import './App.css';
import { ThemeProvider } from './components/theme-provider';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Solutions from './pages/Solutions.tsx';
import Resources from './pages/Resources.tsx';
import Blog from './pages/Blog.tsx';
import BlogPost from './pages/BlogPost.tsx';
import BottomNavbar from './components/BottomNavbar';

import { Experiments } from './pages/Experiments';
import { sdk } from '@farcaster/frame-sdk';
import { useEffect } from 'react';

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
      <div className="pb-16"> {/* Main content wrapper with bottom padding for BottomNavbar */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/solutions' element={<Solutions />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/:slug' element={<BlogPost />} />
          <Route path='/experiments' element={<Experiments />} />
        </Routes>
      </div> {/* End of main content wrapper */}
      <BottomNavbar />
    </ThemeProvider>
  );
}

export default App;
