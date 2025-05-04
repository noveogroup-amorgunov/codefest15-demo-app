import { useContext } from 'react'
import { DIContext } from '../model/context'

export function useDi<T extends ReturnType<DIContainer['getKeys']>[number]>(token: T) {
  const di = useContext(DIContext)

  if (!di) {
    throw new Error('DIContext is not found')
  }

  return di.get(token)
}
