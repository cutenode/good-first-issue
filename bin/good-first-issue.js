#!/usr/bin/env node

var cli = require('commander')
var pJson = require('../package.json')

cli
  .version(pJson.version, '-v, --version')
  .usage('[options]')
  .description('CLI tool to find good first issues.')
  .command('node', 'Good First Issues for Node.js')
  .command('electron', 'Good First Issues for Electron')
  .command('vscode', 'Good First Issues for VS Code')
  .command('gutenberg', 'Good First Issues for Gutenberg by WordPress')
  .parse(process.argv)
