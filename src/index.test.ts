import * as logLevel from 'loglevel'
import { Logger, LoggerConfig, LogLevel } from '.'

jest.mock('loglevel')
const mockLogLevel = logLevel as jest.Mocked<typeof logLevel>

let defaultLogAttributes: string[]
let logger: Logger
let logMessage: string
let loggerInitConfig: LoggerConfig

const application = 'application-name'
const environment = 'development'

const logPayload = {
  user: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  }
}

describe('logger', () => {
  beforeAll(() => {
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
    loggerInitConfig = {
      application: application,
      environment: environment
    }

    logger = new Logger(loggerInitConfig)
  })

  describe('setLevel', () => {
    it('changes the current log level', () => {
      expect.assertions(1)

      logger.setLevel(LogLevel.ERROR)
      expect(mockLogLevel.setLevel).toHaveBeenCalledWith(LogLevel.ERROR)
    })
  })

  describe('constructor with filters', () => {
    beforeEach(() => {
      mockLogLevel.info.mockClear()
    })

    it('changes the current log level', () => {
      expect.assertions(1)

      loggerInitConfig.filterFields = ['email']

      const logger = new Logger(loggerInitConfig)

      logger.info(logMessage, logPayload)
      const message = JSON.parse(mockLogLevel.debug.mock.calls[0][0])

      const expectedPayload = {
        user: {
          firstName: 'John',
          lastName: 'Doe',
          email: '[FILTERED]'
        }
      }

      expect(message).toMatchObject(expectedPayload)
    })
  })

  describe('constructor with fields', () => {
    beforeEach(() => {
      mockLogLevel.info.mockClear()
    })

    it('passing fields to the constructor', () => {
      expect.assertions(4)

      const trackingId = 'passing fields to the constructor'

      loggerInitConfig.initializedFields = {
        tracking_id: trackingId
      }
      const log = new Logger(loggerInitConfig)

      log.info(logMessage, logPayload)

      const message = JSON.parse(mockLogLevel.info.mock.calls[0][0])

      expect(message.application).toStrictEqual(application)
      expect(message.environment).toStrictEqual(environment)
      expect(message.tracking_id).toStrictEqual(trackingId)
      expect(message).toMatchObject(logPayload)
    })

    it('setFields', () => {
      expect.assertions(1)

      const foo = 'foo'
      const bar = 'bar'

      loggerInitConfig.initializedFields = { foo }

      const log = new Logger(loggerInitConfig)

      log.setFields({ foo: bar })
      log.info(logMessage)
      const message = JSON.parse(mockLogLevel.info.mock.calls[0][0])

      expect(message.foo).toStrictEqual(bar)
    })

    it('payload overwrites fields for a single log', () => {
      expect.assertions(2)

      const trackingIdOld = 'old'
      const trackingId = 'new tracking id'

      loggerInitConfig.initializedFields = { tracking_id: trackingIdOld }

      const log = new Logger(loggerInitConfig)

      log.info(logMessage, { tracking_id: trackingId })
      const message1 = JSON.parse(mockLogLevel.info.mock.calls[0][0])

      log.info(logMessage)
      const message2 = JSON.parse(mockLogLevel.info.mock.calls[1][0])

      expect(message1.tracking_id).toStrictEqual(trackingId)
      expect(message2.tracking_id).toStrictEqual(trackingIdOld)
    })
  })

  describe('extend', () => {
    beforeEach(() => {
      mockLogLevel.info.mockClear()
    })

    it('extend', () => {
      expect.assertions(2)

      const trackingId = 'tracking id'

      loggerInitConfig.initializedFields = { tracking_id: trackingId }

      const parent = new Logger(loggerInitConfig)

      const extended = parent.extend({ extend: 'extend' })

      parent.info(logMessage)
      const message1 = JSON.parse(mockLogLevel.info.mock.calls[0][0])

      extended.info(logMessage)
      const message2 = JSON.parse(mockLogLevel.info.mock.calls[1][0])

      expect(message1.tracking_id).toStrictEqual(trackingId)
      expect(message2.extend).toStrictEqual('extend')
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
      expect(message.application).toStrictEqual(application)
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
      expect(message.application).toStrictEqual(application)
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
      expect(message.application).toStrictEqual(application)
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
      expect(message.application).toStrictEqual(application)
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
      expect(message.application).toStrictEqual(application)
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
