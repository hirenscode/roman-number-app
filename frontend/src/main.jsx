import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider, defaultTheme} from "@adobe/react-spectrum";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider theme={defaultTheme}>
        <App />
    </Provider>
  </StrictMode>,
)
