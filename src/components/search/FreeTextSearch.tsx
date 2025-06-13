
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { SearchWithSuggestions } from '@/components/ui/search-with-suggestions';

interface FreeTextSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onPopularSearchClick: (searchTerm: string) => void;
}

const FreeTextSearch: React.FC<FreeTextSearchProps> = ({
  searchQuery,
  setSearchQuery,
  onKeyPress,
  onPopularSearchClick
}) => (
  <div className="search-container p-6">
    <SearchWithSuggestions
      value={searchQuery}
      onChange={setSearchQuery}
      onKeyPress={onKeyPress}
      placeholder="Search for any program, university, or location..."
      className="mb-4"
    />
    <div className="flex flex-wrap gap-2 mt-4">
      <span className="text-sm text-gray-600">Popular searches:</span>
      {['MBA in London', 'Computer Science PhD', 'Medicine in Germany', 'Online Masters'].map(term => (
        <Badge 
          key={term} 
          variant="secondary" 
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground" 
          onClick={() => onPopularSearchClick(term)}
        >
          {term}
        </Badge>
      ))}
    </div>
  </div>
);

export default FreeTextSearch;
