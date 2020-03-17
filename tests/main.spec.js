const cli = require('commander')

describe('main', () => {

  const excuteTests = (main) => {
    test('should foo', () => {
      expect(main)
        .toBeInstanceOf(cli.Command)
    })
  }

  describe("when using package's main", () => {
    const main = require('..')
    excuteTests(main)
  })

  describe('when using lib/main.js', () => {
    const main = require('../lib/main.js')
    excuteTests(main)
  })

})
