import React from 'react';
import { Button } from '@/components/ui/button';
import { ListTodo, CheckCircle, Clock } from 'lucide-react';

export type FilterType = 'all' | 'active' | 'completed';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({ currentFilter, onFilterChange, taskCounts }) => {
  const filters = [
    {
      key: 'all' as FilterType,
      label: 'All Tasks',
      icon: ListTodo,
      count: taskCounts.all,
      dataCy: 'filter-all',
    },
    {
      key: 'active' as FilterType,
      label: 'Active',
      icon: Clock,
      count: taskCounts.active,
      dataCy: 'filter-active',
    },
    {
      key: 'completed' as FilterType,
      label: 'Completed',
      icon: CheckCircle,
      count: taskCounts.completed,
      dataCy: 'filter-completed',
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {filters.map(({ key, label, icon: Icon, count, dataCy }) => (
        <Button
          key={key}
          variant={currentFilter === key ? "default" : "secondary"}
          onClick={() => onFilterChange(key)}
          data-cy={dataCy}
          className={`btn-secondary flex items-center gap-2 ${
            currentFilter === key 
              ? 'btn-primary text-primary-foreground shadow-md' 
              : 'text-secondary-foreground hover:bg-secondary-hover'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
          <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
            currentFilter === key 
              ? 'bg-primary-foreground/20 text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {count}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default TaskFilter;