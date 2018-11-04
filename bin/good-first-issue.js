#!/usr/bin/env node

var cli = require('commander')
var inquirer = require('inquirer')


cli
  .version('0.0.1', '-v, --version')
  .usage('[options]')
  .description('CLI tool to find good first issues.')
  .command('node', 'Good First Issues for Node.js')
  .parse(process.argv)