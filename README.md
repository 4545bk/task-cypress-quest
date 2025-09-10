# Task Manager - Cypress Testing Project

A beautiful, modern task management application built with React, TypeScript, and optimized for end-to-end testing with Cypress. This project demonstrates best practices for building testable web applications with comprehensive E2E test coverage.

![Task Manager](https://lovable.dev/opengraph-image-p98pqg.png)

## 🚀 Features

- ✅ **Task Management**: Add, complete, edit, and delete tasks
- 🎯 **Smart Filtering**: Filter tasks by All, Active, or Completed status
- 💾 **Local Persistence**: Tasks are saved to localStorage and persist across browser sessions
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 🧪 **Cypress Ready**: Comprehensive data-cy attributes for robust testing
- ♿ **Accessible**: Built with accessibility best practices
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI (shadcn/ui)
- **Icons**: Lucide React
- **Testing**: Cypress (E2E)
- **Storage**: localStorage for data persistence

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:8080`

4. **Open Cypress for testing**
   ```bash
   npm run cypress:open
   ```

## 🧪 Testing with Cypress

This project includes a comprehensive Cypress test suite demonstrating various testing patterns:

### Test Files Structure
```
cypress/e2e/
├── task-ui.cy.ts           # Basic UI element tests
├── task-interactions.cy.ts # User interaction tests
├── task-filters.cy.ts      # Filter functionality tests
├── task-api-mocking.cy.ts  # API mocking examples
└── full-flow.cy.ts         # Complete E2E workflows
```

### Key Testing Features

- **Data-cy Selectors**: All interactive elements have `data-cy` attributes for reliable testing
- **Custom Commands**: Reusable Cypress commands for common actions
- **API Mocking**: Examples of intercepting and mocking API calls
- **Local Storage Testing**: Verification of data persistence
- **Filter Testing**: Comprehensive testing of task filtering logic
- **Error Handling**: Edge cases and error condition testing

### Running Tests

```bash
# Open Cypress in interactive mode
npm run cypress:open

# Run tests in headless mode
npm run cypress:run

# Run specific test file
npx cypress run --spec "cypress/e2e/task-ui.cy.ts"
```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run cypress:open` - Open Cypress Test Runner
- `npm run cypress:run` - Run Cypress tests headlessly

## 🎨 Design System

The app uses a carefully crafted design system with:

- **Semantic Color Tokens**: HSL-based color system for consistency
- **Responsive Layout**: Mobile-first responsive design
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Dark Mode Ready**: Design system supports light/dark themes

## 🔧 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── TaskForm.tsx     # Task creation form
│   ├── TaskList.tsx     # Task list with items
│   └── TaskFilter.tsx   # Filter buttons
├── pages/
│   ├── Index.tsx        # Main application page
│   └── NotFound.tsx     # 404 page
├── lib/
│   └── utils.ts         # Utility functions
├── hooks/               # Custom React hooks
├── index.css           # Global styles and design system
└── main.tsx           # Application entry point
```

## 🎯 Cypress Testing Highlights

### Data Attributes for Testing
All interactive elements include `data-cy` attributes:
- `data-cy="add-task-input"` - Task input field
- `data-cy="add-task-btn"` - Add task button
- `data-cy="task-list"` - Task list container
- `data-cy="task-item"` - Individual task items
- `data-cy="complete-checkbox"` - Task completion checkboxes
- `data-cy="delete-btn"` - Task deletion buttons
- `data-cy="filter-all|active|completed"` - Filter buttons

### Custom Cypress Commands
```typescript
cy.getByDataCy('selector')    // Get element by data-cy attribute
cy.clearLocalStorage()        // Clear localStorage
cy.addTask('Task Title')      // Add a new task
```

### Test Categories
1. **UI Tests**: Verify all elements render correctly
2. **Interaction Tests**: Test user interactions and state changes
3. **Filter Tests**: Verify filtering logic works correctly
4. **API Mocking**: Demonstrate API interception patterns
5. **E2E Flows**: Complete user workflows from start to finish

## 🚀 Deployment

The app is ready for deployment to any static hosting service:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

Popular deployment options:
- **Vercel**: `vercel --prod`
- **Netlify**: Deploy `dist` folder
- **GitHub Pages**: Use GitHub Actions workflow

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Learning Resources

This project serves as an excellent example for:
- **React + TypeScript** best practices
- **Cypress E2E testing** patterns and strategies
- **Modern CSS** with Tailwind and design systems
- **Component architecture** and state management
- **Test-driven development** approaches

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

If you have questions or need help with the project:
1. Check the [Issues](../../issues) for existing solutions
2. Create a new issue with detailed information
3. Review the comprehensive Cypress test examples for testing patterns

---

**Happy Task Managing! 🎯**