<h3 align="center">Good First Issue</h3>


<p align="center">
  A CLI for finding issues labeled with <kbd>Good First Issue</kbd> to help lower the barrier to contributing to open source projects.
  <br>
  <a href="#usage">Usage</a> •
  <a href="#projects">Projects</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/good-first-issue"><img src="https://img.shields.io/npm/v/good-first-issue/latest.svg"></a>
  <a href="https://www.npmjs.com/package/good-first-issue"><img src="https://img.shields.io/npm/dm/good-first-issue/latest.svg"></a>
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
| S. No. | Name | Project `<project>` |
| --- | --- | --- |
|1.|Node.js|`node`|
|2.|Electron|`electron`|
|3.|VS Code|`vscode`|
|4.|Gutenberg|`gutenberg`|
|5.|wolkenkit|`wolkenkit`|
|6.|TypeScript|`typescript`|
|7.|Strapi|`strapi`|
|8.|Create React App|`create-react-app`|
|9.|debugger.html|`debugger.html`|
|10.|webpack CLI|`webpack-cli`|
|11.|Jest|`jest`|
|12.|BigTestjs.io|`bigtestjs.io`|
|13.|I'm Feeling Lucky (Random Project)|`feeling-lucky`|
|14.|Netlify|`netlify`|
|15.|Gatsby|`gatsby`|
|16.|EasyGraphQL|`easygraphql`|
|17.|Apollo|`apollo`|
|18.|React|`react`|
|19.|React Native|`react-native`|
|20.|Babel|`babel`|
|21.|Mocha|`mocha`|
|22.|Docz|`docz`|
|23.|React Navigation|`react-navigation`|
|24.|Styled Components|`styled-components`|
|25.|Storybook|`storybook`|
|26.|Neos|`neos`|
|27.|Vue.js|`vuejs`|
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

## Release Process

Good First Issue follows a relatively strict release process intended to ensure the spice flows.

### Versioning

| Semantic Version | Type | Reason |
|-------------------|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| Major (**x**.x.x) | Breaking changes and non-trivial upgrades | Ensuring that end-users can rely on Good First Issue not breaking however they're consuming it |
| Minor (x.**x**.x) | Project additions, other feature additions | Following the SemVer standard, project additions and feature additions are backwards-compatible enhancements. We generally try to ship one addition per Minor. |
| Patch (x.x.**x**) | Bug fixes, minor enhancements to metadata and content | Tiny, hardly visible fixes to improve UX/DX or fix the module |

## Labels and Milestones
We use both GitHub Labels and Milestones to track releases. Since project additions count as a minor release, we prefer to space those out and ship them individually rather than shipping many at once. This pace may be revised later, but for now, it introduces the need for a release queue and setting things up to be released ahead of them actually being released.

We use the release queue [label](https://github.com/bnb/good-first-issue/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc) and [milestone](https://github.com/bnb/good-first-issue/milestone/16) to queue up PRs that have been reviewed and are ready to be released.

Once a PR is ready to be released, a milestone will be added that correlates to the SemVer version it will be released in. Ideally this will _eventually_ be used for changelog tracking but for now it's just a good way to keep organized. To keep things tidy, once a new version has shipped the milestone will be closed out.

### Local testing
Prior to each release, whoever is releasing should be testing the release locally to ensure that the code is working as expected. This would include either running `npm i -g` or `npm link` in the PR branch and then testing whatever the PR is adding. Ensuring the experience isn't broken is vital.

It is worth noting that we limit the file we publish to npm with the `files` property in [`package.json`](https://github.com/bnb/good-first-issue/blob/master/package.json). This property prevents code that's not explicitly listed from being shipped. We have had a situation where local testing and the published module differed because a PR was merged that added needed code in a directory that wasn't included. So, what works on your machine may not work for the end user.

To test locally, using the modules tests with `npm test` and trying out a few different commands (like the selector, a specific project, a failed project, and so on) is reccomended. For example:

```
npm i -g # This assumes your current working directory is the module's directory
good-first-issue
good-first-issue <the PR's newly added project>
good-first-issue react
good-first-issue node
good-first-issue thisisntarealproject
```

## Contributing

If you are interested in fixing issues and contributing directly to the code base, please see the document [CONTRIBUTING.md](./CONTRIBUTING.md)
