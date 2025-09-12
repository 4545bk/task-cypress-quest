// ***********************************************
// Custom Cypress commands
// For more info: https://on.cypress.io/custom-commands
// ***********************************************

// Command to get elements by data-cy attribute
Cypress.Commands.add('getByDataCy', (selector: string) => {
  return cy.get(`[data-cy=${selector}]`)
})

// Custom command to clear localStorage (use a unique name)
Cypress.Commands.add('clearMyLocalStorage', () => {
  cy.window().then((win) => {
    win.localStorage.clear()
  })
})

// Command to add a task
Cypress.Commands.add('addTask', (taskTitle: string) => {
  cy.getByDataCy('add-task-input').type(taskTitle)
  cy.getByDataCy('add-task-btn').click()
})
