
import React from 'react';
import { Search, Globe, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { SearchWithSuggestions } from '@/components/ui/search-with-suggestions';
import { degreeTypes, subjects } from '@/constants/searchData';

interface VisualSearchProps {
  selectedDegree: string;
  setSelectedDegree: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSearch: () => void;
  onSubjectClick: (subjectName: string) => void;
}

const VisualSearch: React.FC<VisualSearchProps> = ({
  selectedDegree,
  setSelectedDegree,
  searchQuery,
  setSearchQuery,
  onKeyPress,
  onSearch,
  onSubjectClick
}) => (
  <div className="search-container p-6">
    <div className="text-center mb-6">
      <h3 className="text-lg font-semibold mb-2">Find Your Perfect Program</h3>
      <p className="text-gray-600">Start by selecting your degree type, then explore subjects</p>
    </div>
    
    <div className="flex rounded-lg overflow-hidden border border-gray-300 mb-6">
      <Select value={selectedDegree} onValueChange={setSelectedDegree}>
        <SelectTrigger className="w-56 border-0 border-r border-gray-300 rounded-none bg-gray-50">
          <SelectValue placeholder="Select Degree Type" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg">
          <SelectItem value="all">All Degree Types</SelectItem>
          {degreeTypes.map(degree => (
            <SelectItem key={degree.value} value={degree.value}>
              <div className="flex items-center gap-2">
                <degree.icon className="w-4 h-4" />
                {degree.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex-1 relative">
        <SearchWithSuggestions
          value={searchQuery}
          onChange={setSearchQuery}
          onKeyPress={onKeyPress}
          placeholder="Search subjects, universities, locations..."
          showIcon={false}
        />
      </div>
      <Button className="rounded-none px-6 bg-primary text-primary-foreground hover:bg-primary/90" onClick={onSearch}>
        <Search className="w-5 h-5" />
      </Button>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
      {degreeTypes.map(degree => (
        <Card 
          key={degree.value} 
          className={`cursor-pointer hover:scale-105 transition-transform search-card ${selectedDegree === degree.value ? 'ring-2 ring-primary' : ''}`} 
          onClick={() => setSelectedDegree(degree.value)}
        >
          <CardContent className="p-4">
            <div className="mb-2 text-center text-gray-600">
              <degree.icon className="w-8 h-8 mx-auto" />
            </div>
            <h4 className="font-semibold text-center text-sm">{degree.label}</h4>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="mb-4">
      <h4 className="text-lg font-semibold mb-3">Browse by Subject</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
        {subjects.map(subject => (
          <Card key={subject.name} className="cursor-pointer hover:scale-105 transition-transform search-card" onClick={() => onSubjectClick(subject.name)}>
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="text-gray-600">
                  <subject.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{subject.name}</h4>
                  <Badge variant="secondary" className="text-xs mt-1">{subject.category}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    
    <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">Quick Filters</h4>
          <p className="text-sm text-gray-600">Narrow down your search</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            <Globe className="w-3 h-3 mr-1" />
            Online
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Part-time
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            <Star className="w-3 h-3 mr-1" />
            Top Rated
          </Badge>
        </div>
      </div>
    </div>
  </div>
);

export default VisualSearch;
