import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, isAfter, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Trash2, CheckCircle2, Circle, Calendar as CalendarIcon, Edit2, Save, X } from 'lucide-react';
import { Task } from './TaskList';
import { cn } from '@/lib/utils';
import { Draggable } from '@hello-pangea/dnd';

interface TaskItemProps {
  task: Task;
  index: number;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, updates: Partial<Task>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  index,
  onToggleTask, 
  onDeleteTask, 
  onEditTask 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editNotes, setEditNotes] = useState(task.notes || '');
  const [editPriority, setEditPriority] = useState(task.priority || 'medium');
  const [editDueDate, setEditDueDate] = useState<Date | undefined>(
    task.dueDate ? parseISO(task.dueDate) : undefined
  );

  const isOverdue = task.dueDate && !task.completed && isAfter(new Date(), parseISO(task.dueDate));

  const handleSave = () => {
    onEditTask(task.id, {
      title: editTitle.trim(),
      notes: editNotes.trim(),
      priority: editPriority as Task['priority'],
      dueDate: editDueDate?.toISOString(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditNotes(task.notes || '');
    setEditPriority(task.priority || 'medium');
    setEditDueDate(task.dueDate ? parseISO(task.dueDate) : undefined);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'priority-low';
      case 'medium': return 'priority-medium';
      case 'high': return 'priority-high';
      default: return 'priority-medium';
    }
  };

  const getPriorityLabel = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'Low';
      case 'medium': return 'Medium';
      case 'high': return 'High';
      default: return 'Medium';
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-cy="task-item"
          className={cn(
            "task-item bg-card rounded-lg border border-border p-4 hover:shadow-md transition-all duration-200",
            isOverdue && "task-overdue",
            snapshot.isDragging && "task-dragging shadow-lg",
            task.completed && "opacity-60"
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-4"
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleTask(task.id)}
              data-cy="complete-checkbox"
              className="mt-1 w-5 h-5"
            />
            
            <div className="flex-1 space-y-2">
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    data-cy="edit-task-input"
                    className="font-medium"
                    autoFocus
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Select value={editPriority} onValueChange={(value: string) => setEditPriority(value as Task['priority'])}>
                      <SelectTrigger data-cy="priority-select">
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
                            "justify-start text-left font-normal",
                            !editDueDate && "text-muted-foreground"
                          )}
                          data-cy="due-date-picker"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {editDueDate ? format(editDueDate, "PPP") : "Pick due date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={editDueDate}
                          onSelect={setEditDueDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                        {editDueDate && (
                          <div className="p-3 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditDueDate(undefined)}
                              className="w-full"
                            >
                              Clear date
                            </Button>
                          </div>
                        )}
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Add notes..."
                    className="min-h-[60px]"
                    data-cy="edit-task-notes"
                  />

                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSave} data-cy="save-task-btn">
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 flex-wrap">
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                    
                    <span
                      className={cn(
                        "flex-1 text-base font-medium cursor-pointer",
                        task.completed ? "task-completed text-muted-foreground" : "text-foreground"
                      )}
                      onDoubleClick={() => setIsEditing(true)}
                    >
                      {task.title}
                    </span>

                    <Badge className={getPriorityColor(task.priority)}>
                      {getPriorityLabel(task.priority)}
                    </Badge>
                  </div>

                  {(task.dueDate || task.notes) && (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="details" className="border-0">
                        <AccordionTrigger className="py-2 text-sm text-muted-foreground hover:no-underline">
                          View details
                        </AccordionTrigger>
                        <AccordionContent className="space-y-2 text-sm">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground">
                            <div>Created: {format(parseISO(task.createdAt), "MMM d, yyyy")}</div>
                            {task.dueDate && (
                              <div className={isOverdue ? "text-destructive font-medium" : ""}>
                                Due: {format(parseISO(task.dueDate), "MMM d, yyyy")}
                                {isOverdue && " (Overdue)"}
                              </div>
                            )}
                          </div>
                          {task.notes && (
                            <div className="mt-2 p-3 bg-muted rounded-md">
                              <p className="text-sm">{task.notes}</p>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="h-8 w-8 p-0"
                  data-cy="edit-task-btn"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              )}
              
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
          </motion.div>
        </li>
      )}
    </Draggable>
  );
};

export default TaskItem;