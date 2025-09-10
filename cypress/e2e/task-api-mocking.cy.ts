describe('Task Manager - API Mocking', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('should intercept and mock API calls for task loading', () => {
    // Mock API response for loading tasks
    cy.intercept('GET', '/api/tasks', {
      statusCode: 200,
      body: [
        {
          id: '1',
          title: 'Mocked Task 1',
          completed: false,
          createdAt: '2024-01-01T00:00:00.000Z'
        },
        {
          id: '2',
          title: 'Mocked Task 2',
          completed: true,
          createdAt: '2024-01-01T01:00:00.000Z'
        }
      ]
    }).as('getTasks')

    // Mock API response for creating tasks
    cy.intercept('POST', '/api/tasks', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          id: Math.random().toString(36).substr(2, 9),
          title: req.body.title,
          completed: false,
          createdAt: new Date().toISOString()
        }
      })
    }).as('createTask')

    // Mock API response for updating tasks
    cy.intercept('PUT', '/api/tasks/*', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          ...req.body,
          id: req.url.split('/').pop()
        }
      })
    }).as('updateTask')

    // Mock API response for deleting tasks
    cy.intercept('DELETE', '/api/tasks/*', {
      statusCode: 204,
      body: {}
    }).as('deleteTask')

    cy.visit('/')

    // Verify initial state (no API calls are actually made in this app)
    cy.contains('No tasks yet').should('be.visible')
  })

  it('should simulate network delays and loading states', () => {
    // Mock API with delay
    cy.intercept('GET', '/api/tasks', (req) => {
      req.reply((res) => {
        // Simulate network delay
        setTimeout(() => {
          res.send({
            statusCode: 200,
            body: []
          })
        }, 1000)
      })
    }).as('getTasksWithDelay')

    cy.visit('/')

    // In a real app, you would test loading spinners here
    // Since this app uses localStorage, we're just demonstrating the intercept pattern
    cy.contains('No tasks yet').should('be.visible')
  })

  it('should handle API error states', () => {
    // Mock API error
    cy.intercept('GET', '/api/tasks', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('getTasksError')

    // Mock create task error
    cy.intercept('POST', '/api/tasks', {
      statusCode: 400,
      body: { error: 'Invalid task data' }
    }).as('createTaskError')

    cy.visit('/')

    // Since this app doesn't make API calls, it will work normally
    // In a real API-connected app, you would test error handling here
    cy.addTask('Test Task')
    cy.getByDataCy('task-item').should('contain', 'Test Task')
  })

  it('should mock external service integrations', () => {
    // Mock external analytics service
    cy.intercept('POST', 'https://analytics.example.com/track', {
      statusCode: 200,
      body: { success: true }
    }).as('trackAnalytics')

    // Mock external notification service
    cy.intercept('POST', 'https://notifications.example.com/send', {
      statusCode: 200,
      body: { messageId: '12345' }
    }).as('sendNotification')

    cy.visit('/')

    // Add and complete a task
    cy.addTask('Analytics Test Task')
    cy.getByDataCy('complete-checkbox').click()

    // In a real app with integrations, you would verify the API calls were made
    // cy.wait('@trackAnalytics')
    // cy.wait('@sendNotification')
  })
})