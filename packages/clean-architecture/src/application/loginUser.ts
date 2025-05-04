import type { AuthenticationService, NotificationService, UserStorageService } from './ports'

interface Props {
  auth: AuthenticationService
  userStorageService: UserStorageService
  notificationService: NotificationService
}

// FIXME: add loading state 🐢
export function useLoginUser({ auth, userStorageService, notificationService }: Props) {
  async function authenticate(payload: { login: string, password: string }) {
    try {
      const user = await auth.login(payload)
      userStorageService.updateUser(user)
    }
    catch (err) {
      notificationService.notify(`Error logging, try again later`)
      throw err
    }
  }

  return {
    user: userStorageService.getUser(),
    authenticate,
  }
}
