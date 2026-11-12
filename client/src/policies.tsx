import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './policies.css'
import PoliciesApp from './PoliciesApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PoliciesApp />
  </StrictMode>,
)
