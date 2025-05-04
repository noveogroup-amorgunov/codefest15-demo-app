export function fakeApi<T>(response: T): Promise<T> {
  return new Promise(res => setTimeout(() => res(response), 450))
}
