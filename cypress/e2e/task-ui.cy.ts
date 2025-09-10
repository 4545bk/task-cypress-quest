describe('Task Manager - Basic UI Tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should display the main UI elements', () => {
    // Check header
    cy.contains('h1', 'Task Manager').should('be.visible')
    
    // Check form elements
    cy.getByDataCy('add-task-input').should('be.visible')
    cy.getByDataCy('add-task-btn').should('be.visible')
    
    // Check filter buttons
    cy.getByDataCy('filter-all').should('be.visible')
    cy.getByDataCy('filter-active').should('be.visible')
    cy.getByDataCy('filter-completed').should('be.visible')
    
    // Check empty state
    cy.contains('No tasks yet').should('be.visible')
  })

  it('should add a task and display it in the list', () => {
    const taskTitle = 'Test Task 1'
    
    // Add a task
    cy.addTask(taskTitle)
    
    // Verify task appears in list
    cy.getByDataCy('task-list').should('be.visible')
    cy.getByDataCy('task-item').should('have.length', 1)
    cy.getByDataCy('task-item').should('contain', taskTitle)
    
    // Verify empty state is gone
    cy.contains('No tasks yet').should('not.exist')
    
    // Verify input is cleared
    cy.getByDataCy('add-task-input').should('have.value', '')
  })

  it('should not add empty tasks', () => {
    // Try to add empty task
    cy.getByDataCy('add-task-btn').should('be.disabled')
    
    // Try to add task with only spaces
    cy.getByDataCy('add-task-input').type('   ')
    cy.getByDataCy('add-task-btn').should('be.disabled')
    
    // Verify no tasks are added
    cy.getByDataCy('task-list').should('not.exist')
    cy.contains('No tasks yet').should('be.visible')
  })

  it('should update task counts in filter buttons', () => {
    // Initially all counts should be 0
    cy.getByDataCy('filter-all').should('contain', '0')
    cy.getByDataCy('filter-active').should('contain', '0')
    cy.getByDataCy('filter-completed').should('contain', '0')
    
    // Add a task
    cy.addTask('Test Task')
    
    // Check updated counts
    cy.getByDataCy('filter-all').should('contain', '1')
    cy.getByDataCy('filter-active').should('contain', '1')
    cy.getByDataCy('filter-completed').should('contain', '0')
  })
})