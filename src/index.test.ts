import * as logLevel from 'loglevel'
import { Kiev, LogLevel } from '.'

jest.mock('loglevel')
const mockLogLevel = logLevel as jest.Mocked<typeof logLevel>

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
  })

  beforeEach(() => {
    kiev = new Kiev(applicationName, environment)
  })

  describe('setLevel', () => {
    it('changes the current log level', () => {
      expect.assertions(3)

      kiev.setLevel(LogLevel.WARN)

      expect(mockLogLevel.setLevel).toHaveBeenCalledWith(LogLevel.WARN)

      kiev.setLevel(LogLevel.ERROR)

      expect(mockLogLevel.setLevel).toHaveBeenCalledWith(LogLevel.ERROR)
      expect(mockLogLevel.setLevel).toHaveBeenCalledTimes(2)
    })
  })

  describe('debug', () => {
    beforeEach(() => {
      kiev.setLevel(LogLevel.DEBUG)
      mockLogLevel.debug.mockClear()
    })

    it('logs when current level is equal or greater than the function level', () => {
      expect.assertions(6)

      kiev.debug('There was an event here, see the payload', logPayload)
      const message = JSON.parse(mockLogLevel.debug.mock.calls[0][0])

      expect(mockLogLevel.debug).toHaveBeenCalledTimes(1)
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
    beforeEach(() => {
      kiev.setLevel(LogLevel.INFO)
      mockLogLevel.info.mockClear()
    })

    it('logs with level INFO', () => {
      expect.assertions(6)

      kiev.info('There were an event here, see the payload', logPayload)
      const message = JSON.parse(mockLogLevel.info.mock.calls[0][0])

      expect(mockLogLevel.info).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual(LogLevel.INFO)
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)
    })
  })

  describe('warn', () => {
    beforeEach(() => {
      kiev.setLevel(LogLevel.WARN)
      mockLogLevel.warn.mockClear()
    })

    it('logs with level WARN', () => {
      expect.assertions(6)

      kiev.warn('There were an event here, see the payload', logPayload)

      const message = JSON.parse(mockLogLevel.warn.mock.calls[0][0])

      expect(mockLogLevel.warn).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual(LogLevel.WARN)
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)
    })
  })

  describe('error', () => {
    beforeEach(() => {
      kiev.setLevel(LogLevel.ERROR)
      mockLogLevel.error.mockClear()
    })

    it('logs with level ERROR', () => {
      expect.assertions(6)

      kiev.setLevel(LogLevel.ERROR)

      kiev.error('There were an event here, see the payload', logPayload)

      const message = JSON.parse(mockLogLevel.error.mock.calls[0][0])

      expect(mockLogLevel.error).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual(LogLevel.ERROR)
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)
    })
  })

  describe('trace', () => {
    beforeEach(() => {
      kiev.setLevel(LogLevel.TRACE)
      mockLogLevel.trace.mockClear()
    })

    it('logs with level TRACE', () => {
      expect.assertions(6)

      kiev.trace('There were an event here, see the payload', logPayload)

      const message = JSON.parse(mockLogLevel.trace.mock.calls[0][0])

      expect(mockLogLevel.trace).toHaveBeenCalledTimes(1)
      expect(Object.keys(message)).toStrictEqual(
        expect.arrayContaining(defaultLogAttributes)
      )
      expect(message.application).toStrictEqual(applicationName)
      expect(message.level).toStrictEqual(LogLevel.TRACE)
      expect(message.environment).toStrictEqual(environment)
      expect(message).toMatchObject(logPayload)
    })
  })
})
