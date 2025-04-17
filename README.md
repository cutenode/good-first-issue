# Good First Issue

A CLI tool that helps developers find GitHub issues labeled with `Good First Issue`, making it easier to contribute to open source.

[![npm](https://img.shields.io/npm/v/good-first-issue/latest.svg)](https://www.npmjs.com/package/good-first-issue)
[![Greenkeeper badge](https://badges.greenkeeper.io/cutenode/good-first-issue.svg)](https://greenkeeper.io/)

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Usage](#usage)
  - [Installation](#installation)
  - [Commands](#commands)
  - [CLI Options](#cli-options)
- [What's Coming Next](#whats-coming-next)
- [Supported Projects](#supported-projects)
- [Add Your Project](#add-your-project)
- [Release Process](#release-process)
- [Local Testing](#local-testing)
- [Contributing](#contributing)

---

## ✅ Prerequisites

- **Node.js** v8.0.0 or later  
  [Download Node.js](https://nodejs.org/en/download/) or use a version manager like [nvm](https://gist.github.com/d2s/372b5943bce17b964a79).

- **npm** v5.0.0 or later  
  Node includes npm, but you can update it via:

  ```bash
  npm install -g npm
  ```

---

## 🚀 Usage

This tool is an interactive CLI. If you need a library instead, check out [`libgfi`](https://www.npmjs.com/package/libgfi).

### 📦 Installation

**One-time use with `npx`:**

```bash
npx good-first-issue [project]
```

**Install globally:**

```bash
npm install -g good-first-issue
good-first-issue
```

---

### 💻 Commands

- `good-first-issue`  
  Launches the interactive project selector.

- `good-first-issue [project]`  
  Fetches issues from a specific supported project.

- `good-first-issue [org]` or `[org/repo]`  
  Searches all repos in an organization or a specific repo for `good first issue` labels.

---

### ⚙️ CLI Options

- `-o, --open` → Open issue(s) in the browser  
- `-f, --first` → Return the top issue  
- `-a, --auth <token>` → Use a GitHub token to avoid rate limits

---

## 🔮 What's Coming Next

Planned enhancements:

- [x] Basic project lookup (e.g., `good-first-issue node`)
- [x] Interactive project selector
- [ ] Additional useful commands
- [ ] Paginated GitHub results with manual issue selection
- [ ] Smarter random issue selection (`Feeling Lucky`)
- [ ] More tests and test coverage

Want to help? Submit a PR or ask how you can get involved! 🤝

---

## 📚 Supported Projects

Here’s a curated list of open source projects we currently support:

<!-- AUTO-GENERATED-CONTENT:START (PROJECTS:path=./data/projects.json) -->
<!-- DO NOT EDIT MANUALLY -->
<!-- Content auto-generated -->
<!-- AUTO-GENERATED-CONTENT:END -->

---

## ➕ Add Your Project

Want your project included? Open a PR with the following:

1. Update `data/projects.json` (in alphabetical order).
2. Run:

```bash
npm run markdown
```

This will regenerate the updated project list in `README.md`.

Need help building queries? Use [GitHub advanced search](https://github.com/search/advanced) for inspiration.

---

## 📦 Release Process

We follow Semantic Versioning:

| Version | Purpose |
|--------|---------|
| Major (`x.0.0`) | Breaking changes |
| Minor (`0.x.0`) | New features, project additions |
| Patch (`0.0.x`) | Bug fixes, metadata updates |

Releases are tracked via [labels](https://github.com/bnb/good-first-issue/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc) and [milestones](https://github.com/bnb/good-first-issue/milestone/16).

---

## 🧪 Local Testing

Before pushing a release:

```bash
npm install -g
good-first-issue
```

Test:

```bash
good-first-issue react
good-first-issue node
good-first-issue github
good-first-issue github/semantic
```

✅ Ensure any added files are included via the `files` key in `package.json`.

---

## 🤝 Contributing

We welcome all contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

