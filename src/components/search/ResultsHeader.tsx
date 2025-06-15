
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ResultsHeaderProps {
  filteredResultsCount: number;
  searchQuery: string;
  onShowFilters: () => void;
  activeFiltersCount: number;
  sortBy: string;
  onSortByChange: (value: string) => void;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  filteredResultsCount,
  searchQuery,
  onShowFilters,
  activeFiltersCount,
  sortBy,
  onSortByChange,
}) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Search Results
        </h2>
        <p className="text-gray-600 mt-1">
          {filteredResultsCount} results found
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>
      <Button variant="outline" onClick={onShowFilters} className="lg:hidden">
        <Filter className="w-4 h-4 mr-2" />
        Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
      </Button>
    </div>
    <Select value={sortBy} onValueChange={onSortByChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="relevance">Relevance</SelectItem>
        <SelectItem value="rating">Highest Rated</SelectItem>
        <SelectItem value="deadline">Application Deadline</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default ResultsHeader;
