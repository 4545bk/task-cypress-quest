import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  total: number;
  completed: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, completed }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Progress</span>
        <span className="text-sm text-muted-foreground">
          {completed}/{total} tasks completed ({percentage}%)
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2" 
        data-cy="progress-bar"
      />
    </div>
  );
};

export default ProgressBar;