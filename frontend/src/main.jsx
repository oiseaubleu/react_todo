import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TaskIndex from './TaskIndex.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskIndex />
  </StrictMode>,
)
