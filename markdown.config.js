const path = require('path')

const TABLE_HEADER = `
| Name | Project \`<project>\` |
| --- | --- |
`.trim()

module.exports = {
  transforms: {
    PROJECTS (content, options) {
      const { path: filePath } = options
      const projects = require(path.resolve(filePath))
      const list = Object.keys(projects)
        .map((name, index) => {
          const project = projects[name]
          return [
            '',
            project.name,
            `\`${name}\``,
            ''
          ].join('|')
        })

      return [
        TABLE_HEADER,
        list.join('\n')
      ].join('\n')
    }
  }
}
