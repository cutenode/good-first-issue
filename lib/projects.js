/**
 * # Schema for adding projects
 * project:
 *   name: <project name>
 *   q: <GitHub search query>
 */

var projects = {
  node: {
    name: 'Node.js',
    q: 'org:nodejs is:issue is:open label:"good first issue"'
  }
}

module.exports = projects