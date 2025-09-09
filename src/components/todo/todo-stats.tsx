import { CheckCircle2, Circle, Trash2 } from "lucide-react";

interface TodoStatsProps {
  total: number;
  completed: number;
  onClearCompleted: () => void;
}

export const TodoStats = ({ total, completed, onClearCompleted }: TodoStatsProps) => {
  const remaining = total - completed;

  return (
    <div className="flex items-center justify-between text-sm text-gray-600">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <Circle className="h-4 w-4" />
          {remaining} remaining
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="h-4 w-4" />
          {completed} completed
        </span>
      </div>
      
      {completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
        >
          <Trash2 className="h-4 w-4" />
          Clear completed
        </button>
      )}
    </div>
  );
};