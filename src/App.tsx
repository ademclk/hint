import './App.css';
import { ThemeProvider } from './components/theme-provider';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/navbar';
import { Home } from './pages/Home';
import BlogPost from './pages/BlogPost';
import Blog from './pages/Blog';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Resources from './pages/Resources';
import { Footer } from './components/Footer';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/solutions' element={<Solutions />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/introducing-dotlanth' element={<BlogPost />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
