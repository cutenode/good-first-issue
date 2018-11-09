/**
 * # Schema for adding projects
 * project:
 *   name: '<project name>'
 *   q: '<GitHub search query>'
 */

var projects = {
  node: {
    name: 'Node.js',
    q: 'org:nodejs is:issue is:open label:"good first issue"'
  },
  electron: {
    name: 'Electron',
    q: 'org:electron is:issue is:open sort:updated-desc label:"good first issue"'
  },
  vscode: {
    name: 'VS Code',
    q: 'repo:microsoft/vscode state:open label:"good first issue"'
  },
  gutenberg: {
    name: 'gutenberg',
    q: ' repo:WordPress/gutenberg is:issue is:open sort:updated-desc label:"good first issue"'
  },
}

module.exports = projects
