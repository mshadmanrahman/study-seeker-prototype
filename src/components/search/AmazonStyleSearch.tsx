
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { degreeTypes, subjects } from '@/constants/searchData';

interface AmazonStyleSearchProps {
  selectedDegree: string;
  setSelectedDegree: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSearch: () => void;
  onPopularSearchClick: (searchTerm: string) => void;
  onSubjectClick: (subjectName: string) => void;
}

const AmazonStyleSearch: React.FC<AmazonStyleSearchProps> = ({
  selectedDegree,
  setSelectedDegree,
  searchQuery,
  setSearchQuery,
  onKeyPress,
  onSearch,
  onPopularSearchClick,
  onSubjectClick
}) => (
  <div className="search-container p-6">
    <div className="flex rounded-lg overflow-hidden border border-gray-300">
      <Select value={selectedDegree} onValueChange={setSelectedDegree}>
        <SelectTrigger className="w-20 md:w-32 border-0 border-r border-gray-300 rounded-none bg-gray-50">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg">
          <SelectItem value="all">All Degrees</SelectItem>
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
        <Input 
          type="text" 
          placeholder="Search programs, universities, subjects..." 
          className="border-0 rounded-none focus:ring-0 focus:border-transparent" 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)} 
          onKeyPress={onKeyPress} 
        />
      </div>
      <Button className="rounded-none px-6 text-accent-foreground bg-pink-800 hover:bg-pink-700" onClick={onSearch}>
        <Search className="w-5 h-5" />
      </Button>
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
    
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-4">Browse by Subject</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
        {subjects.map(subject => (
          <Card key={subject.name} className="cursor-pointer hover:scale-105 transition-transform search-card" onClick={() => onSubjectClick(subject.name)}>
            <CardContent className="p-4">
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
  </div>
);

export default AmazonStyleSearch;
