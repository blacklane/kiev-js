import { AttributesFilter } from './filter'

let attrsFilter: AttributesFilter
let filterConfig: string[]

const logToBeFiltered = {
  firstName: 'John',
  lastName: 'Doe',
  rolePolicy: 'admin',
  email: 'john.doe@example.com',
  address: {
    street: 'Some street, 99, 12345-67'
  },
  settings: {
    darkMode: false,
    clientToken: 'SfieRBC1i3ncxakwe12asdf'
  }
}

describe('attributesFilter', () => {
  beforeEach(() => {
    attrsFilter = new AttributesFilter(filterConfig)
  })

  describe('filter', () => {
    describe('when filter has not attributes configured', () => {
      it('returns the original json when not filter configured', () => {
        expect.assertions(1)

        const expectedResult = logToBeFiltered
        const response = attrsFilter.filter(logToBeFiltered)

        expect(response).toStrictEqual(expectedResult)
      })
    })

    describe('when filter has attributes configured', () => {
      beforeEach(() => {
        filterConfig = [
          'firstName',
          'lastName',
          'email',
          'street',
          'clientToken'
        ]
        attrsFilter = new AttributesFilter(filterConfig)
      })

      it('returns a new json with the params filtered', () => {
        expect.assertions(1)

        const expectedResult = {
          firstName: '[FILTERED]',
          lastName: '[FILTERED]',
          rolePolicy: 'admin',
          email: '[FILTERED]',
          address: {
            street: '[FILTERED]'
          },
          settings: {
            darkMode: false,
            clientToken: '[FILTERED]'
          }
        }
        const response = attrsFilter.filter(logToBeFiltered)

        expect(response).toStrictEqual(expectedResult)
      })
    })
  })
})
