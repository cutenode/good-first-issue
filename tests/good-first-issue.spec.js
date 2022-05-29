const { prepareEnvironment } = require("@gmrchk/cli-testing-library");

describe('CLI', () => {
  it('should run', async () => {
    const { spawn, cleanup } = await prepareEnvironment();
    const { waitForText, waitForFinish, getExitCode, pressKey } = await spawn('node', './bin/good-first-issue.js');

    await waitForText('Choose a project:');
    await pressKey('enter');
    await waitForFinish();

    expect(getExitCode()).toBe(0);

    await cleanup();
  });

  it('should run with -o', async () => {
    const { spawn, cleanup } = await prepareEnvironment();
    const { waitForText, waitForFinish, getExitCode, pressKey } = await spawn('node', './bin/good-first-issue.js -o');

    await waitForText('Choose a project:');
    await pressKey('enter');
    await waitForFinish();

    expect(getExitCode()).toBe(0);

    await cleanup();
  })

  it('returns an object with the correct shape', async () => {
    const { spawn, cleanup } = await prepareEnvironment();
    const { waitForText, waitForFinish, getExitCode, getStdout, pressKey, debug } = await spawn('node', './bin/good-first-issue.js');

    await waitForText('Choose a project:');
    await pressKey('enter');
    await waitForFinish();

    const expectedOutput = `
╭──────────────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                      │
│   Good First Issue in Apollo:                                                                        │
│                                                                                                      │
│     - Title: Creating workbench files with '#' (and possibly other characters) will cause an error   │
│     - Repository: apollographql/apollo-workbench-vscode                                              │
│     - Issue: #104                                                                                    │
│     - Status: open                                                                                   │
│     - Assigned to: unassigned!                                                                       │
│                                                                                                      │
│   Start now: https://github.com/apollographql/apollo-workbench-vscode/issues/104                     │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯
`

    expect(getExitCode()).toBe(0);

    for (let i = getStdout().length - 1; i <= getStdout().length - 13; i--) {
      expect(getStdout()[i]).toBe(expectedOutput[i]);
    }

    await cleanup();
  })
});
