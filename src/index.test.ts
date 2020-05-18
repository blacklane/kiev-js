import { Kiev } from '.'

let Logger: Kiev
let applicationName: string
let environment: string

const logPayload = {
  user: {
    first_name: 'John',
    last_name: 'Doe'
  }
}
let defaultLogAttributes: string[]

describe('kiev', () => {
  beforeAll(() => {
    applicationName = 'application-name'
    environment = 'development'
    defaultLogAttributes = [
      'application',
      'environment',
      'level',
      'message',
      'timestamp'
    ]
    Logger = new Kiev(applicationName, environment)
  })

  describe('logging different levels', () => {
    it('outputs with DEBUG', () => {
      expect.assertions(6)

      const spy = jest.spyOn(console, 'debug')
      Logger.debug('There were an event here, see the payload', logPayload)
      const message = JSON.parse(spy.mock.calls[0][0])

      expect(console.debug).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual('DEBUG')
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)
    })

    it('outputs with INFO', () => {
      expect.assertions(6)

      const spy = jest.spyOn(console, 'info')
      Logger.info('There were an event here, see the payload', logPayload)
      const message = JSON.parse(spy.mock.calls[0][0])

      expect(console.info).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual('INFO')
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)
    })

    it('outputs with WARN', () => {
      expect.assertions(6)

      const spy = jest.spyOn(console, 'warn')
      Logger.warn('There were an event here, see the payload', logPayload)
      const message = JSON.parse(spy.mock.calls[0][0])

      expect(console.warn).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual('WARN')
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)
    })

    it('outputs with ERROR', () => {
      expect.assertions(6)

      const spy = jest.spyOn(console, 'error')
      Logger.error('There were an event here, see the payload', logPayload)
      const message = JSON.parse(spy.mock.calls[0][0])

      expect(console.error).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual('ERROR')
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)
    })
  })
})
