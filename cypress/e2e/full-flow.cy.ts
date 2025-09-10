describe('Task Manager - Full End-to-End Flow', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should complete a full task management workflow', () => {
    // Step 1: Verify initial empty state
    cy.contains('No tasks yet').should('be.visible')
    cy.getByDataCy('filter-all').should('contain', '0')
    
    // Step 2: Add multiple tasks
    const tasks = [
      'Plan project architecture',
      'Set up development environment',
      'Write unit tests',
      'Implement user interface',
      'Deploy to production'
    ]
    
    tasks.forEach(task => {
      cy.addTask(task)
    })
    
    // Verify all tasks are added
    cy.getByDataCy('task-item').should('have.length', 5)
    cy.getByDataCy('filter-all').should('contain', '5')
    cy.getByDataCy('filter-active').should('contain', '5')
    cy.getByDataCy('filter-completed').should('contain', '0')
    
    // Step 3: Complete some tasks
    cy.getByDataCy('task-item').eq(0).find('[data-cy=complete-checkbox]').click()
    cy.getByDataCy('task-item').eq(1).find('[data-cy=complete-checkbox]').click()
    cy.getByDataCy('task-item').eq(4).find('[data-cy=complete-checkbox]').click()
    
    // Verify task completion
    cy.getByDataCy('filter-all').should('contain', '5')
    cy.getByDataCy('filter-active').should('contain', '2')
    cy.getByDataCy('filter-completed').should('contain', '3')
    
    // Step 4: Test filtering functionality
    // Filter to show only completed tasks
    cy.getByDataCy('filter-completed').click()
    cy.getByDataCy('task-item').should('have.length', 3)
    
    // Verify completed tasks have correct styling
    cy.getByDataCy('task-item').each($item => {
      cy.wrap($item).find('span').should('have.class', 'task-completed')
      cy.wrap($item).find('[data-cy=complete-checkbox]').should('be.checked')
    })
    
    // Filter to show only active tasks
    cy.getByDataCy('filter-active').click()
    cy.getByDataCy('task-item').should('have.length', 2)
    cy.getByDataCy('task-item').should('contain', 'Write unit tests')
    cy.getByDataCy('task-item').should('contain', 'Implement user interface')
    
    // Step 5: Delete some tasks
    // Delete one active task
    cy.getByDataCy('task-item').first().find('[data-cy=delete-btn]').click()
    cy.getByDataCy('task-item').should('have.length', 1)
    
    // Switch to all tasks and verify total count
    cy.getByDataCy('filter-all').click()
    cy.getByDataCy('task-item').should('have.length', 4)
    cy.getByDataCy('filter-all').should('contain', '4')
    cy.getByDataCy('filter-active').should('contain', '1')
    cy.getByDataCy('filter-completed').should('contain', '3')
    
    // Step 6: Test task toggling
    // Uncomplete a completed task
    cy.getByDataCy('filter-completed').click()
    cy.getByDataCy('task-item').first().find('[data-cy=complete-checkbox]').click()
    
    // Verify it moved to active
    cy.getByDataCy('task-item').should('have.length', 2)
    cy.getByDataCy('filter-active').should('contain', '2')
    cy.getByDataCy('filter-completed').should('contain', '2')
    
    // Step 7: Add a new task while filtered
    cy.addTask('Final integration testing')
    
    // Verify task is added (should show in all view)
    cy.getByDataCy('filter-all').click()
    cy.getByDataCy('task-item').should('have.length', 5)
    cy.getByDataCy('task-item').should('contain', 'Final integration testing')
    
    // Step 8: Test persistence by reloading page
    cy.reload()
    
    // Verify all tasks persist
    cy.getByDataCy('task-item').should('have.length', 5)
    cy.getByDataCy('filter-all').should('contain', '5')
    cy.getByDataCy('filter-active').should('contain', '3')
    cy.getByDataCy('filter-completed').should('contain', '2')
    
    // Step 9: Clean up - delete all tasks
    cy.getByDataCy('delete-btn').click({ multiple: true })
    
    // Verify return to empty state
    cy.contains('No tasks yet').should('be.visible')
    cy.getByDataCy('filter-all').should('contain', '0')
    cy.getByDataCy('filter-active').should('contain', '0')
    cy.getByDataCy('filter-completed').should('contain', '0')
  })

  it('should handle edge cases and error conditions', () => {
    // Test adding task with special characters
    cy.addTask('Task with special chars: !@#$%^&*()')
    cy.getByDataCy('task-item').should('contain', 'Task with special chars: !@#$%^&*()')
    
    // Test adding very long task title
    const longTitle = 'A'.repeat(200)
    cy.addTask(longTitle)
    cy.getByDataCy('task-item').should('contain', longTitle)
    
    // Test rapid task creation
    for (let i = 0; i < 10; i++) {
      cy.addTask(`Rapid task ${i + 1}`)
    }
    cy.getByDataCy('task-item').should('have.length', 12) // 2 from above + 10 new
    
    // Test deleting all tasks
    cy.getByDataCy('delete-btn').click({ multiple: true })
    cy.contains('No tasks yet').should('be.visible')
  })

  it('should maintain data integrity across browser sessions', () => {
    // Add tasks and complete some
    cy.addTask('Session Test 1')
    cy.addTask('Session Test 2')
    cy.getByDataCy('task-item').first().find('[data-cy=complete-checkbox]').click()
    
    // Clear localStorage to simulate data loss scenarios
    cy.clearLocalStorage()
    cy.reload()
    
    // Verify data is gone (expected behavior)
    cy.contains('No tasks yet').should('be.visible')
    
    // Re-add data
    cy.addTask('Persistent Task')
    cy.getByDataCy('complete-checkbox').click()
    
    // Reload without clearing localStorage
    cy.reload()
    
    // Verify data persists
    cy.getByDataCy('task-item').should('have.length', 1)
    cy.getByDataCy('task-item').should('contain', 'Persistent Task')
    cy.getByDataCy('complete-checkbox').should('be.checked')
  })
})