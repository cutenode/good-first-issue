const prompt = require('../lib/prompt')
const projects = require('../data/projects.json')

// Mock inquirer to avoid interactive prompts during testing
jest.mock('inquirer')
const inquirer = require('inquirer')

describe('prompt function', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  test('should be a function', () => {
    expect(typeof prompt).toBe('function')
  })

  test('should return a promise', () => {
    inquirer.prompt.mockResolvedValue({ project: 'node' })
    const result = prompt()
    expect(result).toBeInstanceOf(Promise)
  })

  test('should call inquirer.prompt with correct structure', async () => {
    inquirer.prompt.mockResolvedValue({ project: 'node' })
    
    await prompt()
    
    expect(inquirer.prompt).toHaveBeenCalledTimes(1)
    expect(inquirer.prompt).toHaveBeenCalledWith([
      expect.objectContaining({
        type: 'list',
        name: 'project',
        message: expect.any(String),
        choices: expect.any(Array)
      })
    ])
  })

  test('should return selected project key', async () => {
    const selectedProject = 'react'
    inquirer.prompt.mockResolvedValue({ project: selectedProject })
    
    const result = await prompt()
    
    expect(result).toBe(selectedProject)
  })

  test('should provide choices from projects.json', async () => {
    inquirer.prompt.mockResolvedValue({ project: 'node' })
    
    await prompt()
    
    const callArgs = inquirer.prompt.mock.calls[0][0]
    const choices = callArgs[0].choices
    
    expect(Array.isArray(choices)).toBe(true)
    expect(choices.length).toBeGreaterThan(0)
    
    // Check that choices have correct structure
    choices.forEach(choice => {
      expect(choice).toHaveProperty('value')
      expect(choice).toHaveProperty('name')
    })
  })

  test('should include all projects from projects.json in choices', async () => {
    inquirer.prompt.mockResolvedValue({ project: 'node' })
    
    await prompt()
    
    const callArgs = inquirer.prompt.mock.calls[0][0]
    const choices = callArgs[0].choices
    const choiceValues = choices.map(c => c.value)
    
    // Check that some known projects are included
    expect(choiceValues).toContain('node')
    expect(choiceValues).toContain('react')
    expect(choiceValues).toContain('jest')
  })

  test('should format choice names with project name and description', async () => {
    inquirer.prompt.mockResolvedValue({ project: 'node' })
    
    await prompt()
    
    const callArgs = inquirer.prompt.mock.calls[0][0]
    const choices = callArgs[0].choices
    
    // Find a project with description
    const nodeChoice = choices.find(c => c.value === 'node')
    expect(nodeChoice).toBeDefined()
    expect(nodeChoice.name).toContain(projects.node.name)
    
    if (projects.node.description) {
      expect(nodeChoice.name).toContain(projects.node.description)
    }
  })

  test('should sort choices by project key alphabetically', async () => {
    inquirer.prompt.mockResolvedValue({ project: 'node' })
    
    await prompt()
    
    const callArgs = inquirer.prompt.mock.calls[0][0]
    const choices = callArgs[0].choices
    const choiceValues = choices.map(c => c.value)
    
    // Check if project keys (values) are sorted alphabetically
    const sortedValues = [...choiceValues].sort()
    
    expect(choiceValues).toEqual(sortedValues)
  })

  test('should handle projects without descriptions', async () => {
    inquirer.prompt.mockResolvedValue({ project: 'node' })
    
    await prompt()
    
    const callArgs = inquirer.prompt.mock.calls[0][0]
    const choices = callArgs[0].choices
    
    // All choices should have valid names
    choices.forEach(choice => {
      expect(choice.name).toBeTruthy()
      expect(typeof choice.name).toBe('string')
      expect(choice.name.length).toBeGreaterThan(0)
    })
  })

  test('should use "Choose a project:" as message', async () => {
    inquirer.prompt.mockResolvedValue({ project: 'node' })
    
    await prompt()
    
    const callArgs = inquirer.prompt.mock.calls[0][0]
    expect(callArgs[0].message).toBe('Choose a project:')
  })

  test('should handle different project selections', async () => {
    const testProjects = ['node', 'react', 'jest', 'typescript']
    
    for (const project of testProjects) {
      inquirer.prompt.mockResolvedValue({ project })
      const result = await prompt()
      expect(result).toBe(project)
    }
  })
})
