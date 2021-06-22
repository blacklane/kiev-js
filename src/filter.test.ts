import { AttributesFilter } from './filter'

let attrsFilter: AttributesFilter

const logToBeFiltered = {
  user: {
    firstName: 'John',
    lastName: 'Doe',
    rolePolicy: 'admin',
    email: 'john.doe@example.com',
    settings: {
      darkMode: false
    }
  }
}

describe('attributesFilter', () => {
  beforeEach(() => {
    attrsFilter = new AttributesFilter()
  })

  describe('filter', () => {
    it('returns the original json when not filter configured', () => {
      expect.assertions(1)

      const expectedResult = logToBeFiltered
      const response = attrsFilter.filter(logToBeFiltered)

      expect(response).toStrictEqual(expectedResult)
    })
  })
})
