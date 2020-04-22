import { sum } from '.'

describe('blah', () => {
  it('works', () => {
    expect.assertions(1)
    expect(sum(1, 1)).toStrictEqual(2)
  })
})
