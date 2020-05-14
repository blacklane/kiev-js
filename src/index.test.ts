import logger from '.'

describe('Logger', () => {
  describe('info', () => {
    it('generates a log with level info', () => {
      expect.assertions(2)

      const spy = jest.spyOn(console, 'info')
      logger.info({ message: 'Nada' }, 'test', 'it')
      const message = JSON.parse(spy.mock.calls[0][0])

      expect(console.info).toHaveBeenCalledTimes(1)
      expect(message.log_level).toStrictEqual('info')

      spy.mockRestore()
    })

    it('generates a log with the body as the JSON passed', () => {
      expect.assertions(2)

      const spy = jest.spyOn(console, 'info')
      logger.info({ message: 'Nada' }, 'test', 'it')
      const message = JSON.parse(spy.mock.calls[0][0])

      expect(console.info).toHaveBeenCalledTimes(1)
      expect(message.body).toStrictEqual({ message: 'Nada' })

      spy.mockRestore()
    })

    it('generates a log with level warn', () => {
      expect.assertions(2)

      const spy = jest.spyOn(console, 'warn')
      logger.warn({ message: 'Nada' }, 'test', 'it')
      const message = JSON.parse(spy.mock.calls[0][0])

      expect(console.warn).toHaveBeenCalledTimes(1)
      expect(message.log_level).toStrictEqual('warn')

      spy.mockRestore()
    })

    it('generates a log with level error', () => {
      expect.assertions(2)

      const spy = jest.spyOn(console, 'error')
      logger.error({ message: 'Nada' }, 'test', 'it')
      const message = JSON.parse(spy.mock.calls[0][0])

      expect(console.error).toHaveBeenCalledTimes(1)
      expect(message.log_level).toStrictEqual('error')

      spy.mockRestore()
    })
  })
})
