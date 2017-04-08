#! /usr/bin/env node
'use strict'

const {join} = require('path')
const {readFileSync} = require('fs')
const process = require('process')
const getStdIn = require('get-stdin')
const TempFile = require('./lib/temp-file.js')
const {stringify} = JSON
const {exit, argv} = process
const {info, error} = global.console

const success = message => {
  info(message)
  exit(0)
}

const failure = (message, code = 1) => {
  error(message)
  exit(code)
}

const main = filename =>
  stringify(require(String(filename)), undefined, 2)

const filename = argv[3]
if (filename) success(main(filename))

getStdIn()
  .then(
    value => {
      const string = String(value)
      if (!string) return failure(readFileSync(join(__dirname, 'help.txt')), 0)
      const tmp = new TempFile({directory: __dirname})
      tmp.write(string)
      const result = main(tmp)
      tmp.unlink()
      return success(result)
    }
  )
  .catch(failure)
