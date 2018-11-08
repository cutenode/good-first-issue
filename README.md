# Good First Issue
A CLI for finding issues labeled with "good-first-issue" to _hopefully_ lower the barrier to contributing to open source projects.

## Usage
Via npx:
```
npx good-first-issue <project>
```

As a global module:
```
npm i -g good-first-issue
good-first-issue <project>
```

## TODOs: What's coming up next
`good-first-issue` is still in an early state. I wanted to get `good-first-issue node` out the door, but have some other things I'm planning on implementing. Here's a list:

- [x] `good-first-issue node` command
- [ ] Interactive selector when `good-first-issue` is run without a sub command
- [ ] Export good first issues for all repos that have a command
- [ ] Add tests

## Projects
The list of projects which are _currently_ supported.

### Node.js
The Node.js project spans over 100 repositories. Using `good-first-issue` to look for good first issues in Node.js will search through the entire [Node.js GitHub organization](https://github.com/nodejs/) including both technical and community repositories.

#### Usage
Via npx:
```
npx good-first-issue node
```

As a global module:
```
npm i -g good-first-issue
good-first-issue node
```

### Electron
Electron is one of the most vital pieces of desktop application infrastructure in the world, powering applications like Spotify, Slack,  Atom, VS Code, GitHub Desktop, WordPress.com, and hundreds of other applications. You can use `good-first-issue` to look for good first issues in the various Electron repositories in the [Electron GitHub organization](https://github.com/electron/).

#### Usage
Via npx:
```
npx good-first-issue electron
```

As a global module:
```
npm i -g good-first-issue
good-first-issue electron
```

## Adding New Projects
If you'd like to add a new project to `good-first-issue`, you're more than welcome to submit a PR! There are a few components you'll need to submit:

- Update `bin/good-first-issue.js`
  - You will need to update this file to include a `command()` for your project that will output a **single**, **random** issue with the label Good First Issue.
- Update `lib/projects.js`
  - Add your `<project>` as a property of `projects` with an object that includes a `name` and a `q` (representing the GitHub search query).
- Add `bin/good-first-issue-<project>.js`
  - This needs to be a JavaScript file that will execute when someone runs `good-first-issue <project>`. You can see a maintained example in [good-first-issue-node.js](bin/good-first-issue-node.js)

### Adding New Projects: More Information

You can pull your queries directly from a standard GitHub search! If you want to build something a bit more complex, you can use the advanced search tool if you want to build more specific custom queries: https://github.com/search/advanced

As a CLI, `good-first-issue` uses the Commander.js CLI framework. If you want to better understand how our CLI is built, commander.js is pretty [well documented](https://github.com/tj/commander.js/). Also used are Chalk for terminal coloring and [boxen](https://github.com/sindresorhus/boxen) to simplify the output container implementation.
