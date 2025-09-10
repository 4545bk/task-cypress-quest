describe('Task Manager - Filters', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
    
    // Set up test data: 3 tasks, 1 completed
    cy.addTask('Active Task 1')
    cy.addTask('Active Task 2')
    cy.addTask('Completed Task')
    
    // Mark the last task as completed
    cy.getByDataCy('task-item').last().find('[data-cy=complete-checkbox]').click()
  })

  it('should show all tasks by default', () => {
    // Verify all filter is selected by default
    cy.getByDataCy('filter-all').should('have.class', 'btn-primary')
    
    // Verify all tasks are visible
    cy.getByDataCy('task-item').should('have.length', 3)
    cy.getByDataCy('task-item').should('contain', 'Active Task 1')
    cy.getByDataCy('task-item').should('contain', 'Active Task 2')
    cy.getByDataCy('task-item').should('contain', 'Completed Task')
  })

  it('should filter active tasks only', () => {
    // Click active filter
    cy.getByDataCy('filter-active').click()
    
    // Verify active filter is selected
    cy.getByDataCy('filter-active').should('have.class', 'btn-primary')
    cy.getByDataCy('filter-all').should('not.have.class', 'btn-primary')
    
    // Verify only active tasks are visible
    cy.getByDataCy('task-item').should('have.length', 2)
    cy.getByDataCy('task-item').should('contain', 'Active Task 1')
    cy.getByDataCy('task-item').should('contain', 'Active Task 2')
    cy.getByDataCy('task-item').should('not.contain', 'Completed Task')
  })

  it('should filter completed tasks only', () => {
    // Click completed filter
    cy.getByDataCy('filter-completed').click()
    
    // Verify completed filter is selected
    cy.getByDataCy('filter-completed').should('have.class', 'btn-primary')
    cy.getByDataCy('filter-all').should('not.have.class', 'btn-primary')
    
    // Verify only completed tasks are visible
    cy.getByDataCy('task-item').should('have.length', 1)
    cy.getByDataCy('task-item').should('contain', 'Completed Task')
    cy.getByDataCy('task-item').should('not.contain', 'Active Task 1')
    cy.getByDataCy('task-item').should('not.contain', 'Active Task 2')
  })

  it('should switch between filters correctly', () => {
    // Start with all tasks
    cy.getByDataCy('task-item').should('have.length', 3)
    
    // Switch to active
    cy.getByDataCy('filter-active').click()
    cy.getByDataCy('task-item').should('have.length', 2)
    
    // Switch to completed
    cy.getByDataCy('filter-completed').click()
    cy.getByDataCy('task-item').should('have.length', 1)
    
    // Switch back to all
    cy.getByDataCy('filter-all').click()
    cy.getByDataCy('task-item').should('have.length', 3)
  })

  it('should update filter counts when tasks change', () => {
    // Initial counts
    cy.getByDataCy('filter-all').should('contain', '3')
    cy.getByDataCy('filter-active').should('contain', '2')
    cy.getByDataCy('filter-completed').should('contain', '1')
    
    // Complete another task
    cy.getByDataCy('task-item').first().find('[data-cy=complete-checkbox]').click()
    
    // Check updated counts
    cy.getByDataCy('filter-all').should('contain', '3')
    cy.getByDataCy('filter-active').should('contain', '1')
    cy.getByDataCy('filter-completed').should('contain', '2')
    
    // Delete a task
    cy.getByDataCy('task-item').first().find('[data-cy=delete-btn]').click()
    
    // Check final counts
    cy.getByDataCy('filter-all').should('contain', '2')
  })

  it('should handle empty filter states', () => {
    // Delete all active tasks
    cy.getByDataCy('filter-active').click()
    cy.getByDataCy('delete-btn').click({ multiple: true })
    
    // Switch to active filter and verify empty state
    cy.getByDataCy('filter-active').click()
    cy.contains('No tasks yet').should('be.visible')
    cy.getByDataCy('filter-active').should('contain', '0')
    
    // Verify completed tasks still exist
    cy.getByDataCy('filter-completed').click()
    cy.getByDataCy('task-item').should('have.length', 1)
  })
})