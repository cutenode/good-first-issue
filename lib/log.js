const chalk = require('chalk')
const boxen = require('boxen')

const boxenOptions = {
  padding: 1,
  borderColor: 'green',
  borderStyle: 'round'
}
async function log (issues, project) {
  return issues.map(issue => {
    const data = {
      leftpad: '   ',
      doublepad: '    ',
      header: 'Good First Issue in ' + chalk.yellow(project) + ': ',
      title: chalk.green(issues[issue].title),
      issue: chalk.cyan('#' + issues[issue].pr),
      state: chalk.green(issues[issue].state),
      unassigned: chalk.green('unassigned!'), // All assigned issues are being filtered out at the search level, so all issues will always be unassigned
      link: chalk.cyan(issues[issue].url),
      repo: chalk.green(issues[issue].url.toString().slice(19, issues[issue].url.toString().indexOf('/issue'))),
      labels: issues[issue].labels
    }

    return '\n' + boxen(data.header + '\n\n' + '  - Title: ' + data.title + '\n' + '  - Repository: ' + data.repo + '\n' + '  - Issue: ' + data.issue + '\n' + '  - Status: ' + data.state + '\n' + '  - Assigned to: ' + data.unassigned + '\n\n' + 'Start now: ' + data.link, boxenOptions) + '\n'
  })
}

module.exports = log
