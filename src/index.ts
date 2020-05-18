enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

interface LogMessage {
  application: string
  environment: string
  level: LogLevel
  message: string
  timestamp: string
}

class Kiev {
  application: string
  environment: string
  level: LogLevel

  constructor (application: string, environment: string) {
    this.application = application
    this.environment = environment
    this.level = LogLevel.INFO
  }

  /**
   * Generates an output log with severity level INFO.
   *
   * @param message  [String] is the name of log event(i.e. request_started, request_finished and etc).
   * @param payload [Object] is a JSON object that represents the content of the event.
   */
  info (message: string, payload: Object): void {
    console.info(this._buildPayload(LogLevel.INFO, message, payload))
  }

  /**
   * Generates an output log with severity level DEBUG.
   *
   * @param message  [String] is the name of log event(i.e. request_started, request_finished and etc).
   * @param payload [Object] is a JSON object that represents the content of the event.
   */
  debug (message: string, payload: Object): void {
    console.debug(this._buildPayload(LogLevel.DEBUG, message, payload))
  }

  /**
   * Generates an output log with severity level ERROR.
   *
   * @param message  [String] is the name of log event(i.e. request_started, request_finished and etc).
   * @param payload [Object] is a JSON object that represents the content of the event.
   */
  error (message: string, payload: Object): void {
    console.error(this._buildPayload(LogLevel.ERROR, message, payload))
  }

  /**
   * Generates an output log with severity level WARN.
   *
   * @param message  [String] is the name of log event(i.e. request_started, request_finished and etc).
   * @param payload [Object] is a JSON object that represents the content of the event.
   */
  warn (message: string, payload: Object): void {
    console.warn(this._buildPayload(LogLevel.WARN, message, payload))
  }

  /**
   * Creates the log structure.
   *
   * @param severity [LogLevel] the log level.
   * @param message  [String] is the description of log(i.e. "Lorem ipsum dolor sit amet").
   * @param payload [Object] is a JSON object that represents the content of the event.
   */
  protected _buildPayload (
    severity: LogLevel,
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

export { Kiev }
