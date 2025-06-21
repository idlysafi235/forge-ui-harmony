
import { Badge } from "@/components/ui/badge";
import { BentoCard } from "@/components/ui/bento-card";

interface StatsWidgetProps {
  primaryColor: string;
  secondaryColor: string;
}

export const StatsWidget = ({ primaryColor, secondaryColor }: StatsWidgetProps) => {
  return (
    <BentoCard className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white font-rounded">Monthly Stats</h3>
          <Badge 
            className="text-white font-semibold font-rounded"
            style={{ backgroundColor: primaryColor }}
          >
            +12%
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div 
              className="text-2xl font-bold font-rounded"
              style={{ color: primaryColor }}
            >
              1,234
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-rounded">Views</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div 
              className="text-2xl font-bold font-rounded"
              style={{ color: secondaryColor }}
            >
              567
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-rounded">Likes</div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};
