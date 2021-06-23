import { AttributesFilter } from './filter'

let attributesFilter: AttributesFilter
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
    attributesFilter = new AttributesFilter(filterConfig)
  })

  describe('.run', () => {
    describe('has not attributes configured', () => {
      it('returns the original object', () => {
        expect.assertions(1)

        const expectedResult = logToBeFiltered
        const response = attributesFilter.run(logToBeFiltered)

        expect(response).toStrictEqual(expectedResult)
      })
    })

    describe('has attributes configured', () => {
      beforeEach(() => {
        filterConfig = [
          'firstName',
          'lastName',
          'email',
          'street',
          'clientToken'
        ]
        attributesFilter = new AttributesFilter(filterConfig)
      })

      it('returns a new object with the filtered attributes', () => {
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
        const response = attributesFilter.run(logToBeFiltered)

        expect(response).toStrictEqual(expectedResult)
      })
    })
  })
})
