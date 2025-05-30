import './App.css'
import { APIConfigProvider } from './contexts/APIConfigContext.jsx';
import { ColorSchemeProvider } from './contexts/ColorSchemeContext.jsx'
import RomanNumber from './pages/RomanNumber.jsx';
import { initWebVitals, logError } from './utils/observability';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Initialize Web Vitals monitoring
    initWebVitals();

    // Global error handler
    const handleError = (error) => {
      logError(error, { location: 'global' });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', (event) => {
      logError(event.reason, { location: 'unhandledrejection' });
    });

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  return (
    <ColorSchemeProvider>
      <APIConfigProvider>
        <RomanNumber/>
      </APIConfigProvider>
    </ColorSchemeProvider>
  )
}

export default App
