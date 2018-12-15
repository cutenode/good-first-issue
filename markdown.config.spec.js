const fs = require('fs')
const README_PATH = "./README.md"
const DATA_FILE_PATH = "./data/projects.json"

test('should match README with data/project.json', () => {
    const projectsFromReadme = getProjectsFromReadme()
    const projectsFromDatafile = getProjectsFromDatafile()

    expect(projectsFromReadme).toEqual(projectsFromDatafile)
})

// below function is influenced by all-contributers-cli, Thanks to @jfmengels and @kentcdodds
// https://github.com/jfmengels/all-contributors-cli/blob/master/src/generate/index.js
function getProjectsFromReadme() {

    const fileContent = fs.readFileSync(README_PATH, "UTF-8")

    const tagToLookFor = '<!-- AUTO-GENERATED-CONTENT:'
    const closingTag = '-->'
    const startOfOpeningTagIndex = fileContent.indexOf(
        `${tagToLookFor}START`,
    )
    const endOfOpeningTagIndex = fileContent.indexOf(
        closingTag,
        startOfOpeningTagIndex,
    )
    const startOfClosingTagIndex = fileContent.indexOf(
        `${tagToLookFor}END`,
        endOfOpeningTagIndex,
    )

    const table = fileContent.slice(endOfOpeningTagIndex + closingTag.length,
        startOfClosingTagIndex)

    const regex = /\|(.*)\|`(.*)`\|/gm;
    var match = regex.exec(table)

    var projects = {};
    while (match != null) {
        let project = match[2]
        let name = match[1]
        projects[project] = { "name": name }

        match = regex.exec(table)
    }

    return projects
}

function getProjectsFromDatafile() {

    let projects = require(DATA_FILE_PATH)
    for (project in projects) {
        delete projects[project]["q"]
    }

    return projects
}
