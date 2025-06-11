
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

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
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input 
        type="text" 
        placeholder="Search for any program, university, or location..." 
        className="pl-10 pr-4 py-3 text-lg" 
        value={searchQuery} 
        onChange={e => setSearchQuery(e.target.value)} 
        onKeyPress={onKeyPress} 
      />
    </div>
    <div className="flex flex-wrap gap-2 mt-4">
      <span className="text-sm text-gray-600">Popular searches:</span>
      {['MBA in London', 'Computer Science PhD', 'Medicine in Germany', 'Online Masters'].map(term => (
        <Badge 
          key={term} 
          variant="secondary" 
          className="cursor-pointer hover:bg-accent hover:text-accent-foreground" 
          onClick={() => onPopularSearchClick(term)}
        >
          {term}
        </Badge>
      ))}
    </div>
  </div>
);

export default FreeTextSearch;
