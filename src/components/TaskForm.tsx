import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskFormProps {
  onAddTask: (title: string, priority?: 'low' | 'medium' | 'high', dueDate?: Date) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState<Date | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask(taskTitle.trim(), priority, dueDate);
      setTaskTitle('');
      setPriority('medium');
      setDueDate(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            data-cy="add-task-input"
            className="task-input h-12 text-base border-input-border focus:border-primary focus:ring-primary"
          />
        </div>
        <Button
          type="submit"
          data-cy="add-task-btn"
          className="btn-primary h-12 px-6 font-medium"
          disabled={!taskTitle.trim()}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
          <SelectTrigger data-cy="add-task-priority">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal h-12",
                !dueDate && "text-muted-foreground"
              )}
              data-cy="add-task-due-date"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? format(dueDate, "PPP") : "Pick due date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={setDueDate}
              initialFocus
              className="pointer-events-auto"
            />
            {dueDate && (
              <div className="p-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDueDate(undefined)}
                  className="w-full"
                >
                  Clear date
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </form>
  );
};

export default TaskForm;