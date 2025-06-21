
import { Search } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <Search className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-rounded">
        No palettes found
      </h3>
      <p className="text-gray-600 dark:text-gray-300 font-rounded">
        Try adjusting your search or filter criteria
      </p>
    </div>
  );
};
