
import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, User, ChevronDown, BookOpen, GraduationCap, Award, Target, Microscope, FileText, MapPin, Clock, Star, X, Monitor, Palette, Heart, Calculator, Briefcase, Camera, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSearchType, setActiveSearchType] = useState('structured');
  const searchRef = useRef<HTMLDivElement>(null);

  const degreeTypes = [
    { value: 'preparatory', label: 'Preparatory', icon: BookOpen },
    { value: 'bachelors', label: 'Bachelors', icon: GraduationCap },
    { value: 'post-bachelors', label: 'Post-Bachelors', icon: FileText },
    { value: 'masters', label: 'Masters', icon: Target },
    { value: 'postgraduate', label: 'Postgraduate', icon: Microscope },
    { value: 'phd', label: 'PhD Studies', icon: Award }
  ];

  const popularSubjects = [
    { name: 'Computer Science', icon: Monitor },
    { name: 'Business Administration', icon: Briefcase },
    { name: 'Engineering', icon: Calculator },
    { name: 'Medicine', icon: Heart },
    { name: 'Psychology', icon: User },
    { name: 'Arts & Design', icon: Palette },
    { name: 'Data Science', icon: Target },
    { name: 'Marketing', icon: Camera }
  ];
  
  const locations = ['United States', 'United Kingdom', 'Germany', 'Canada', 'Australia', 'Netherlands', 'Sweden', 'Switzerland'];
  const popularSearches = ['MBA in London', 'Computer Science PhD', 'Medicine in Germany', 'Online Masters'];

  // Close expanded search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    setIsExpanded(true);
  };

  const handleCloseSearch = () => {
    setIsExpanded(false);
  };

  const StructuredSearch = () => (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What do you want to study?
          </label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
              {popularSubjects.map(subject => (
                <SelectItem key={subject.name} value={subject.name.toLowerCase()}>
                  <div className="flex items-center gap-2">
                    <subject.icon className="w-4 h-4" />
                    {subject.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Where do you want to study?
          </label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
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
      <Button className="w-full bg-teal-600 text-white hover:bg-teal-700">
        <Search className="w-4 h-4 mr-2" />
        Search Programs
      </Button>
    </div>
  );

  const FreeTextSearch = () => (
    <div className="p-6">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for any program, university, or location..."
          className="pl-10 pr-4 py-3 text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-600">Popular searches:</span>
        {popularSearches.map(term => (
          <Badge
            key={term}
            variant="secondary"
            className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
            onClick={() => setSearchQuery(term)}
          >
            {term}
          </Badge>
        ))}
      </div>
    </div>
  );

  const CategorySearch = () => (
    <div className="p-8 min-h-[400px]">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Find Your Perfect Program</h3>
        <p className="text-gray-600">Browse by subject area or search directly</p>
      </div>

      <div className="flex rounded-lg overflow-hidden border border-gray-300 mb-6">
        <Select value={selectedDegree} onValueChange={setSelectedDegree}>
          <SelectTrigger className="w-48 border-0 border-r border-gray-300 rounded-none bg-gray-50">
            <SelectValue placeholder="All Degrees" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
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
          <Input
            type="text"
            placeholder="Search subjects, universities, locations..."
            className="border-0 rounded-none focus:ring-0 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="rounded-none px-6 bg-teal-600 text-white hover:bg-teal-700">
          <Search className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {popularSubjects.map(subject => (
          <Card
            key={subject.name}
            className="cursor-pointer hover:scale-105 transition-transform hover:shadow-md"
            onClick={() => setSearchQuery(subject.name)}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-3 mx-auto">
                  <subject.icon className="w-6 h-6" />
                </div>
                <h4 className="font-medium text-sm">{subject.name}</h4>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex gap-2 justify-center">
        <Badge variant="outline" className="cursor-pointer hover:bg-teal-500 hover:text-white">
          <Globe className="w-3 h-3 mr-1" />
          Online
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-teal-500 hover:text-white">
          <Clock className="w-3 h-3 mr-1" />
          Part-time
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-teal-500 hover:text-white">
          <Star className="w-3 h-3 mr-1" />
          Top Rated
        </Badge>
      </div>
    </div>
  );

  const VisualSearch = () => (
    <div className="p-8 min-h-[450px]">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Choose Your Educational Journey</h3>
        <p className="text-gray-600">Select your degree type to explore programs</p>
      </div>
      
      <div className="flex rounded-lg overflow-hidden border border-gray-300 mb-6">
        <Select value={selectedDegree} onValueChange={setSelectedDegree}>
          <SelectTrigger className="w-48 border-0 border-r border-gray-300 rounded-none bg-gray-50">
            <SelectValue placeholder="Select Degree Type" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
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
          <Input
            type="text"
            placeholder="Search subjects, universities, locations..."
            className="border-0 rounded-none focus:ring-0 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="rounded-none px-6 bg-teal-600 text-white hover:bg-teal-700">
          <Search className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        {degreeTypes.map(degree => (
          <Card
            key={degree.value}
            className={`cursor-pointer hover:scale-105 transition-transform hover:shadow-lg ${
              selectedDegree === degree.value ? 'ring-2 ring-teal-500 bg-teal-50' : ''
            }`}
            onClick={() => setSelectedDegree(degree.value)}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto ${
                  selectedDegree === degree.value ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <degree.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-xs">{degree.label}</h4>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex gap-2 justify-center">
        <Badge variant="outline" className="cursor-pointer hover:bg-teal-500 hover:text-white">
          <Globe className="w-3 h-3 mr-1" />
          Online Programs
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-teal-500 hover:text-white">
          <Clock className="w-3 h-3 mr-1" />
          Flexible Schedule
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-teal-500 hover:text-white">
          <Star className="w-3 h-3 mr-1" />
          Top Universities
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-teal-500 hover:text-white">
          <Award className="w-3 h-3 mr-1" />
          Scholarships
        </Badge>
      </div>
    </div>
  );

  const renderExpandedSearch = () => {
    switch (activeSearchType) {
      case 'structured':
        return <StructuredSearch />;
      case 'freetext':
        return <FreeTextSearch />;
      case 'category':
        return <CategorySearch />;
      case 'visual':
        return <VisualSearch />;
      default:
        return <StructuredSearch />;
    }
  };

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
          <div className="flex-1 max-w-lg mx-4 relative" ref={searchRef}>
            {!isExpanded ? (
              <div 
                className="flex rounded-lg overflow-hidden border border-gray-300 cursor-pointer hover:border-gray-400 transition-colors"
                onClick={handleSearchClick}
              >
                <div className="w-24 md:w-32 border-r border-gray-300 bg-gray-50 flex items-center justify-center text-xs text-gray-600">
                  All
                </div>
                <div className="flex-1 px-3 py-2 bg-white">
                  <span className="text-gray-500">Search for subject or location</span>
                </div>
                <div className="px-4 bg-teal-600 text-white flex items-center">
                  <Search className="w-4 h-4" />
                </div>
              </div>
            ) : (
              <div className="absolute top-0 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveSearchType('structured')}
                      className={`px-3 py-1 text-xs rounded ${
                        activeSearchType === 'structured' ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Structured
                    </button>
                    <button
                      onClick={() => setActiveSearchType('freetext')}
                      className={`px-3 py-1 text-xs rounded ${
                        activeSearchType === 'freetext' ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Free Text
                    </button>
                    <button
                      onClick={() => setActiveSearchType('category')}
                      className={`px-3 py-1 text-xs rounded ${
                        activeSearchType === 'category' ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Category
                    </button>
                    <button
                      onClick={() => setActiveSearchType('visual')}
                      className={`px-3 py-1 text-xs rounded ${
                        activeSearchType === 'visual' ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Visual
                    </button>
                  </div>
                  <button
                    onClick={handleCloseSearch}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {renderExpandedSearch()}
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
