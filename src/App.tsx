import './App.css';
import { ThemeProvider } from './components/theme-provider';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
