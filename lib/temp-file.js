'use strict'
const {readFileSync, writeFileSync, exitsSync, unlinkSync} = require('fs')
const {randomBytes} = require('crypto')

class TempFile {
  constructor ({
    directory = require('process').cwd(),
    prefix = 'temp-',
    suffix = '.tmp'
  } = {}) {
    const middle = randomBytes(16).toString('hex')
    const filename = prefix + middle + suffix
    return {directory, filename, prefix, middle, suffix, __proto__: this}
  }

  * [Symbol.iterator] (...args) {
    yield * this.read(...args)
  }

  toString (read = false) {
    return read ? this.read('utf8') : this.filename
  }

  empty (...args) {
    writeFileSync(this.filename, '', ...args)
    return this
  }

  unlink (...args) {
    unlinkSync(this.filename, ...args)
    return this
  }

  read (...args) {
    return readFileSync(this.filename, ...args)
  }

  write (...args) {
    writeFileSync(this.filename, ...args)
    return this
  }
}

module.exports = TempFile
