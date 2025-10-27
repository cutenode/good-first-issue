const path = require('path')

const TABLE_HEADER = `
| Order | Name | Project \`<project>\` | Description |
| --- | --- | --- | --- |
`.trim()

module.exports = {
  transforms: {
    PROJECTS (content, options) {
      const { path: filePath } = options
      const projects = require(path.resolve(filePath))
      const list = Object.keys(projects)
        .map((name, index) => {
          const project = projects[name]
          // check if the project and its description exist before adding it
          if (!project || project.description) return 
          const description = projects[name].description // short project description for README table 
          return [
            '',
            `${index + 1}.`,
            project.name,
            `\`${name}\``,
            `${description}`,
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
