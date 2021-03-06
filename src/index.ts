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

class Logger {
  application: string
  environment: string
  fields: Object

  constructor (application: string, environment: string, fields: Object = {}) {
    this.application = application
    this.environment = environment
    this.fields = fields
  }

  /**
   * Sets the fields to be logged on every log in addition to the payload
   * passed to any of the log methods. If any key was already set, it'll be
   * overridden.
   * @param {Object} fields to be added to all log entries.
   */
  public setFields (fields: Object) {
    this.fields = { ...this.fields, ...fields }
  }

  /**
   * Returns a new logger which fields is the union of this logger fields and
   * the fields parameter.
   * @param {Object} fields to be added to all log entries.
   */
  public extend (fields: Object): Logger {
    return new Logger(this.application, this.environment, {
      ...this.fields,
      ...fields
    })
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
   * @param {String} message is the core information detail of your log entry.
   * By reading it anyone should understand what the log entry is about.
   * @param {object} [payload] is a JSON object, usually a request or event payload.
   */
  public debug (message: string, payload: Object = {}): void {
    logger.debug(this._buildPayload(LogLevel.DEBUG, message, payload))
  }

  /**
   * Generates an output log with severity level INFO.
   *
   * @param {String} message is the core information detail of your log entry.
   * By reading it anyone should understand what the log entry is about.
   * @param {object} [payload] is a JSON object, usually a request or event payload.
   */
  public info (message: string, payload: Object = {}): void {
    logger.info(this._buildPayload(LogLevel.INFO, message, payload))
  }

  /**
   * Generates an output log with severity level WARN.
   *
   * @param {String} message is the core information detail of your log entry.
   * By reading it anyone should understand what the log entry is about.
   * @param {object} [payload] is a JSON object, usually a request or event payload.
   */
  public warn (message: string, payload: Object = {}): void {
    logger.warn(this._buildPayload(LogLevel.WARN, message, payload))
  }

  /**
   * Generates an output log with severity level ERROR.
   *
   * @param {String} message is the core information detail of your log entry.
   * By reading it anyone should understand what the log entry is about.
   * @param {object} [payload] is a JSON object, usually a request or event payload.
   */
  public error (message: string, payload: Object = {}): void {
    logger.error(this._buildPayload(LogLevel.ERROR, message, payload))
  }

  /**
   * Generates an output log with severity level TRACE.
   *
   * @param {String} message is the core information detail of your log entry.
   * By reading it anyone should understand what the log entry is about.
   * @param {object} [payload] is a JSON object, usually a request or event payload.
   */
  public trace (message: string, payload: Object = {}): void {
    logger.trace(this._buildPayload(LogLevel.TRACE, message, payload))
  }

  /**
   * Creates the log payload.
   *
   * @param {String} severity the log level.
   * @param {String} message  is the description of log(i.e. "Lorem ipsum dolor sit amet").
   * @param {Object} payload is a JSON object, usually a request or event payload.
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

    return JSON.stringify({ ...logEvent, ...this.fields, ...payload })
  }
}

export { Logger, LogLevel }
