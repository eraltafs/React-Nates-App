import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NoteState } from './contexts/NoteContext.jsx'
import { AlertState } from './contexts/AlertContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AlertState>
      <NoteState>
        <App />
      </NoteState>
    </AlertState>
  </BrowserRouter>

)
