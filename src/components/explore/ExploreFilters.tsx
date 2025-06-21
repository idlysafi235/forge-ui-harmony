
import { Search, TrendingUp, Clock } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BentoCard } from "@/components/ui/bento-card";

interface ExploreFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: 'recent' | 'popular';
  setSortBy: (sort: 'recent' | 'popular') => void;
  filterBy: 'all' | 'light' | 'dark';
  setFilterBy: (filter: 'all' | 'light' | 'dark') => void;
}

export const ExploreFilters = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy
}: ExploreFiltersProps) => {
  return (
    <BentoCard className="p-8 mb-8">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search palettes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400"
          />
        </div>
        <div className="flex gap-4">
          <Select value={sortBy} onValueChange={(value: 'recent' | 'popular') => setSortBy(value)}>
            <SelectTrigger className="w-48 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Most Popular</span>
                </div>
              </SelectItem>
              <SelectItem value="recent">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Most Recent</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterBy} onValueChange={(value: 'all' | 'light' | 'dark') => setFilterBy(value)}>
            <SelectTrigger className="w-40 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Themes</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </BentoCard>
  );
};
