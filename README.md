# Good First Issue

A CLI for finding issues labeled with "good-first-issue" to _hopefully_ lower the barrier to contributing to open source projects.

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

// project should be from the below projects table
goodFirstIssue(project, (err, issues) => {
  // typeof issues is Array
})
```

#### Examples
Good First Issues has an [examples/](./examples) directory, in which we try to maintain various examples of how Good First Issue can be used as a module. If you'd like to contribute to the examples, please don't hesitate to submit a PR! 🤗

## TODOs: What's coming up next

`good-first-issue` is still in an early state. I wanted to get `good-first-issue node` out the door, but have some other things I'm planning on implementing. Here's a list:

- [x] `good-first-issue node` command
- [x] Interactive selector when `good-first-issue` is run without a sub command
- [ ] Export good first issues for all repos that have a command
- [ ] Add tests

If you'd like to help with any of these, feel free to submit a PR or ask how you can help 🤗

## Projects

The table of projects which are _currently_ supported.

| S. No. | Name | Project `<project>` |
| --- | --- | --- |
| 1. | Node.js | `node` |
| 2. | Electron | `electron` |
| 3. | VS Code | `vscode` |
| 4. | Gutenberg | `gutenberg` |
| 5. | wolkenkit | `wolkenkit` |
| 6. | TypeScript | `typescript` |
| 7. | Strapi | `strapi` |
| 8. | Create React App | `create-react-app` |
| 9. | I'm Feeling Lucky (Random Project) | `feeling-lucky` |

## Adding New Projects

If you'd like to add a new project to `good-first-issue`, you're more than welcome to submit a PR! There are a few components you'll need to submit:

- Update `data/projects.json`
  - Add your `<project>` as a property of `projects` with an object that includes a `name`, `description`, and a `q` (representing the GitHub search query).

- Update `README.md`
  - Add your `<project>` at the bottom of the [Projects](#projects) table above with `name` and `project`

### Adding New Projects: More Information

You can pull your queries directly from a standard GitHub search! If you want to build something a bit more complex, you can use the advanced search tool if you want to build more specific custom queries: [https://github.com/search/advanced](https://github.com/search/advanced)

As a CLI, `good-first-issue` uses the Commander.js CLI framework. If you want to better understand how our CLI is built, commander.js is pretty [well documented](https://github.com/tj/commander.js/). Also used are Chalk for terminal coloring and [boxen](https://github.com/sindresorhus/boxen) to simplify the output container implementation.

### Contributing

If you are interested in fixing issues and contributing directly to the code base, please see the document [CONTRIBUTING.md](./CONTRIBUTING.md)