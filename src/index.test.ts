import * as logLevel from 'loglevel'
import { Logger, LogLevel } from '.'

jest.mock('loglevel')
const mockLogLevel = logLevel as jest.Mocked<typeof logLevel>

let logger: Logger
let applicationName: string
let environment: string
let logMessage: string

const logPayload = {
  user: {
    first_name: 'John',
    last_name: 'Doe'
  }
}
let defaultLogAttributes: string[]

describe('logger', () => {
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
    logMessage = 'There was an event here, see the payload'
  })

  beforeEach(() => {
    logger = new Logger(applicationName, environment)
  })

  describe('setLevel', () => {
    it('changes the current log level', () => {
      expect.assertions(1)

      logger.setLevel(LogLevel.ERROR)
      expect(mockLogLevel.setLevel).toHaveBeenCalledWith(LogLevel.ERROR)
    })
  })

  describe('debug', () => {
    beforeEach(() => {
      logger.setLevel(LogLevel.DEBUG)
      mockLogLevel.debug.mockClear()
    })

    it('logs when current level is equal or greater than the DEBUG level', () => {
      expect.assertions(6)

      logger.debug(logMessage, logPayload)
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

    it('logs only the message without extra params', () => {
      expect.hasAssertions()

      logger.debug(logMessage)
      const loggedData = JSON.parse(mockLogLevel.debug.mock.calls[0][0])

      expect(loggedData.message).toStrictEqual(logMessage)
    })
  })

  describe('info', () => {
    beforeEach(() => {
      logger.setLevel(LogLevel.INFO)
      mockLogLevel.info.mockClear()
    })

    it('logs when current level is equal or greater than the INFO level', () => {
      expect.assertions(6)

      logger.info(logMessage, logPayload)
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

    it('logs only the message without extra params', () => {
      expect.hasAssertions()

      logger.info(logMessage)
      const loggedData = JSON.parse(mockLogLevel.info.mock.calls[0][0])

      expect(loggedData.message).toStrictEqual(logMessage)
    })
  })

  describe('warn', () => {
    beforeEach(() => {
      logger.setLevel(LogLevel.WARN)
      mockLogLevel.warn.mockClear()
    })

    it('logs when current level is equal or greater than the WARN level', () => {
      expect.assertions(6)

      logger.warn(logMessage, logPayload)

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

    it('logs only the message without extra params', () => {
      expect.hasAssertions()

      logger.warn(logMessage)
      const loggedData = JSON.parse(mockLogLevel.warn.mock.calls[0][0])

      expect(loggedData.message).toStrictEqual(logMessage)
    })
  })

  describe('error', () => {
    beforeEach(() => {
      logger.setLevel(LogLevel.ERROR)
      mockLogLevel.error.mockClear()
    })

    it('logs when current level is equal or greater than the ERROR level', () => {
      expect.assertions(6)

      logger.setLevel(LogLevel.ERROR)

      logger.error(logMessage, logPayload)

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

    it('logs only the message without extra params', () => {
      expect.hasAssertions()

      logger.error(logMessage)
      const loggedData = JSON.parse(mockLogLevel.error.mock.calls[0][0])

      expect(loggedData.message).toStrictEqual(logMessage)
    })
  })

  describe('trace', () => {
    beforeEach(() => {
      logger.setLevel(LogLevel.TRACE)
      mockLogLevel.trace.mockClear()
    })

    it('logs when current level is equal the TRACE level', () => {
      expect.assertions(6)

      logger.trace(logMessage, logPayload)

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

    it('logs only the message without extra params', () => {
      expect.hasAssertions()

      logger.trace(logMessage)
      const loggedData = JSON.parse(mockLogLevel.trace.mock.calls[0][0])

      expect(loggedData.message).toStrictEqual(logMessage)
    })
  })
})
