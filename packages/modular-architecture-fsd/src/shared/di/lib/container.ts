export class Container<T extends Record<string, any>> {
  private dependencies: Map<keyof T, T[keyof T]> = new Map()

  constructor(deps: T) {
    this.dependencies = new Map(Object.entries(deps))
  }

  get<K extends keyof T>(token: K): T[K] {
    const dependency = this.dependencies.get(token)
    if (!dependency) {
      throw new Error(`Dependency ${String(token)} not found`)
    }
    return dependency as T[K]
  }

  getKeys(): (keyof T)[] {
    return Object.keys(this.dependencies) as (keyof T)[]
  }
}
