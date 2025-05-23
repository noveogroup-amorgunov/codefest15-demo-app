import { useContext } from 'react'
import type { container } from '../model/DIContainer'
import { DIContext } from '../model/DIContainerProvider'

export function useDi<T extends ReturnType<typeof container['getKeys']>[number]>(token: T) {
  const di = useContext(DIContext)

  if (!di) {
    throw new Error('DIContext is not found')
  }

  const service = di.get(token)

  if (!service) {
    throw new Error(`Service ${token} is not registered yet`)
  }

  return service
}
