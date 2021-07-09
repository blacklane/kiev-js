export class AttributesFilter {
  filteredText: string = '[FILTERED]'
  filters: string[]

  constructor (filters: string[] = []) {
    this.filters = filters
  }

  /**
   * Returns a new Object with the keys which match the filters wit data filtered.
   *
   * @param {Object} attrs to be filtered
   * @return {Object} a new Object with filtered data
   */
  public run (attrs: Object): Object {
    return this.recursiveFilter(attrs)
  }

  private recursiveFilter (attrs: Object) {
    const map = new Map()

    Object.entries(attrs).forEach(pair => {
      const [key, value] = pair

      if (this.typeOfObject(value)) {
        map.set(key, this.recursiveFilter(value))
      } else if (this.shouldKeep(key)) {
        map.set(key, value)
      } else {
        map.set(key, this.filteredText)
      }
    })

    return Object.fromEntries(map)
  }

  private typeOfObject (value: any): boolean {
    return typeof value === 'object'
  }

  private shouldKeep (key: string): boolean {
    return !this.filters.includes(key)
  }
}
