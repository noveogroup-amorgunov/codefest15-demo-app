import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { DIContainerProvider } from './providers/diContainer/DIContainerProvider'
import { LayoutProvider } from './providers/layout/LayoutProvider'
import { ReduxProvider } from './providers/redux/ReduxProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DIContainerProvider>
      <ReduxProvider>
        <LayoutProvider />
      </ReduxProvider>
    </DIContainerProvider>
  </React.StrictMode>,
)
