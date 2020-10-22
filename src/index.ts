import * as logger from 'loglevel'

interface LogMessage {
  application: string
  environment: string
  level: string
  message: string
  timestamp: string
}

enum LogLevel {
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  SILENT = 'SILENT'
}

class Kiev {
  application: string
  environment: string

  constructor (application: string, environment: string) {
    this.application = application
    this.environment = environment
  }

  /**
   * Changes the current logger level.
   *
   * @param {LogLevel} level the log level.
   */
  public setLevel (level: LogLevel): void {
    logger.setLevel(level)
  }

  /**
   * Returns the current logger level.
   *
   */
  public getLevel () {
    let level: LogLevel | null = null

    for (const [name, number] of Object.entries(logger.levels)) {
      if (logger.getLevel() === number) {
        level = name as LogLevel
        break
      }
    }
    return level
  }

  /**
   * Generates an output log with severity level DEBUG.
   *
   * @param {String} message is the name of log event(i.e. request_started, request_finished and etc).
   * @param {object} payload is a JSON object that represents the content of the event.
   */
  public debug (message: string, payload: Object): void {
    logger.debug(this._buildPayload(LogLevel.DEBUG, message, payload))
  }

  /**
   * Generates an output log with severity level INFO.
   *
   * @param {String} message  is the name of log event(i.e. request_started, request_finished and etc).
   * @param {object} payload is a JSON object that represents the content of the event.
   */
  public info (message: string, payload: Object): void {
    logger.info(this._buildPayload(LogLevel.INFO, message, payload))
  }

  /**
   * Generates an output log with severity level WARN.
   *
   * @param {String} message  is the name of log event(i.e. request_started, request_finished and etc).
   * @param {object} payload is a JSON object that represents the content of the event.
   */
  public warn (message: string, payload: Object): void {
    logger.warn(this._buildPayload(LogLevel.WARN, message, payload))
  }

  /**
   * Generates an output log with severity level ERROR.
   *
   * @param {String} message  is the name of log event(i.e. request_started, request_finished and etc).
   * @param {object} payload is a JSON object that represents the content of the event.
   */
  public error (message: string, payload: Object): void {
    logger.error(this._buildPayload(LogLevel.ERROR, message, payload))
  }

  /**
   * Generates an output log with severity level TRACE.
   *
   * @param {String} message  is the name of log event(i.e. request_started, request_finished and etc).
   * @param {object} payload is a JSON object that represents the content of the event.
   */
  public trace (message: string, payload: Object): void {
    logger.trace(this._buildPayload(LogLevel.TRACE, message, payload))
  }

  /**
   * Creates the log structure.
   *
   * @param {String} severity the log level.
   * @param {String} message  is the description of log(i.e. "Lorem ipsum dolor sit amet").
   * @param {Object} payload is a JSON object that represents the content of the event.
   */
  private _buildPayload (
    severity: string,
    message: string,
    payload: Object
  ): string {
    const logEvent: LogMessage = {
      application: this.application,
      environment: this.environment,
      level: severity,
      message: message,
      timestamp: new Date().toISOString()
    }

    return JSON.stringify({ ...logEvent, ...payload })
  }
}

export { Kiev, LogLevel }
