import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <Circle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-lg">No tasks yet</p>
        <p className="text-muted-foreground text-sm">Add a task above to get started!</p>
      </div>
    );
  }

  return (
    <ul data-cy="task-list" className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          data-cy="task-item"
          className="task-item bg-card rounded-lg border border-border p-4 flex items-center gap-4 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-3 flex-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleTask(task.id)}
              data-cy="complete-checkbox"
              className="w-5 h-5"
            />
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-success" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground" />
            )}
            <span
              className={`flex-1 text-base ${
                task.completed ? 'task-completed text-muted-foreground' : 'text-foreground'
              }`}
            >
              {task.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteTask(task.id)}
              data-cy="delete-btn"
              className="btn-destructive h-8 w-8 p-0 text-destructive hover:bg-destructive-light hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;