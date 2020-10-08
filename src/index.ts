enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

interface Message {
  timestamp: string
  log_level: string
  event: string
  body: unknown
  message: {
    event: string
  }
}

/**
 * Creates the message structure.
 *
 * @param message is a JSON object that represents the body of the event.
 * @param event  is the name of request event (request_started, request_finished and etc). The default is request_finished.
 * @param messageEvent is the name of the system event (BookingFound, BookingNotFound and etc). The default value is 'request'.
 * @param logLevel is the log level (info, warn, error).
 */
// prettier-ignore
function createMessage (
  message: unknown,
  event: string,
  messageEvent: string,
  logLevel: LogLevel
): string | Message {
  const data: Message = {
    timestamp: new Date().toISOString(),
    log_level: logLevel,
    event: event,
    body: message,
    message: {
      event: messageEvent
    }
  }

  return JSON.stringify(data)
}

/**
 * Logs an info log.
 *
 * @param message is a JSON object that represents the body of the event.
 * @param event  is the name of request event (request_started, request_finished and etc)
 * @param messageEvent is the name of the system event (BookingFound, BookingNotFound and etc). The default value is 'request'.
 */
// prettier-ignore
function info (message: unknown, event: string, messageEvent: string): void {
  console.info(createMessage(message, event, messageEvent, LogLevel.INFO))
}

/**
 * Logs a warn log.
 *
 * @param message is a JSON object that represents the body of the event.
 * @param event  is the name of request event (request_started, request_finished and etc)
 * @param messageEvent is the name of the system event (BookingFound, BookingNotFound and etc). The default value is 'request'.
 */
// prettier-ignore
function warn (message: unknown, event: string, messageEvent: string): void {
  console.warn(createMessage(message, event, messageEvent, LogLevel.WARN))
}

/**
 * Logs an error log.
 *
 * @param message is a JSON object that represents the body of the event.
 * @param event  is the name of request event (request_started, request_finished and etc)
 * @param messageEvent is the name of the system event (BookingFound, BookingNotFound and etc). The default value is 'request'.
 */
// prettier-ignore
function error (message: unknown, event: string, messageEvent: string): void {
  console.error(createMessage(message, event, messageEvent, LogLevel.ERROR))
}

export default { info, warn, error }
