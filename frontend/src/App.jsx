import './App.css'
import { APIConfigProvider } from './contexts/APIConfigContext.jsx';
import { ColorSchemeProvider } from './contexts/ColorSchemeContext.jsx'
import RomanNumber from './pages/RomanNumber.jsx';

function App() {

  return (
    <ColorSchemeProvider>
      <APIConfigProvider>
        <RomanNumber/>
      </APIConfigProvider>
    </ColorSchemeProvider>
  )
}

export default App
