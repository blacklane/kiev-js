enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

interface Message {
  timestamp: string
  log_level: string
  operation: string
  body: unknown
  message: string
}

/**
 * Creates the message structure.
 *
 * @param body is a JSON object that represents the body.
 * @param operation the log belongs to (request_started, request_finished, authentication and etc). The default is request_finished.
 * @param message is the the core information of the log. By reading it anyone should understand what the log entry is about.
 * @param logLevel is the log level (info, warn, error).
 */
// prettier-ignore
function createMessage (
  body: unknown,
  operation: string,
  message: string,
  logLevel: LogLevel
): string | Message {
  const data: Message = {
    timestamp: new Date().toISOString(),
    log_level: logLevel,
    operation: operation,
    body: body,
    message: message
  }

  return JSON.stringify(data)
}

/**
 * Logs an info log.
 *
 * @param body is a JSON object that represents the body.
 * @param operation the log belongs to (request_started, request_finished, authentication and etc). The default is request_finished.
 * @param message is the the core information of the log. By reading it anyone should understand what the log entry is about.
 */
// prettier-ignore
function info (body: unknown, operation: string, message: string): void {
  console.info(createMessage(body, operation, message, LogLevel.INFO))
}

/**
 * Logs a warn log.
 *
 * @param body is a JSON object that represents the body.
 * @param operation the log belongs to (request_started, request_finished, authentication and etc). The default is request_finished.
 * @param message is the the core information of the log. By reading it anyone should understand what the log entry is about.
 */
// prettier-ignore
function warn (body: unknown, operation: string, message: string): void {
  console.warn(createMessage(body, operation, message, LogLevel.WARN))
}

/**
 * Logs an error log.
 *
 * @param body is a JSON object that represents the body.
 * @param operation the log belongs to (request_started, request_finished, authentication and etc). The default is request_finished.
 * @param message is the the core information of the log. By reading it anyone should understand what the log entry is about.
 */
// prettier-ignore
function error (body: unknown, operation: string, message: string): void {
  console.error(createMessage(body, operation, message, LogLevel.ERROR))
}

export default { info, warn, error }
