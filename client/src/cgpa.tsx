import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './programme.css'
import CgpaApp from './CgpaApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CgpaApp />
  </StrictMode>,
)
