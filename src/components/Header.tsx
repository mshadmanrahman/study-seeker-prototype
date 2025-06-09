
import React, { useState } from 'react';
import { Search, Globe, User, ChevronDown, BookOpen, GraduationCap, Award, Target, Microscope, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');

  const degreeTypes = [
    { value: 'preparatory', label: 'Preparatory', icon: BookOpen },
    { value: 'bachelors', label: 'Bachelors', icon: GraduationCap },
    { value: 'post-bachelors', label: 'Post-Bachelors', icon: FileText },
    { value: 'masters', label: 'Masters', icon: Target },
    { value: 'postgraduate', label: 'Postgraduate', icon: Microscope },
    { value: 'phd', label: 'PhD Studies', icon: Award }
  ];

  const popularSearches = ['MBA in London', 'Computer Science PhD', 'Medicine in Germany', 'Online Masters'];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/f9cd9d53-d676-4f5b-a143-85d026ced35b.png" 
              alt="Educations.com Logo" 
              className="h-8"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="flex items-center text-gray-700 hover:text-primary font-medium">
              <BookOpen className="w-4 h-4 mr-2" />
              Programs
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-primary font-medium">
              <FileText className="w-4 h-4 mr-2" />
              Resources
            </a>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="flex rounded-lg overflow-hidden border border-gray-300">
              <Select value={selectedDegree} onValueChange={setSelectedDegree}>
                <SelectTrigger className="w-24 md:w-32 border-0 border-r border-gray-300 rounded-none bg-gray-50 text-xs">
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
                  placeholder="Search for subject or location"
                  className="border-0 rounded-none focus:ring-0 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="rounded-none px-4 bg-primary text-primary-foreground hover:bg-primary/90">
                <Search className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Popular Searches - Only show when search is focused or has content */}
            {(searchQuery || document.activeElement?.closest('.search-container')) && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg p-3 mt-1">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600">Popular:</span>
                  {popularSearches.map(term => (
                    <Badge
                      key={term}
                      variant="secondary"
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground text-xs"
                      onClick={() => setSearchQuery(term)}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right side - Language and Sign in */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              EN
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
