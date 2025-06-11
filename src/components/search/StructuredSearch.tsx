
import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { popularSubjects, locations } from '@/constants/searchData';

interface StructuredSearchProps {
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
  selectedStructuredLocation: string;
  setSelectedStructuredLocation: (value: string) => void;
  onSearch: () => void;
}

const StructuredSearch: React.FC<StructuredSearchProps> = ({
  selectedSubject,
  setSelectedSubject,
  selectedStructuredLocation,
  setSelectedStructuredLocation,
  onSearch
}) => (
  <div className="search-container p-6">
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What do you want to study?
        </label>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            {popularSubjects.map(subject => (
              <SelectItem key={subject} value={subject.toLowerCase()}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Where do you want to study?
        </label>
        <Select value={selectedStructuredLocation} onValueChange={setSelectedStructuredLocation}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            {locations.map(location => (
              <SelectItem key={location} value={location.toLowerCase()}>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {location}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
    <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90" onClick={onSearch}>
      <Search className="w-4 h-4 mr-2" />
      Search Programs
    </Button>
  </div>
);

export default StructuredSearch;
