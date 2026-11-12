import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './programme.css'
import './exam.css'
import ExamApp from './ExamApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExamApp />
  </StrictMode>,
)
