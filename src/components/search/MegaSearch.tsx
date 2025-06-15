
import React, { useRef, useEffect } from 'react';
import { Search, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchWithSuggestions } from '@/components/ui/search-with-suggestions';
import { megaSearchCategories, recentSearches, popularSearches } from '@/constants/searchData';

interface MegaSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  showMegaDropdown: boolean;
  setShowMegaDropdown: (show: boolean) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSearch: () => void;
  onCategorySelect: (category: any) => void;
  onPopularSearchClick: (searchTerm: string) => void;
}

const MegaSearch: React.FC<MegaSearchProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  showMegaDropdown,
  setShowMegaDropdown,
  onKeyPress,
  onSearch,
  onCategorySelect,
  onPopularSearchClick
}) => {
  const megaSearchRef = useRef<HTMLDivElement>(null);

  // Close mega dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaSearchRef.current && !megaSearchRef.current.contains(event.target as Node)) {
        setShowMegaDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowMegaDropdown]);

  const handleInputFocus = () => {
    setShowMegaDropdown(true);
  };

  const handleInputClick = () => {
    setShowMegaDropdown(true);
  };

  return (
    <div ref={megaSearchRef} className="search-container p-6 relative z-10">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Search Everything</h3>
        <p className="text-gray-600">Find programs, schools, scholarships and more</p>
      </div>
      
      <div className="relative mb-6">
        <div className="flex rounded-lg overflow-hidden border border-gray-300">
          <div className="flex-1 relative" onClick={handleInputClick}>
            <SearchWithSuggestions
              value={searchQuery}
              onChange={setSearchQuery}
              onKeyPress={onKeyPress}
              placeholder="Type anything - programs, schools, scholarships..."
              className="h-full border-0 rounded-none"
              showIcon={true}
            />
          </div>
          <Button className="rounded-none px-6 text-white bg-primary hover:bg-primary/90" onClick={onSearch}>
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {showMegaDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl z-[9999] max-h-96 overflow-y-auto">
            <div className="p-4">
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Search in</h4>
                <div className="flex flex-wrap gap-2">
                  {megaSearchCategories.map((type) => (
                    <div
                      key={type.name}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition-all hover:shadow-md text-xs ${
                        selectedCategory === type.name
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      onClick={() => onCategorySelect(type)}
                    >
                      <type.icon className="w-3 h-3" />
                      <span className="font-medium">{type.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Recent searches</h4>
                <div className="space-y-1">
                  {recentSearches.map((search) => (
                    <div
                      key={search}
                      className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer rounded text-sm"
                      onClick={() => onPopularSearchClick(search)}
                    >
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{search}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Popular searches</h4>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search) => (
                    <Badge
                      key={search}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs px-2 py-1"
                      onClick={() => onPopularSearchClick(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Quick Access:</span>
        <div className="flex flex-wrap gap-2">
          {megaSearchCategories.map((type) => (
            <div
              key={type.name}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition-all hover:shadow-md text-xs ${
                selectedCategory === type.name
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => onCategorySelect(type)}
            >
              <type.icon className="w-3 h-3" />
              <span className="font-medium">{type.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaSearch;
