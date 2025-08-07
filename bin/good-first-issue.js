#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const open = require('open');
const gfi = require('libgfi');

const packageJSON = require('../package.json');
const log = require('../lib/log');
const prompt = require('../lib/prompt');
const projects = require('../data/projects.json');

const cli = new Command();

cli
  .name('good-first-issue')
  .version(packageJSON.version, '-v, --version')
  .description(packageJSON.description)
  .arguments('[project]')
  .option('-o, --open', 'Open the issue in a browser')
  .option('-f, --first', 'Show the first/top issue')
  .option('-a, --auth <token>', 'GitHub token for authenticated requests')
  .action(async (project, options) => {
    try {
      const input = project || await prompt();

      const gfiOptions = {
        projects,
        ...(options.auth && { auth: options.auth })
      };

      const issues = await gfi(input, gfiOptions);

      if (!issues.length) {
        console.log(chalk.yellow(`\nNo Good First Issues found for "${chalk.white(input)}".\n`));
        process.exitCode = 0;
        return;
      }

      const selectedIssue = options.first ? issues[0] : issues[Math.floor(Math.random() * issues.length)];
      const projectName = projects[input]?.name || input;
      const output = await log(selectedIssue, projectName);

      console.log(output.toString());

      if (options.open) {
        await open(selectedIssue.url);
      }

      process.exitCode = 0;
    } catch (error) {
      console.error(chalk.red('Error:'), error.message || error);
      process.exitCode = 1;
    }
  });

cli.parse(process.argv);
