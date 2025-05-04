import { DIContext } from '~/shared/di'
import { container } from './register'

export function DIContainerProvider({ children }: { children: React.ReactNode }) {
  // Здесь можно положить DI в реакт контекст
  // для доступа к нему из любого места
  return (
    <DIContext.Provider value={container}>
      {children}
    </DIContext.Provider>
  )
}
