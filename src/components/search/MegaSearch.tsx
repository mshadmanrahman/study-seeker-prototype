
import React, { useRef, useEffect } from 'react';
import { Search, ChevronDown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  const megaInputRef = useRef<HTMLInputElement>(null);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value && !showMegaDropdown) {
      setShowMegaDropdown(true);
    }
  };

  const handleInputFocus = () => {
    setShowMegaDropdown(true);
  };

  return (
    <div className="search-container p-6 relative z-50" ref={megaSearchRef}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Search Everything</h3>
        <p className="text-gray-600">Find programs, schools, scholarships and more</p>
      </div>
      
      <div className="relative mb-6">
        <div className="flex rounded-lg overflow-hidden border border-gray-300">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              ref={megaInputRef}
              type="text" 
              placeholder="Type anything - programs, schools, scholarships..." 
              value={searchQuery} 
              onChange={handleInputChange}
              onKeyPress={onKeyPress}
              onFocus={handleInputFocus}
              className="pl-10 pr-4 py-3 text-lg border-0 rounded-none focus:ring-0 focus:border-transparent"
            />
          </div>
          <Button className="rounded-none px-6 text-white bg-accent hover:bg-accent/90" onClick={onSearch}>
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {showMegaDropdown && (
          <div className="fixed left-1/2 transform -translate-x-1/2 w-full max-w-4xl mt-1 bg-white border border-gray-300 rounded-lg shadow-xl z-[9999] max-h-96 overflow-y-auto">
            <div className="p-4">
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Search in</h4>
                <div className="flex flex-wrap gap-2">
                  {megaSearchCategories.map((type) => (
                    <div 
                      key={type.name}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border cursor-pointer transition-all hover:shadow-md ${
                        selectedCategory === type.name 
                          ? 'border-purple-500 bg-purple-50 text-purple-700' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      onClick={() => onCategorySelect(type)}
                    >
                      <type.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{type.name}</span>
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
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground text-xs px-2 py-1"
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
                  ? 'border-purple-500 bg-purple-50 text-purple-700' 
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

      <div className="mt-4 text-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowMegaDropdown(!showMegaDropdown)}
        >
          {showMegaDropdown ? 'Hide Options' : 'Show Search Options'}
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showMegaDropdown ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default MegaSearch;
