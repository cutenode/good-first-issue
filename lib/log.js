var chalk = require('chalk')

function log (issues, project, cb) {
  var set = []
  for (var issue in issues) {
    var strings = {
      leftpad: "  ",
      title: "Good First Issue in " + chalk.yellow(project) + ": " + chalk.green(issues[issue].title),
      metadata: "This good-first-issue is " + chalk.cyan("PR #" + issues[issue].pr) + ", and is currently " + chalk.green(issues[issue].state) + " and " + chalk.green("unassigned!"),
      link: "Get started: " + chalk.cyan(issues[issue].url)
    }
    var output = "\n" + strings.leftpad + strings.title + "\n" + strings.leftpad + strings.metadata + "\n\n" +strings.leftpad + strings.link + "\n"
    set.push(output)
  } 
  cb(null, set)
}

module.exports = log