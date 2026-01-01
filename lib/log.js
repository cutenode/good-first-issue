const chalk = require('chalk')
const boxen = require('boxen')

const boxenOptions = {
  padding: 1,
  borderColor: 'green',
  borderStyle: 'round'
}
async function log (issue, project) {
  const data = {
    leftpad: '   ',
    doublepad: '    ',
    header: 'Good First Issue in ' + chalk.yellow(project) + ': ',
    title: chalk.green(issue.title),
    issue: chalk.cyan('#' + issue.pr),
    state: chalk.green(issue.state),
    unassigned: chalk.green('unassigned!'), // All assigned issues are being filtered out at the search level, so all issues will always be unassigned
    link: chalk.cyan(issue.url),
    context: chalk.dim('This issue was selected randomly (Feeling Lucky).'),
    repo: chalk.green(new URL(issue.url).pathname.split('/').slice(1, 3).join('/')),
    labels: issue.labels
  }

  const output = '\n' + boxen(  data.header +  '\n' + data.context +'\n\n' + '  - Title: ' + data.title + '\n' + '  - Repository: ' + data.repo + '\n' + '  - Issue: ' + data.issue + '\n' + '  - Status: ' + data.state + '\n' + '  - Assigned to: ' + data.unassigned + '\n\n' + 'Start now: ' + data.link, boxenOptions) + '\n'

  return output
}

module.exports = log
