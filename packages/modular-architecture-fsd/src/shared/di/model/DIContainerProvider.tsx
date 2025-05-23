import { createContext } from 'react'
import { container } from './DIContainer'

export const DIContext = createContext<typeof container | null>(null)

export function DIContainerProvider({ children }: { children: React.ReactNode }) {
  // Здесь можно положить DI в реакт контекст
  // для доступа к нему из любого места
  return (
    <DIContext.Provider value={container}>
      {children}
    </DIContext.Provider>
  )
}
