
import React from 'react';
import { Search, RefreshCw, TrendingUp, BookOpen, Award, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NoResultsProps {
  searchQuery: string;
  onNewSearch: (query: string) => void;
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
}

const NoResults: React.FC<NoResultsProps> = ({
  searchQuery,
  onNewSearch,
  onClearFilters,
  hasActiveFilters = false
}) => {
  const popularSuggestions = [
    'Computer Science Masters',
    'MBA Programs',
    'Engineering Degrees',
    'Medical Schools',
    'Art Programs',
    'Business Administration'
  ];

  const searchTips = [
    'Try different keywords or synonyms',
    'Check your spelling',
    'Use broader search terms',
    'Remove some filters to see more results'
  ];

  const quickCategories = [
    { name: 'Programs', icon: BookOpen, query: 'degree programs' },
    { name: 'Scholarships', icon: Award, query: 'scholarships' },
    { name: 'Universities', icon: Building, query: 'universities' },
    { name: 'Online Courses', icon: TrendingUp, query: 'online courses' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Main No Results Message */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <Search className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          No results found
        </h2>
        <p className="text-gray-600 mb-4">
          We couldn't find any results for{' '}
          <span className="font-medium text-gray-900">"{searchQuery}"</span>
        </p>
        
        {hasActiveFilters && (
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-3">
              Try removing some filters to see more results
            </p>
            <Button 
              variant="outline" 
              onClick={onClearFilters}
              className="inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      {/* Search Tips */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Search Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {searchTips.map((tip, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <span className="text-sm text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Browse by Category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickCategories.map((category) => (
            <Card 
              key={category.name}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNewSearch(category.query)}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-medium text-sm text-gray-900">
                  {category.name}
                </h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Suggestions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Popular Searches
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularSuggestions.map((suggestion) => (
            <Badge
              key={suggestion}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs px-3 py-1.5"
              onClick={() => onNewSearch(suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoResults;
