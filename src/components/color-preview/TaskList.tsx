
import { CheckCircle } from 'lucide-react';
import { BentoCard } from "@/components/ui/bento-card";

interface TaskListProps {
  primaryColor: string;
  secondaryColor: string;
}

export const TaskList = ({ primaryColor, secondaryColor }: TaskListProps) => {
  const tasks = [
    { task: 'Review color palette', completed: true },
    { task: 'Update design system', completed: false },
    { task: 'Client presentation', completed: false }
  ];

  return (
    <BentoCard className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white font-rounded">Today's Tasks</h3>
        <div className="space-y-3">
          {tasks.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div 
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  item.completed ? 'text-white' : 'border-2'
                }`}
                style={{ 
                  backgroundColor: item.completed ? primaryColor : 'transparent',
                  borderColor: item.completed ? primaryColor : secondaryColor
                }}
              >
                {item.completed && <CheckCircle className="h-3 w-3" />}
              </div>
              <span 
                className={`font-rounded ${
                  item.completed 
                    ? 'line-through text-gray-500 dark:text-gray-400' 
                    : 'text-gray-900 dark:text-white'
                }`}
              >
                {item.task}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
};
