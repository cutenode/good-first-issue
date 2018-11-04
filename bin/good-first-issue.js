#!/usr/bin/env node

var cli = require('commander')
var inquirer = require('inquirer')

var search = require("../lib/search")
var log = require("../lib/log")

cli
  .version('0.0.1', '-v, --version')
  .usage('[options]')
  .description('CLI tool to find good first issues.')
  .option('-n, --node', 'Good First Issues for Node.js.')
  .parse(process.argv)

if(cli.node) {
  var q = 'org:nodejs is:issue is:open label:"good first issue"'
  search(q, (error, issues) => {
    if(error) throw error
    project = "Node.js"

    log(issues, project, function(error, output) {
      console.log(output)
    })
  })
}