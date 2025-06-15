import React, { useState } from 'react';
import { Search, BookOpen, GraduationCap, MapPin, DollarSign, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchWithSuggestions } from '@/components/ui/search-with-suggestions';

interface Careers360SearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSearch: () => void;
  onPopularSearchClick: (searchTerm: string) => void;
}

const quickAccessItems = [
  { icon: GraduationCap, label: 'Degrees', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { icon: BookOpen, label: 'Subjects', color: 'bg-green-50 text-green-700 border-green-200' },
  { icon: MapPin, label: 'Schools', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { icon: DollarSign, label: 'Scholarships', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { icon: FileText, label: 'Articles', color: 'bg-pink-50 text-pink-700 border-pink-200' }
];

const popularSearches = [
  'MBA in London', 'Computer Science PhD', 'Medicine in Germany', 'Online Masters',
  'Engineering Programs', 'Business Analytics', 'Psychology Degree', 'Art & Design'
];

const Careers360Search: React.FC<Careers360SearchProps> = ({
  searchQuery,
  setSearchQuery,
  onKeyPress,
  onSearch,
  onPopularSearchClick
}) => {
  const [activeQuickAccess, setActiveQuickAccess] = useState<string>('');

  const handleQuickAccessClick = (label: string) => {
    setActiveQuickAccess(activeQuickAccess === label ? '' : label);
    setSearchQuery(label.toLowerCase());
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Main Search Section */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Search Everything</h2>
        <p className="text-gray-600">Find programs, schools, scholarships and more</p>
        <div className="relative max-w-2xl mx-auto">
          <SearchWithSuggestions
            value={searchQuery}
            onChange={setSearchQuery}
            onKeyPress={onKeyPress}
            placeholder="Type anything - programs, schools, scholarships..."
            className="w-full"
            showIcon={false}
          />
          <Button 
            onClick={onSearch}
            className="absolute right-0 top-0 h-full px-6 rounded-l-none bg-teal-600 hover:bg-teal-700"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Quick Access */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
          Quick Access:
        </h4>
        <div className="flex flex-wrap gap-3">
          {quickAccessItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleQuickAccessClick(item.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all hover:shadow-md ${
                activeQuickAccess === item.label 
                  ? item.color + ' shadow-md' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Searches */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700">Popular Searches:</h4>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search) => (
            <Badge
              key={search}
              variant="secondary"
              className="cursor-pointer hover:bg-teal-600 hover:text-white transition-colors px-3 py-1"
              onClick={() => onPopularSearchClick(search)}
            >
              {search}
            </Badge>
          ))}
        </div>
      </div>

      {/* Search Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {/* Programs Card (teal) */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-teal-600">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-teal-50 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Programs</h3>
                <p className="text-sm text-gray-600">Browse degree programs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Universities Card (pink) */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-pink-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-pink-50 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Universities</h3>
                <p className="text-sm text-gray-600">Find top institutions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Scholarships Card (emerald) */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-lg">
                <DollarSign className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Scholarships</h3>
                <p className="text-sm text-gray-600">Financial aid options</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Careers360Search;
