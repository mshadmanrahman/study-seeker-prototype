import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, MapPin, BookOpen, GraduationCap, Award, Filter, Globe, Clock, Star, Settings, Building, Palette, Plane, Briefcase, Hammer, Scissors, Target, TrendingUp, Users, Zap, Cog, Leaf, Shirt, DollarSign, UtensilsCrossed, Home, Heart, Newspaper, MessageCircle, Scale, Dna, Lightbulb, UserCheck, Megaphone, Microscope, Music, Sparkles, Earth, Activity, Recycle, Monitor, FileText, Hotel, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
const Index = () => {
  const navigate = useNavigate();
  const [activeSearch, setActiveSearch] = useState('structured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showMegaDropdown, setShowMegaDropdown] = useState(false);
  const megaInputRef = useRef<HTMLInputElement>(null);
  const megaSearchRef = useRef<HTMLDivElement>(null);

  // New state for structured search
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedStructuredLocation, setSelectedStructuredLocation] = useState('');
  const degreeTypes = [{
    value: 'preparatory',
    label: 'Preparatory',
    icon: BookOpen
  }, {
    value: 'bachelors',
    label: 'Bachelors',
    icon: GraduationCap
  }, {
    value: 'post-bachelors',
    label: 'Post-Bachelors',
    icon: FileText
  }, {
    value: 'masters',
    label: 'Masters',
    icon: Target
  }, {
    value: 'postgraduate',
    label: 'Postgraduate',
    icon: Microscope
  }, {
    value: 'phd',
    label: 'PhD Studies',
    icon: Award
  }];
  const subjects = [{
    name: 'Administration Programs',
    icon: Settings,
    category: 'Business'
  }, {
    name: 'Architecture Programs',
    icon: Building,
    category: 'Design'
  }, {
    name: 'Art Programs',
    icon: Palette,
    category: 'Creative'
  }, {
    name: 'Aviation Programs',
    icon: Plane,
    category: 'Transportation'
  }, {
    name: 'Business Programs',
    icon: Briefcase,
    category: 'Business'
  }, {
    name: 'Construction Programs',
    icon: Hammer,
    category: 'Engineering'
  }, {
    name: 'Cosmetology Programs',
    icon: Scissors,
    category: 'Personal Care'
  }, {
    name: 'Design Programs',
    icon: Target,
    category: 'Creative'
  }, {
    name: 'Economic Programs',
    icon: TrendingUp,
    category: 'Business'
  }, {
    name: 'Education Programs',
    icon: Users,
    category: 'Education'
  }, {
    name: 'Energy Programs',
    icon: Zap,
    category: 'Engineering'
  }, {
    name: 'Engineering Programs',
    icon: Cog,
    category: 'Engineering'
  }, {
    name: 'Environmental Programs',
    icon: Leaf,
    category: 'Science'
  }, {
    name: 'Fashion Programs',
    icon: Shirt,
    category: 'Creative'
  }, {
    name: 'Finance Programs',
    icon: DollarSign,
    category: 'Business'
  }, {
    name: 'Food and Beverage Programs',
    icon: UtensilsCrossed,
    category: 'Hospitality'
  }, {
    name: 'General Programs',
    icon: BookOpen,
    category: 'General'
  }, {
    name: 'Healthcare Programs',
    icon: Heart,
    category: 'Health'
  }, {
    name: 'Humanities Programs',
    icon: BookOpen,
    category: 'Humanities'
  }, {
    name: 'Journalism, Media, and Mass Communication Programs',
    icon: Newspaper,
    category: 'Media'
  }, {
    name: 'Language Programs',
    icon: MessageCircle,
    category: 'Languages'
  }, {
    name: 'Law Programs',
    icon: Scale,
    category: 'Law'
  }, {
    name: 'Life Sciences Programs',
    icon: Dna,
    category: 'Science'
  }, {
    name: 'Life Skills Programs',
    icon: Target,
    category: 'Personal Development'
  }, {
    name: 'Management Programs',
    icon: UserCheck,
    category: 'Business'
  }, {
    name: 'Marketing Programs',
    icon: Megaphone,
    category: 'Business'
  }, {
    name: 'Natural Sciences Programs',
    icon: Microscope,
    category: 'Science'
  }, {
    name: 'Performing Arts Programs',
    icon: Music,
    category: 'Creative'
  }, {
    name: 'Professional Programs',
    icon: Lightbulb,
    category: 'Professional'
  }, {
    name: 'Self-Improvement Programs',
    icon: Sparkles,
    category: 'Personal Development'
  }, {
    name: 'Social Science Programs',
    icon: Earth,
    category: 'Social Sciences'
  }, {
    name: 'Sport and Exercise Programs',
    icon: Activity,
    category: 'Sports'
  }, {
    name: 'Sustainability Programs',
    icon: Recycle,
    category: 'Environmental'
  }, {
    name: 'Technology Programs',
    icon: Monitor,
    category: 'Technology'
  }, {
    name: 'Test Preparation Programs',
    icon: FileText,
    category: 'Education'
  }, {
    name: 'Tourism and Hospitality Programs',
    icon: Hotel,
    category: 'Hospitality'
  }, {
    name: 'License and Training Programs',
    icon: GraduationCap,
    category: 'Professional'
  }, {
    name: 'Transportation and Logistics Programs',
    icon: Car,
    category: 'Transportation'
  }];
  const popularSubjects = ['Computer Science', 'Business Administration', 'Engineering', 'Medicine', 'Psychology', 'Arts & Design', 'Data Science', 'Marketing'];
  const locations = ['United States', 'United Kingdom', 'Germany', 'Canada', 'Australia', 'Netherlands', 'Sweden', 'Switzerland'];

  // Mega search categories for dropdown
  const megaSearchCategories = [{
    name: 'Degrees',
    icon: GraduationCap,
    description: 'Bachelor, Master, PhD programs'
  }, {
    name: 'Subjects',
    icon: BookOpen,
    description: 'Academic fields and disciplines'
  }, {
    name: 'Schools',
    icon: Building,
    description: 'Universities and institutions'
  }, {
    name: 'Scholarships',
    icon: Award,
    description: 'Financial aid and grants'
  }, {
    name: 'Articles',
    icon: FileText,
    description: 'Study guides and resources'
  }];
  const recentSearches = ['Engineering Degrees in Spain', 'Free Masters Programs', 'Erasmus Programs', 'Dual Masters in Europe'];
  const popularSearches = ['MBA in London', 'Computer Science PhD', 'Medicine in Germany', 'Online Masters'];

  // Close mega dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaSearchRef.current && !megaSearchRef.current.contains(event.target as Node)) {
        setShowMegaDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleCategorySelect = (category: any) => {
    // Toggle selection - if already selected, unselect it
    if (selectedCategory === category.name) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category.name);
    }
    setShowMegaDropdown(false);
  };
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  const handleStructuredSearch = () => {
    const queryParts = [];
    if (selectedSubject) queryParts.push(selectedSubject);
    if (selectedStructuredLocation) queryParts.push(`in ${selectedStructuredLocation}`);
    const query = queryParts.length > 0 ? queryParts.join(' ') : 'programs';
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const handlePopularSearchClick = (searchTerm: string) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };
  const handleSubjectClick = (subjectName: string) => {
    navigate(`/search?q=${encodeURIComponent(subjectName)}`);
  };
  const StructuredSearch = () => <div className="search-container p-6">
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
              {popularSubjects.map(subject => <SelectItem key={subject} value={subject.toLowerCase()}>
                  {subject}
                </SelectItem>)}
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
              {locations.map(location => <SelectItem key={location} value={location.toLowerCase()}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {location}
                  </div>
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleStructuredSearch}>
        <Search className="w-4 h-4 mr-2" />
        Search Programs
      </Button>
    </div>;
  const FreeTextSearch = () => <div className="search-container p-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input type="text" placeholder="Search for any program, university, or location..." className="pl-10 pr-4 py-3 text-lg" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={handleKeyPress} />
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-sm text-gray-600">Popular searches:</span>
        {['MBA in London', 'Computer Science PhD', 'Medicine in Germany', 'Online Masters'].map(term => <Badge key={term} variant="secondary" className="cursor-pointer hover:bg-accent hover:text-accent-foreground" onClick={() => handlePopularSearchClick(term)}>
            {term}
          </Badge>)}
      </div>
    </div>;
  const AmazonStyleSearch = () => <div className="search-container p-6">
      <div className="flex rounded-lg overflow-hidden border border-gray-300">
        <Select value={selectedDegree} onValueChange={setSelectedDegree}>
          <SelectTrigger className="w-20 md:w-32 border-0 border-r border-gray-300 rounded-none bg-gray-50">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            <SelectItem value="all">All Degrees</SelectItem>
            {degreeTypes.map(degree => <SelectItem key={degree.value} value={degree.value}>
                <div className="flex items-center gap-2">
                  <degree.icon className="w-4 h-4" />
                  {degree.label}
                </div>
              </SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex-1 relative">
          <Input type="text" placeholder="Search programs, universities, subjects..." className="border-0 rounded-none focus:ring-0 focus:border-transparent" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={handleKeyPress} />
        </div>
        <Button className="rounded-none px-6 text-accent-foreground bg-pink-800 hover:bg-pink-700" onClick={handleSearch}>
          <Search className="w-5 h-5" />
        </Button>
      </div>
      
      {/* Popular Searches Section */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-sm text-gray-600">Popular searches:</span>
        {['MBA in London', 'Computer Science PhD', 'Medicine in Germany', 'Online Masters'].map(term => <Badge key={term} variant="secondary" className="cursor-pointer hover:bg-accent hover:text-accent-foreground" onClick={() => handlePopularSearchClick(term)}>
            {term}
          </Badge>)}
      </div>
      
      {/* Browse by Subject Section */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-4">Browse by Subject</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
          {subjects.map(subject => <Card key={subject.name} className="cursor-pointer hover:scale-105 transition-transform search-card" onClick={() => handleSubjectClick(subject.name)}>
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
            </Card>)}
        </div>
      </div>
    </div>;
  const VisualSearch = () => <div className="search-container p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Find Your Perfect Program</h3>
        <p className="text-gray-600">Start by selecting your degree type, then explore subjects</p>
      </div>
      
      {/* Degree-First Search Bar */}
      <div className="flex rounded-lg overflow-hidden border border-gray-300 mb-6">
        <Select value={selectedDegree} onValueChange={setSelectedDegree}>
          <SelectTrigger className="w-56 border-0 border-r border-gray-300 rounded-none bg-gray-50">
            <SelectValue placeholder="Select Degree Type" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg">
            <SelectItem value="all">All Degree Types</SelectItem>
            {degreeTypes.map(degree => <SelectItem key={degree.value} value={degree.value}>
                <div className="flex items-center gap-2">
                  <degree.icon className="w-4 h-4" />
                  {degree.label}
                </div>
              </SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex-1 relative">
          <Input type="text" placeholder="Search subjects, universities, locations..." className="border-0 rounded-none focus:ring-0 focus:border-transparent" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={handleKeyPress} />
        </div>
        <Button className="rounded-none px-6 bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleSearch}>
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {/* Degree Type Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        {degreeTypes.map(degree => <Card key={degree.value} className={`cursor-pointer hover:scale-105 transition-transform search-card ${selectedDegree === degree.value ? 'ring-2 ring-primary' : ''}`} onClick={() => setSelectedDegree(degree.value)}>
            <CardContent className="p-4">
              <div className="mb-2 text-center text-gray-600">
                <degree.icon className="w-8 h-8 mx-auto" />
              </div>
              <h4 className="font-semibold text-center text-sm">{degree.label}</h4>
            </CardContent>
          </Card>)}
      </div>

      {/* Subject Categories with Icons */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-3">Browse by Subject</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
          {subjects.map(subject => <Card key={subject.name} className="cursor-pointer hover:scale-105 transition-transform search-card" onClick={() => handleSubjectClick(subject.name)}>
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
            </Card>)}
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
    </div>;
  const MegaSearch = () => (
    <div className="search-container p-6" ref={megaSearchRef}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Search Everything</h3>
        <p className="text-gray-600">Find programs, schools, scholarships and more</p>
      </div>
      
      {/* Main Search Bar - NO event handlers that interfere with typing */}
      <div className="relative mb-6">
        <div className="flex rounded-lg overflow-hidden border border-gray-300">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              ref={megaInputRef}
              type="text" 
              placeholder={selectedCategory && selectedCategory !== 'all' ? `Search in ${selectedCategory}...` : "Look for programs, schools, scholarships, and more"} 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4 py-3 text-lg border-0 rounded-none focus:ring-0 focus:border-transparent"
            />
            {selectedCategory && selectedCategory !== 'all' && (
              <Badge className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-100 text-blue-800">
                {selectedCategory}
              </Badge>
            )}
          </div>
          <Button className="rounded-none px-6 text-white bg-accent hover:bg-accent/90" onClick={handleSearch}>
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* Enhanced Mega Dropdown - Only shown when manually toggled */}
        {showMegaDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl z-[9999] max-h-96 overflow-y-auto">
            <div className="p-4">
              {/* Search Types - Chip Layout */}
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
                      onClick={() => handleCategorySelect(type)}
                    >
                      <type.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{type.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Searches - Compact List */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Recent searches</h4>
                <div className="space-y-1">
                  {recentSearches.map((search) => (
                    <div 
                      key={search}
                      className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer rounded text-sm"
                      onClick={() => handlePopularSearchClick(search)}
                    >
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{search}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Searches - Badge Layout */}
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Popular searches</h4>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search) => (
                    <Badge 
                      key={search}
                      variant="secondary" 
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground text-xs px-2 py-1"
                      onClick={() => handlePopularSearchClick(search)}
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

      {/* Quick Access - Single Line with Chips */}
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
              onClick={() => handleCategorySelect(type)}
            >
              <type.icon className="w-3 h-3" />
              <span className="font-medium">{type.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Toggle Button for Dropdown */}
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

  // Search implementation options for the selector
  const searchImplementations = [{
    id: 'structured',
    name: 'Current Implementation',
    description: 'Dropdown-based structured search'
  }, {
    id: 'freetext',
    name: 'Free Text Search',
    description: 'Google-style text input with suggestions'
  }, {
    id: 'amazon',
    name: 'Category + Search',
    description: 'Amazon-style category dropdown with search'
  }, {
    id: 'visual',
    name: 'Visual Discovery',
    description: 'Category-based visual exploration'
  }, {
    id: 'mega',
    name: 'Mega Search',
    description: 'Combined category selection with free text search'
  }];
  return <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero section with background image */}
      <section className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{
      backgroundImage: "url('/lovable-uploads/63335a7f-43dc-43ec-a36d-101c26e52820.png')",
      minHeight: "200px"
    }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Search Experience Prototype</h1>
          <p className="text-lg text-primary/80">Explore different search implementations</p>
        </div>
      </section>

      {/* Search Type Selector */}
      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">Choose Your Search Experience</h2>
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {searchImplementations.map(type => <Card key={type.id} className={`cursor-pointer transition-all ${activeSearch === type.id ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'}`} onClick={() => setActiveSearch(type.id)}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{type.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Active Search Interface */}
        <div className="max-w-4xl mx-auto">
          {activeSearch === 'structured' && <StructuredSearch />}
          {activeSearch === 'freetext' && <FreeTextSearch />}
          {activeSearch === 'amazon' && <AmazonStyleSearch />}
          {activeSearch === 'visual' && <VisualSearch />}
          {activeSearch === 'mega' && <MegaSearch />}
        </div>

        {/* Features Comparison */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Implementation Comparison</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[{
            type: 'Current Implementation',
            pros: ['Precise filtering', 'Database-friendly', 'Clear structure'],
            cons: ['Limited flexibility', 'Requires exact matches', 'Less discovery'],
            best: 'Users who know exactly what they want'
          }, {
            type: 'Free Text Search',
            pros: ['Natural language', 'Flexible queries', 'Quick to use'],
            cons: ['Requires smart matching', 'Can be ambiguous', 'More complex backend'],
            best: 'Quick exploration and broad searches'
          }, {
            type: 'Category + Search',
            pros: ['Combines structure & flexibility', 'Familiar UX pattern', 'Good for browsing'],
            cons: ['More complex UI', 'Category maintenance', 'Two-step process'],
            best: 'Mixed user intentions and behaviors'
          }, {
            type: 'Visual Discovery',
            pros: ['Engaging interface', 'Great for exploration', 'Mobile-friendly'],
            cons: ['Less precise', 'Harder to implement', 'Limited text search'],
            best: 'New users and mobile browsing'
          }, {
            type: 'Mega Search',
            pros: ['Category-aware search', 'Flexible discovery', 'Teams-like UX'],
            cons: ['Complex implementation', 'Learning curve', 'Requires good categorization'],
            best: 'Power users and cross-category exploration'
          }].map((item, index) => <Card key={index} className="search-card">
                <CardHeader>
                  <CardTitle className="text-lg">{item.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-teal-600">Pros</h4>
                    <ul className="text-sm space-y-1">
                      {item.pros.map((pro, i) => <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {pro}
                        </li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-pink-600">Considerations</h4>
                    <ul className="text-sm space-y-1">
                      {item.cons.map((con, i) => <li key={i} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          {con}
                        </li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-600">Best For</h4>
                    <p className="text-sm">{item.best}</p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>
    </div>;
};
export default Index;
