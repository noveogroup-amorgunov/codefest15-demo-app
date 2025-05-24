import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { DIContainerProvider } from '~/shared/di'
import { ReduxProvider } from '~/shared/redux'
import { LayoutProvider } from './providers/layout/LayoutProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DIContainerProvider>
      <ReduxProvider>
        <LayoutProvider />
      </ReduxProvider>
    </DIContainerProvider>
  </React.StrictMode>,
)
