import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Circle, FileText, Target } from 'lucide-react';
import TaskItem from './TaskItem';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  notes?: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, updates: Partial<Task>) => void;
  onReorderTasks: (tasks: Task[]) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggleTask, 
  onDeleteTask, 
  onEditTask,
  onReorderTasks 
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorderTasks(items);
  };
  if (tasks.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Target className="w-12 h-12 text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Ready to get productive?</h3>
        <p className="text-muted-foreground text-lg mb-1">No tasks yet</p>
        <p className="text-muted-foreground text-sm">Add your first task above to get started on your goals!</p>
        
        <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Add tasks</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>Set priorities</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-4 h-4" />
            <span>Track progress</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided, snapshot) => (
          <ul 
            {...provided.droppableProps}
            ref={provided.innerRef}
            data-cy="task-list" 
            className={`space-y-3 ${snapshot.isDraggingOver ? 'task-drop-area' : ''}`}
          >
            <AnimatePresence>
              {tasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  index={index}
                  onToggleTask={onToggleTask}
                  onDeleteTask={onDeleteTask}
                  onEditTask={onEditTask}
                />
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;