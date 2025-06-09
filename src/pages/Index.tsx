
import React, { useState } from 'react';
import { Search, ChevronDown, MapPin, BookOpen, GraduationCap, Award, Filter, Globe, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [activeSearch, setActiveSearch] = useState('structured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const degreeTypes = [
    { value: 'bachelor', label: 'Bachelor\'s Degree', icon: '🎓' },
    { value: 'master', label: 'Master\'s Degree', icon: '📚' },
    { value: 'phd', label: 'PhD/Doctorate', icon: '🔬' },
    { value: 'certificate', label: 'Certificate', icon: '📜' },
    { value: 'diploma', label: 'Diploma', icon: '🏆' },
  ];

  const popularSubjects = [
    'Computer Science', 'Business Administration', 'Engineering', 'Medicine',
    'Psychology', 'Arts & Design', 'Data Science', 'Marketing'
  ];

  const locations = [
    'United States', 'United Kingdom', 'Germany', 'Canada', 'Australia',
    'Netherlands', 'Sweden', 'Switzerland'
  ];

  const StructuredSearch = () => (
    <div className="search-container p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What do you want to study?
          </label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              {popularSubjects.map((subject) => (
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
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              {locations.map((location) => (
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
      <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
        <Search className="w-4 h-4 mr-2" />
        Search Programs
      </Button>
    </div>
  );

  const FreeTextSearch = () => (
    <div className="search-container p-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for any program, university, or location..."
          className="pl-10 pr-4 py-3 text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-sm text-gray-600">Popular searches:</span>
        {['MBA in London', 'Computer Science PhD', 'Medicine in Germany', 'Online Masters'].map((term) => (
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

  const AmazonStyleSearch = () => (
    <div className="search-container p-6">
      <div className="flex rounded-lg overflow-hidden border border-gray-300">
        <Select value={selectedDegree} onValueChange={setSelectedDegree}>
          <SelectTrigger className="w-48 border-0 border-r border-gray-300 rounded-none bg-gray-50">
            <SelectValue placeholder="All Degrees" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            <SelectItem value="all">All Degrees</SelectItem>
            {degreeTypes.map((degree) => (
              <SelectItem key={degree.value} value={degree.value}>
                <div className="flex items-center gap-2">
                  <span>{degree.icon}</span>
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="rounded-none px-6 bg-accent text-accent-foreground hover:bg-accent/90">
          <Search className="w-5 h-5" />
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        {degreeTypes.slice(0, 4).map((degree) => (
          <Card key={degree.value} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-3 text-center">
              <div className="text-2xl mb-1">{degree.icon}</div>
              <div className="text-xs font-medium">{degree.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const VisualSearch = () => (
    <div className="search-container p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Find Your Perfect Program</h3>
        <p className="text-gray-600">Explore programs by category or search directly</p>
      </div>
      
      {/* Search Bar for Visual Discovery */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Quick search across all programs..."
          className="pl-10 pr-4 py-3 text-lg bg-white/50 backdrop-blur-sm border-gray-300 focus:bg-white focus:border-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
          size="sm"
        >
          Search
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { title: 'STEM & Technology', icon: '💻', color: 'bg-blue-500', count: '2,847 programs' },
          { title: 'Business & Finance', icon: '💼', color: 'bg-green-500', count: '1,923 programs' },
          { title: 'Arts & Design', icon: '🎨', color: 'bg-purple-500', count: '1,156 programs' },
          { title: 'Health & Medicine', icon: '🏥', color: 'bg-red-500', count: '987 programs' },
          { title: 'Social Sciences', icon: '🌍', color: 'bg-yellow-500', count: '1,445 programs' },
          { title: 'Engineering', icon: '⚙️', color: 'bg-gray-500', count: '2,134 programs' },
        ].map((category) => (
          <Card key={category.title} className="cursor-pointer hover:scale-105 transition-transform search-card">
            <CardContent className="p-4">
              <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white text-2xl mb-3 mx-auto`}>
                {category.icon}
              </div>
              <h4 className="font-semibold text-center mb-1">{category.title}</h4>
              <p className="text-xs text-gray-500 text-center">{category.count}</p>
            </CardContent>
          </Card>
        ))}
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

  const searchTypes = [
    { id: 'structured', name: 'Current Implementation', desc: 'Dropdown-based structured search' },
    { id: 'freetext', name: 'Free Text Search', desc: 'Google-style text input with suggestions' },
    { id: 'amazon', name: 'Category + Search', desc: 'Amazon-style category dropdown with search' },
    { id: 'visual', name: 'Visual Discovery', desc: 'Category-based visual exploration' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary/80 to-accent/80 backdrop-blur-sm text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Educations.com</h1>
            <p className="text-xl opacity-90">Search Experience Prototype</p>
          </div>
        </div>
      </header>

      {/* Search Type Selector */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">Choose Your Search Experience</h2>
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {searchTypes.map((type) => (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all ${
                  activeSearch === type.id ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => setActiveSearch(type.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{type.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{type.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Active Search Interface */}
        <div className="max-w-4xl mx-auto">
          {activeSearch === 'structured' && <StructuredSearch />}
          {activeSearch === 'freetext' && <FreeTextSearch />}
          {activeSearch === 'amazon' && <AmazonStyleSearch />}
          {activeSearch === 'visual' && <VisualSearch />}
        </div>

        {/* Features Comparison */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Implementation Comparison</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                type: 'Current Implementation',
                pros: ['Precise filtering', 'Database-friendly', 'Clear structure'],
                cons: ['Limited flexibility', 'Requires exact matches', 'Less discovery'],
                best: 'Users who know exactly what they want'
              },
              {
                type: 'Free Text Search',
                pros: ['Natural language', 'Flexible queries', 'Quick to use'],
                cons: ['Requires smart matching', 'Can be ambiguous', 'More complex backend'],
                best: 'Quick exploration and broad searches'
              },
              {
                type: 'Category + Search',
                pros: ['Combines structure & flexibility', 'Familiar UX pattern', 'Good for browsing'],
                cons: ['More complex UI', 'Category maintenance', 'Two-step process'],
                best: 'Mixed user intentions and behaviors'
              },
              {
                type: 'Visual Discovery',
                pros: ['Engaging interface', 'Great for exploration', 'Mobile-friendly'],
                cons: ['Less precise', 'Harder to implement', 'Limited text search'],
                best: 'New users and mobile browsing'
              }
            ].map((item, index) => (
              <Card key={index} className="search-card">
                <CardHeader>
                  <CardTitle className="text-lg">{item.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Pros</h4>
                    <ul className="text-sm space-y-1">
                      {item.pros.map((pro, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Considerations</h4>
                    <ul className="text-sm space-y-1">
                      {item.cons.map((con, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">Best For</h4>
                    <p className="text-sm">{item.best}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
