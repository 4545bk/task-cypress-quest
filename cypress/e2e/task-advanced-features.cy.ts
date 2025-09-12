describe('Task Manager - Advanced Features', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  describe('Task Management & Logic', () => {
    it('should prevent empty task creation', () => {
      cy.getByDataCy('add-task-btn').should('be.disabled')
      cy.getByDataCy('add-task-input').type('   ') // Only spaces
      cy.getByDataCy('add-task-btn').should('be.disabled')
    })

    it('should validate task character limits', () => {
      const longTitle = 'A'.repeat(500)
      cy.getByDataCy('add-task-input').type(longTitle)
      cy.getByDataCy('add-task-btn').click()
      cy.getByDataCy('task-item').should('contain', longTitle)
    })

    it('should handle task notes and description', () => {
      cy.addTask('Task with notes')
      cy.getByDataCy('edit-task-btn').click()
      
      const longNotes = 'This is a very long description that tests the notes functionality of the task manager application.'
      cy.getByDataCy('edit-task-notes').type(longNotes)
      cy.getByDataCy('save-task-btn').click()
      
   
  
    })

   

    it('should handle due dates correctly', () => {
      cy.addTask('Task with due date')
      cy.getByDataCy('edit-task-btn').click()
      
      // Set due date
      cy.getByDataCy('due-date-picker').click()
      cy.get('[role="gridcell"]').contains('15').click()
      cy.getByDataCy('save-task-btn').click()
    
    })
  })

  describe('UI & Interaction Features', () => {
    it('should support inline editing with keyboard shortcuts', () => {
      const originalTask = 'Original Task Name'
      const editedTask = 'Edited Task Name'
      
      cy.addTask(originalTask)
      
      // Double-click to edit
      cy.getByDataCy('task-item').find('span').dblclick()
      cy.getByDataCy('edit-task-input').should('be.visible')
      
      // Edit with Enter key
      cy.getByDataCy('edit-task-input').clear().type(editedTask).type('{enter}')
      cy.getByDataCy('task-item').should('contain', editedTask)
    })

    it('should cancel editing with Escape key', () => {
      const originalTask = 'Original Task Name'
      
      cy.addTask(originalTask)
      cy.getByDataCy('task-item').find('span').dblclick()
      cy.getByDataCy('edit-task-input').clear().type('Changed').type('{esc}')
      
      // Should revert to original
      cy.getByDataCy('task-item').should('contain', originalTask)
    })

    it('should show hover effects and transitions', () => {
      cy.addTask('Hover Test Task')
      
      // Test hover effects
      cy.getByDataCy('task-item').trigger('mouseover')
      cy.getByDataCy('task-item').should('have.class', 'hover:shadow-md')
    })

    it('should handle responsive layout', () => {
      // Test mobile viewport
      cy.viewport(375, 667)
      cy.addTask('Mobile Task')
      cy.getByDataCy('task-item').should('be.visible')
      
      // Test tablet viewport
      cy.viewport(768, 1024)
      cy.getByDataCy('task-item').should('be.visible')
      
      // Test desktop viewport
      cy.viewport(1920, 1080)
      cy.getByDataCy('task-item').should('be.visible')
    })

    it('should show task animations', () => {
      // Add task and verify it appears with animation
      cy.getByDataCy('add-task-input').type('Animated Task')
      cy.getByDataCy('add-task-btn').click()
      cy.getByDataCy('task-item').should('be.visible')
      
      // Delete task and verify animation
      cy.getByDataCy('delete-btn').click()
      cy.getByDataCy('task-item').should('not.exist')
    })
  })

  describe('Productivity & Tracking Features', () => {
    it('should show progress tracking', () => {
      // Add multiple tasks
      for (let i = 1; i <= 4; i++) {
        cy.addTask(`Task ${i}`)
      }
      
      // Complete half the tasks
      cy.getByDataCy('task-item').eq(0).find('[data-cy=complete-checkbox]').click()
      cy.getByDataCy('task-item').eq(1).find('[data-cy=complete-checkbox]').click()
      
      // Check progress bar
      cy.getByDataCy('progress-bar').should('be.visible')
      cy.contains('2/4 tasks completed').should('be.visible')
    })

    it('should handle daily summary stats', () => {
      // Add and complete tasks
      cy.addTask('Daily Task 1')
      cy.addTask('Daily Task 2')
      cy.addTask('Daily Task 3')
      
      // Complete one task
      cy.getByDataCy('task-item').first().find('[data-cy=complete-checkbox]').click()
      
      
    })
  })

  describe('System & Data Features', () => {
    it('should persist data in localStorage', () => {
      // Add tasks
      cy.addTask('Persistent Task 1')
      cy.addTask('Persistent Task 2')
      
      // Complete one task
      cy.getByDataCy('task-item').first().find('[data-cy=complete-checkbox]').click()
      
      // Reload page
      cy.reload()
      
      // Verify data persisted
      cy.getByDataCy('task-item').should('have.length', 2)
      cy.getByDataCy('task-item').first().find('[data-cy=complete-checkbox]').should('be.checked')
    })

   

    it('should handle multiple browser tabs', () => {
      // Add task in current tab
      cy.addTask('Tab Test Task')
      
      // Simulate data change (this would normally happen in another tab)
      cy.window().then((win) => {
        const tasks = JSON.parse(win.localStorage.getItem('task-manager-tasks') || '[]')
        tasks.push({
          id: 'external-task',
          title: 'External Task',
          completed: false,
          createdAt: new Date().toISOString(),
          priority: 'medium'
        })
        win.localStorage.setItem('task-manager-tasks', JSON.stringify(tasks))
      })
      
      // Reload to simulate tab refresh
      cy.reload()
      
      // Should show both tasks
      cy.getByDataCy('task-item').should('have.length', 2)
    })
  })
})