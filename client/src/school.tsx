import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './programme.css'
import './school.css'
import SchoolApp from './SchoolApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SchoolApp />
  </StrictMode>,
)
