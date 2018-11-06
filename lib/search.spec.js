let issues;
let search;

beforeEach(() => {
  jest.resetModules();
  jest.restoreAllMocks();
  jest.resetAllMocks();
  issues = jest.fn();
  jest.doMock('@octokit/rest', () => () => {
    return {
      search: {
        issues
      }
    };
  });
  search = require('./search');
});

test('should return filtered issues', done => {
  const items = [
    {
      title: 'fooTitle',
      number: 123,
      labels: 'fooLabels',
      state: 'fooState',
      repository_url: 'fooRepoUrl',
      html_url: 'fooHtmlUrl',
      assignee: null,
      assignees: 'fooAssignees',
      locked: false
    },
    {
      title: 'barTitle',
      number: 123,
      labels: 'barLabels',
      state: 'barState',
      repository_url: 'barRepoUrl',
      html_url: 'barHtmlUrl',
      assignee: 'barAssignee',
      assignees: 'barAssignees',
      locked: false
    },
    {
      title: 'bazTitle',
      number: 123,
      labels: 'bazLabels',
      state: 'bazState',
      repository_url: 'bazRepoUrl',
      html_url: 'bazHtmlUrl',
      assignee: null,
      assignees: 'bazAssignees',
      locked: true
    }
  ];

  issues.mockImplementation((obj, callback) =>
    callback(null, {
      data: {
        items
      }
    })
  );

  function callback(error, result) {
    expect(result).toEqual([
      {
        title: 'fooTitle',
        pr: 123,
        labels: 'fooLabels',
        state: 'fooState',
        repo: 'fooRepoUrl',
        url: 'fooHtmlUrl',
        assignee: null,
        assignees: 'fooAssignees',
        locked: false
      }
    ]);
    done();
  }
  search({}, callback);
});

test('should throw', () => {
  issues.mockImplementation((obj, callback) => callback(new Error()));
  expect(() => search()).toThrow();
});
