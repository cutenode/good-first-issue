<h3 align="center">Good First Issue</h3>


<p align="center">
  A CLI for finding issues labeled with <kbd>Good First Issue</kbd> to help lower the barrier to contributing to open source projects.
  <br>
  <a href="#usage">Usage</a> •
  <a href="#projects">Projects</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/bnb/good-first-issue.svg"></a>
  <a href="https://travis-ci.org/bnb/good-first-issue/branches"><img src="https://img.shields.io/travis/bnb/good-first-issue.svg"></a>
</p>

</p>

## Prerequisites

To use <kbd>Good First Issue</kbd>, you'll need to have a few things installed:

- Node.js 8.0.0 or above
  - If you need to install Node.js, you can download it from the [official downloads page](https://nodejs.org/en/download/)
- npm 5.0.0 or above
  - If you already have Node.js 8.0.0 or above, you will have npm 5.0.0 or above.
  - If you need to update your npm CLI, run `npm i -g npm`

## Usage

### As CLI

Via npx:

```shell
npx good-first-issue <project>
```

> If project is omitted (e.g. `npx good-first-issue`), a project selector will be presented, allowing you to select from the list of available projects.

As a global module:

```shell
npm i -g good-first-issue
good-first-issue <project>
```

#### Options

- `-o, --open` - open in browser
- `-f, --first` - Return first/top issue

### As Module

```js
const goodFirstIssue = require('good-first-issue')

let log = async () => {
  let issues = await goodFirstIssue('node')
  issues.forEach(function (issue) {
    console.log('#' + issue.pr + ': ' + issue.title)
  })
}

log()
```

#### Examples
<kbd>Good First Issue</kbd> has an [examples/](./examples) directory, in which we try to maintain various examples of how <kbd>Good First Issue</kbd> can be used as a module. If you'd like to contribute to the examples, please don't hesitate to submit a PR! 🤗

## TODOs: What's coming up next

`good-first-issue` is still in an early state. I wanted to get `good-first-issue node` out the door, but have some other things I'm planning on implementing. Here's a list:

- [x] `good-first-issue node` command
- [x] Interactive selector when `good-first-issue` is run without a sub command
- [ ] Export <kbd>Good First Issue</kbd>s for all repos that have a command
- [ ] Add tests

If you'd like to help with any of these, feel free to submit a PR or ask how you can help 🤗

## Projects

The table of projects which are _currently_ supported.

<!--
  Content below is automatically updated with `npm run markdown`
  Please do not manually update these contents
-->
<!-- AUTO-GENERATED-CONTENT:START (PROJECTS:path=./data/projects.json) -->
| Name | Project `<project>` |
| --- | --- |
|Node.js|`node`|
|Electron|`electron`|
|VS Code|`vscode`|
|Gutenberg|`gutenberg`|
|wolkenkit|`wolkenkit`|
|TypeScript|`typescript`|
|Strapi|`strapi`|
|Create React App|`create-react-app`|
|debugger.html|`debugger.html`|
|webpack CLI|`webpack-cli`|
|Jest|`jest`|
|BigTestjs.io|`bigtestjs.io`|
|I'm Feeling Lucky (Random Project)|`feeling-lucky`|
|Netlify|`netlify`|
|Gatsby|`gatsby`|
|EasyGraphQL|`easygraphql`|
|Apollo|`apollo`|
|React|`react`|
|React Native|`react-native`|
|Babel|`babel`|
|Mocha|`mocha`|
|P1|`p1`|
<!-- AUTO-GENERATED-CONTENT:END -->

## Adding New Projects

If you'd like to add a new project to `good-first-issue`, you're more than welcome to submit a PR! There are a few components you'll need to submit:

- Update `data/projects.json`
  - Add your `<project>` as a property of `projects` with an object that includes a `name`, `description`, and a `q` (representing the GitHub search query).

- Update `README.md` by running `npm run markdown`
  - This will automatically update README.md with the new project

### Adding New Projects: More Information

You can pull your queries directly from a standard GitHub search! If you want to build something a bit more complex, you can use the advanced search tool if you want to build more specific custom queries: [https://github.com/search/advanced](https://github.com/search/advanced)

As a CLI, `good-first-issue` uses the Commander.js CLI framework. If you want to better understand how our CLI is built, commander.js is pretty [well documented](https://github.com/tj/commander.js/). Also used are Chalk for terminal coloring and [boxen](https://github.com/sindresorhus/boxen) to simplify the output container implementation.

## Contributing

If you are interested in fixing issues and contributing directly to the code base, please see the document [CONTRIBUTING.md](./CONTRIBUTING.md)
