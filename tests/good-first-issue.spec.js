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

  it('prints an object with the correct shape', async () => {
    const { spawn, cleanup } = await prepareEnvironment();
    const { waitForText, waitForFinish, getExitCode, getStdout, pressKey } = await spawn('node', './bin/good-first-issue.js');

    await waitForText('Choose a project:');
    await pressKey('enter');
    await waitForFinish();

    expect(getExitCode()).toBe(0);
    expect(getStdout()).toMatchSnapshot();

    await cleanup();
  })
});
