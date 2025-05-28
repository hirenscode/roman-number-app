import './App.css'
import { ColorSchemeProvider } from './contexts/ColorSchemeContext.jsx'
import RomanNumber from './pages/RomanNumber.jsx';

function App() {

  return (
    <ColorSchemeProvider>
      <RomanNumber/>
    </ColorSchemeProvider>
  )
}

export default App
