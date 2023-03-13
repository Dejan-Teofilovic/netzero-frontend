import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AlertMessageProvider } from './contexts/AlertMessageContext'
import { LoadingProvider } from './contexts/LoadingContext'
import { MobileMenuProvider } from './contexts/MobileMenuContext'
import { UserProvider } from './contexts/UserContext'
import Routes from './Routes'

function App() {
  return (
    <BrowserRouter>
      <AlertMessageProvider>
        <LoadingProvider>
          <MobileMenuProvider>
            <UserProvider>
              <Routes />
            </UserProvider>
          </MobileMenuProvider>
        </LoadingProvider>
      </AlertMessageProvider>
    </BrowserRouter>
  )
}

export default App
