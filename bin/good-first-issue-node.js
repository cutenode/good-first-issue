#!/usr/bin/env node

var cli = require('commander')

var search = require("../lib/search")
var log = require("../lib/log")

cli
  .parse(process.argv)

var q = 'org:nodejs is:issue is:open label:"good first issue"'
search(q, (error, issues) => {
  if(error) throw error
  project = "Node.js"

  log(issues, project, function(error, output) {
    console.log(output)
  })
})
