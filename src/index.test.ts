import { Kiev, Logger, LogLevel } from '.'

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

      kiev.setLevel(LogLevel.WARN)

      expect(kiev.getLevel()).toStrictEqual(LogLevel.WARN)

      kiev.setLevel(LogLevel.ERROR)

      expect(kiev.getLevel()).toStrictEqual(LogLevel.ERROR)
    })
  })

  describe('debug', () => {
    it('logs when current level is equal or greater than the function level', () => {
      expect.assertions(6)

      kiev.setLevel(LogLevel.DEBUG)

      const spy = jest.spyOn(loggerInstance, 'debug')

      kiev.debug('There were an event here, see the payload', logPayload)
      const message = JSON.parse(spy.mock.calls[0][0])

      expect(loggerInstance.debug).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual(LogLevel.DEBUG)
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)
    })
  })

  describe('info', () => {
    it('logs with level INFO', () => {
      expect.assertions(6)

      kiev.setLevel(LogLevel.INFO)

      const spy = jest.spyOn(loggerInstance, 'info')

      kiev.info('There were an event here, see the payload', logPayload)
      const message = JSON.parse(spy.mock.calls[0][0])

      expect(loggerInstance.info).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual(LogLevel.INFO)
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)

      spy.mockRestore()
    })
  })

  describe('warn', () => {
    it('logs with level WARN', () => {
      expect.assertions(6)

      kiev.setLevel(LogLevel.WARN)

      const spy = jest.spyOn(loggerInstance, 'warn')

      kiev.warn('There were an event here, see the payload', logPayload)

      const message = JSON.parse(spy.mock.calls[0][0])

      expect(loggerInstance.warn).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual(LogLevel.WARN)
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)

      spy.mockRestore()
    })
  })

  describe('error', () => {
    it('logs with level ERROR', () => {
      expect.assertions(6)

      kiev.setLevel(LogLevel.ERROR)

      const spy = jest.spyOn(loggerInstance, 'error')

      kiev.error('There were an event here, see the payload', logPayload)

      const message = JSON.parse(spy.mock.calls[0][0])

      expect(loggerInstance.error).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual(LogLevel.ERROR)
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)

      spy.mockRestore()
    })
  })

  describe('trace', () => {
    it('logs with level TRACE', () => {
      expect.assertions(6)

      kiev.setLevel(LogLevel.TRACE)

      const spy = jest.spyOn(loggerInstance, 'trace')

      kiev.trace('There were an event here, see the payload', logPayload)

      const message = JSON.parse(spy.mock.calls[0][0])

      expect(loggerInstance.trace).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual(LogLevel.TRACE)
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)

      spy.mockRestore()
    })
  })
})
