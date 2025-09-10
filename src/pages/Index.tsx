import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Card } from '@/components/ui/card';
import TaskForm from '@/components/TaskForm';
import TaskList, { Task } from '@/components/TaskList';
import TaskFilter, { FilterType } from '@/components/TaskFilter';
import SearchBar from '@/components/SearchBar';
import ProgressBar from '@/components/ProgressBar';
import DarkModeToggle from '@/components/DarkModeToggle';
import { CheckSquare, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'task-manager-tasks';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority?: 'low' | 'medium' | 'high', dueDate?: Date) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: priority || 'medium',
      dueDate: dueDate?.toISOString(),
      notes: '',
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const editTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const reorderTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter(task => {
    // Filter by completion status
    let matchesFilter = true;
    switch (currentFilter) {
      case 'active':
        matchesFilter = !task.completed;
        break;
      case 'completed':
        matchesFilter = task.completed;
        break;
      default:
        matchesFilter = true;
    }

    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.notes && task.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg">
                <CheckSquare className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Task Manager
              </h1>
              <Sparkles className="w-6 h-6 text-primary" />
              <DarkModeToggle />
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay organized and productive with our beautiful task management system. 
              Add, complete, and organize your tasks with ease.
            </p>
          </div>

          {/* Main Content */}
          <Card className="p-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <TaskForm onAddTask={addTask} />
            
            {tasks.length > 0 && (
              <ProgressBar 
                total={tasks.length} 
                completed={taskCounts.completed} 
              />
            )}
            
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            
            <TaskFilter
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              taskCounts={taskCounts}
            />

            <TaskList
              tasks={filteredTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
              onReorderTasks={reorderTasks}
            />
          </Card>

          {/* Footer Stats */}
          {tasks.length > 0 && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-6 px-6 py-3 bg-card/60 backdrop-blur-sm rounded-full border">
                <div className="text-sm">
                  <span className="font-medium text-foreground">{taskCounts.all}</span>
                  <span className="text-muted-foreground ml-1">total</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="text-sm">
                  <span className="font-medium text-warning">{taskCounts.active}</span>
                  <span className="text-muted-foreground ml-1">active</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="text-sm">
                  <span className="font-medium text-success">{taskCounts.completed}</span>
                  <span className="text-muted-foreground ml-1">done</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
