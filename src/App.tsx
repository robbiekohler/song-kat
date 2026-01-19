import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Progressions } from './pages/Progressions';
import { SongsDatabase } from './pages/SongsDatabase';
import { MySongs } from './pages/MySongs';
import { Auth } from './pages/Auth';
import { Theory } from './pages/Theory';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev: boolean) => !prev);

  return (
    <AuthProvider>
      <div className={darkMode ? 'dark' : ''}>
        <Layout darkMode={darkMode} onToggleDarkMode={toggleDarkMode}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/progressions" element={<Progressions />} />
            <Route path="/songs" element={<SongsDatabase />} />
            <Route path="/my-songs" element={<MySongs />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/theory" element={<Theory />} />
          </Routes>
        </Layout>
      </div>
    </AuthProvider>
  );
}

export default App;
