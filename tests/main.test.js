const { ResultType, ok, err } = require('../dist')

const testCases = {
  ok: ok('ok-val'),
  err: err('err-val')
};

describe('When instantiating a result type...', () => {
  test('Ok instance has an "Ok" type', () => {
    expect(testCases.ok.type).toBe(ResultType.Ok)
  })
  test('Err instance has an "Err" type', () => {
    expect(testCases.err.type).toBe(ResultType.Err)
  })
})

describe('When calling unwrap...', () => {
  test('Ok instances return value', () => {
    expect(testCases.ok.unwrap()).toBe('ok-val')
  })
  test('Err instances throw a TypeError', () => {
    expect(() => testCases.err.unwrap()).toThrow()
  })
})

describe('When calling unwrapErr...', () => {
  test('Ok instances throw a TypeError', () => {
    expect(() => testCases.ok.unwrapErr()).toThrow()
  })
  test('Err instances return error value', () => {
    expect(testCases.err.unwrapErr()).toBe('err-val')
  })
})