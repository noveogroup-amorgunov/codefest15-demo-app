import type { AuthenticationService } from '~/application/ports'
import type { User } from '~/domain/user'
import { fakeApi } from './api'

export function authAdapter(): AuthenticationService {
  return {
    async login(payload: {
      login: string
      password: string
    }): Promise<User> {
      return await fakeApi<User>({
        id: 'sample-user-id',
        login: payload.login,
        age: 23,
      })
    },
  }
}
