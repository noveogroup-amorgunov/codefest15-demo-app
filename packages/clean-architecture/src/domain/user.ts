export type UniqueId = string

export interface User {
  id: UniqueId
  login: string
  age: number
}

export function isConfirmedAge18(user: User): boolean {
  return user.age >= 18
}
