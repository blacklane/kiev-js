import { Kiev, Logger } from '.'

let kiev: Kiev
let applicationName: string
let environment: string

const logPayload = {
  user: {
    first_name: 'John',
    last_name: 'Doe'
  }
}
let defaultLogAttributes: string[]

let loggerInstance: Logger

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
    kiev = new Kiev(applicationName, environment)
    loggerInstance = kiev.getLogger()
  })

  describe('setLevel', () => {
    it('changes the current log level', () => {
      expect.assertions(2)

      kiev.setLevel('warn')

      expect(kiev.getLevel()).toStrictEqual('warn')

      kiev.setLevel('error')

      expect(kiev.getLevel()).toStrictEqual('error')
    })
  })

  describe('debug', () => {
    it('logs when current level is equal or greater than the function level', () => {
      expect.assertions(6)

      kiev.setLevel('debug')

      const spy = jest.spyOn(loggerInstance, 'debug')

      kiev.debug('There were an event here, see the payload', logPayload)
      const message = JSON.parse(spy.mock.calls[0][0])

      expect(loggerInstance.debug).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual('DEBUG')
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)
    })
  })

  describe('info', () => {
    it('logs with level INFO', () => {
      expect.assertions(6)

      kiev.setLevel('info')

      const spy = jest.spyOn(loggerInstance, 'info')

      kiev.info('There were an event here, see the payload', logPayload)
      const message = JSON.parse(spy.mock.calls[0][0])

      expect(loggerInstance.info).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual('INFO')
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)

      spy.mockRestore()
    })
  })

  describe('warn', () => {
    it('logs with level WARN', () => {
      expect.assertions(6)

      kiev.setLevel('warn')

      const spy = jest.spyOn(loggerInstance, 'warn')

      kiev.warn('There were an event here, see the payload', logPayload)

      const message = JSON.parse(spy.mock.calls[0][0])

      expect(loggerInstance.warn).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual('WARN')
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)

      spy.mockRestore()
    })
  })

  describe('error', () => {
    it('logs with level ERROR', () => {
      expect.assertions(6)

      kiev.setLevel('error')

      const spy = jest.spyOn(loggerInstance, 'error')

      kiev.error('There were an event here, see the payload', logPayload)

      const message = JSON.parse(spy.mock.calls[0][0])

      expect(loggerInstance.error).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual('ERROR')
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)

      spy.mockRestore()
    })
  })

  describe('trace', () => {
    it('logs with level TRACE', () => {
      expect.assertions(6)

      kiev.setLevel('trace')

      const spy = jest.spyOn(loggerInstance, 'trace')

      kiev.trace('There were an event here, see the payload', logPayload)

      const message = JSON.parse(spy.mock.calls[0][0])

      expect(loggerInstance.trace).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual('TRACE')
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)

      spy.mockRestore()
    })
  })
})
