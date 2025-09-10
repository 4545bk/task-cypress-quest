// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to get elements by data-cy attribute
Cypress.Commands.add('getByDataCy', (selector: string) => {
  return cy.get(`[data-cy=${selector}]`)
})

// Custom command to clear localStorage
Cypress.Commands.add('clearLocalStorage', () => {
  cy.window().then((win) => {
    win.localStorage.clear()
  })
})

// Custom command to add a task
Cypress.Commands.add('addTask', (taskTitle: string) => {
  cy.getByDataCy('add-task-input').type(taskTitle)
  cy.getByDataCy('add-task-btn').click()
})
