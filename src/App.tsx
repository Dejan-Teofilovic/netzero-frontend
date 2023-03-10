import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AlertMessageProvider } from './contexts/AlertMessageContext'
import { LoadingProvider } from './contexts/LoadingContext'
import { MobileMenuProvider } from './contexts/MobileMenuContext'
import Routes from './Routes'

function App() {
  return (
    <BrowserRouter>
      <AlertMessageProvider>
        <LoadingProvider>
          <MobileMenuProvider>
            <Routes />
          </MobileMenuProvider>
        </LoadingProvider>
      </AlertMessageProvider>
    </BrowserRouter>
  )
}

export default App
