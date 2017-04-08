'use strict'
const {join} = require('path')
const {readFileSync, writeFileSync, existsSync, unlinkSync} = require('fs')
const {randomBytes} = require('crypto')

class TempFile {
  constructor ({
    directory = require('process').cwd(),
    prefix = 'temp-',
    suffix = '.tmp'
  } = {}) {
    const middle = randomBytes(16).toString('hex')
    const basename = prefix + middle + suffix
    const filename = join(directory, basename)
    return existsSync(filename)
      ? new TempFile({directory, prefix, suffix})
      : {directory, basename, filename, prefix, middle, suffix, __proto__: this}
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
