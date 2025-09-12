describe('Task Manager - Enhanced Features', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should add task with priority and due date', () => {
    const taskTitle = 'High Priority Task'
    
    // Fill in task details
    cy.getByDataCy('add-task-input').type(taskTitle)
    cy.getByDataCy('add-task-priority').click()
    cy.contains('High Priority').click({ force: true })
    
    // Add the task
    cy.getByDataCy('add-task-btn').click()
    
    // Verify task appears with priority badge
    cy.getByDataCy('task-item').should('contain', taskTitle)
    cy.getByDataCy('task-item').should('contain', 'High')
  })

  it('should search tasks', () => {
    // Add multiple tasks
    cy.addTask('Buy groceries')
    cy.addTask('Walk the dog')
    cy.addTask('Buy coffee')
    
    // Search for "buy"
    cy.getByDataCy('search-input').type('buy')
    
    // Should show only matching tasks
    cy.getByDataCy('task-item').should('have.length', 2)
    cy.getByDataCy('task-item').should('contain', 'Buy groceries')
    cy.getByDataCy('task-item').should('contain', 'Buy coffee')
    cy.getByDataCy('task-item').should('not.contain', 'Walk the dog')
  })

  it('should edit task inline', () => {
    const originalTitle = 'Original Task'
    const editedTitle = 'Edited Task'
    
    cy.addTask(originalTitle)
    
    // Click edit button
    cy.getByDataCy('edit-task-btn').click()
    
    // Edit the task
    cy.getByDataCy('edit-task-input').clear().type(editedTitle)
    cy.getByDataCy('save-task-btn').click()
    
    // Verify task is updated
    cy.getByDataCy('task-item').should('contain', editedTitle)
    cy.getByDataCy('task-item').should('not.contain', originalTitle)
  })

  it('should toggle dark mode', () => {
    // Check initial state (light mode)
    cy.get('html').should('not.have.class', 'dark')
    
    // Toggle to dark mode
    cy.getByDataCy('dark-mode-toggle').click()
    cy.get('html').should('have.class', 'dark')
    
    // Toggle back to light mode
    cy.getByDataCy('dark-mode-toggle').click()
    cy.get('html').should('not.have.class', 'dark')
  })

  it('should show progress bar', () => {
    // Add tasks
    cy.addTask('Task 1')
    cy.addTask('Task 2')
    cy.addTask('Task 3')
    
    // Progress bar should show 0%
    cy.getByDataCy('progress-bar').should('be.visible')
    
    // Complete one task
    cy.getByDataCy('task-item').first().find('[data-cy=complete-checkbox]').click()
    
    // Progress should update (approximately 33%)
    cy.contains('1/3 tasks completed')
  })

  
})