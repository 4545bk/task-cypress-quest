describe('Task Manager - Interactions', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should mark a task as complete and apply correct styling', () => {
    const taskTitle = 'Task to Complete'
    
    // Add a task
    cy.addTask(taskTitle)
    
    // Verify task is not completed initially
    cy.getByDataCy('task-item').should('not.have.class', 'task-completed')
    cy.getByDataCy('complete-checkbox').should('not.be.checked')
    
    // Mark task as complete
    cy.getByDataCy('complete-checkbox').click()
    
    // Verify task is marked as completed
    cy.getByDataCy('complete-checkbox').should('be.checked')
    cy.getByDataCy('task-item').find('span').should('have.class', 'task-completed')
    
    // Verify filter counts updated
    cy.getByDataCy('filter-completed').should('contain', '1')
    cy.getByDataCy('filter-active').should('contain', '0')
  })

  it('should toggle task completion status', () => {
    cy.addTask('Toggle Task')
    
    // Complete the task
    cy.getByDataCy('complete-checkbox').click()
    cy.getByDataCy('complete-checkbox').should('be.checked')
    cy.getByDataCy('filter-completed').should('contain', '1')
    
    // Uncomplete the task
    cy.getByDataCy('complete-checkbox').click()
    cy.getByDataCy('complete-checkbox').should('not.be.checked')
    cy.getByDataCy('filter-active').should('contain', '1')
    cy.getByDataCy('filter-completed').should('contain', '0')
  })

  it('should delete a task', () => {
    const taskTitle = 'Task to Delete'
    
    // Add a task
    cy.addTask(taskTitle)
    cy.getByDataCy('task-item').should('have.length', 1)
    
    // Delete the task
    cy.getByDataCy('delete-btn').click()
    
    // Verify task is removed
    cy.getByDataCy('task-list').should('not.exist')
    cy.contains('No tasks yet').should('be.visible')
    
    // Verify counts are updated
    cy.getByDataCy('filter-all').should('contain', '0')
  })

  it('should handle multiple tasks correctly', () => {
    const tasks = ['Task 1', 'Task 2', 'Task 3']
    
    // Add multiple tasks
    tasks.forEach(task => cy.addTask(task))
    
    // Verify all tasks are displayed
    cy.getByDataCy('task-item').should('have.length', 3)
    cy.getByDataCy('filter-all').should('contain', '3')
    cy.getByDataCy('filter-active').should('contain', '3')
    
    // Complete the first task
    cy.getByDataCy('task-item').first().find('[data-cy=complete-checkbox]').click()
    
    // Verify counts
    cy.getByDataCy('filter-all').should('contain', '3')
    cy.getByDataCy('filter-active').should('contain', '2')
    cy.getByDataCy('filter-completed').should('contain', '1')
    
    // Delete the second task
    cy.getByDataCy('task-item').eq(1).find('[data-cy=delete-btn]').click()
    
    // Verify final state
    cy.getByDataCy('task-item').should('have.length', 2)
    cy.getByDataCy('filter-all').should('contain', '2')
  })
})