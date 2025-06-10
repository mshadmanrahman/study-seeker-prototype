import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, User, ChevronDown, BookOpen, GraduationCap, Award, Target, Microscope, FileText, MapPin, Clock, Star, X, Monitor, Palette, Heart, Calculator, Briefcase, Camera, Music, Settings, Building, Plane, Hammer, Scissors, TrendingUp, Users, Zap, Cog, Leaf, Shirt, DollarSign, UtensilsCrossed, Newspaper, MessageCircle, Scale, Dna, Lightbulb, UserCheck, Megaphone, Activity, Recycle, Hotel, Car, Home, Sparkles, Earth } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('amazon');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [showMegaDropdown, setShowMegaDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const megaInputRef = useRef<HTMLInputElement>(null);
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
  const popularSearches = ['MBA in London', 'Computer Science PhD', 'Medicine in Germany', 'Online Masters'];

  // Get unique categories for mega search
  const searchCategories = [{
    name: 'All Programs',
    icon: BookOpen,
    value: 'all'
  }, ...Array.from(new Set(subjects.map(s => s.category))).map(category => ({
    name: category,
    icon: subjects.find(s => s.category === category)?.icon || BookOpen,
    value: category.toLowerCase().replace(/\s+/g, '-')
  }))];

  // Close expanded search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setShowMegaDropdown(false);
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
    setShowMegaDropdown(false);
  };
  const handleMegaInputFocus = () => {
    setShowMegaDropdown(true);
  };
  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category.value);
    setShowMegaDropdown(false);
    if (megaInputRef.current) {
      megaInputRef.current.focus();
    }
  };
  const renderSearchContent = () => {
    switch (activeTab) {
      case 'structured':
        return <div className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you want to study?
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="business">Business Administration</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                    <SelectItem value="psychology">Psychology</SelectItem>
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
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Search className="w-4 h-4 mr-2" />
              Search Programs
            </Button>
          </div>;
      case 'freetext':
        return <div className="p-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input type="text" placeholder="Search for any program, university, or location..." className="pl-10 pr-4 py-3 text-lg" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Popular searches:</span>
              {popularSearches.map(term => <Badge key={term} variant="secondary" className="cursor-pointer hover:bg-accent hover:text-accent-foreground" onClick={() => setSearchQuery(term)}>
                  {term}
                </Badge>)}
            </div>
          </div>;
      case 'amazon':
        return <div className="p-6">
            {/* Search Bar */}
            <div className="flex rounded-lg overflow-hidden border border-gray-300 mb-6">
              <Select value={selectedDegree} onValueChange={setSelectedDegree}>
                <SelectTrigger className="w-32 border-0 border-r border-gray-300 rounded-none bg-gray-50">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
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
                <Input type="text" placeholder="Search programs, universities, subjects..." className="border-0 rounded-none focus:ring-0 focus:border-transparent" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <Button className="rounded-none px-6 text-white bg-primary hover:bg-teal-700">
                <Search className="w-5 h-5" />
              </Button>
            </div>

            {/* Popular Searches */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600 font-medium">Popular searches:</span>
                {popularSearches.map(term => <Badge key={term} variant="secondary" className="cursor-pointer hover:bg-accent hover:text-accent-foreground px-3 py-1" onClick={() => setSearchQuery(term)}>
                    {term}
                  </Badge>)}
              </div>
            </div>

            {/* Browse by Subject */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Browse by Subject</h4>
              <div className="grid grid-cols-3 gap-4 max-h-80 overflow-y-auto">
                {subjects.map(subject => <Card key={subject.name} className="cursor-pointer hover:scale-105 transition-transform border border-gray-200" onClick={() => setSearchQuery(subject.name)}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-gray-600 mt-1">
                          <subject.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900 leading-tight mb-1">
                            {subject.name}
                          </h4>
                          <p className="text-xs text-gray-500">{subject.category}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </div>
          </div>;
      case 'visual':
        return <div className="p-6">
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
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
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
                <Input type="text" placeholder="Search subjects, universities, locations..." className="border-0 rounded-none focus:ring-0 focus:border-transparent" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <Button className="rounded-none px-6 bg-accent text-accent-foreground hover:bg-accent/90">
                <Search className="w-5 h-5" />
              </Button>
            </div>

            {/* Degree Type Cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
              {degreeTypes.map(degree => <Card key={degree.value} className={`cursor-pointer hover:scale-105 transition-transform ${selectedDegree === degree.value ? 'ring-2 ring-primary' : ''}`} onClick={() => setSelectedDegree(degree.value)}>
                  <CardContent className="p-4">
                    <div className="mb-2 text-center text-gray-600">
                      <degree.icon className="w-8 h-8 mx-auto" />
                    </div>
                    <h4 className="font-semibold text-center text-sm">{degree.label}</h4>
                  </CardContent>
                </Card>)}
            </div>

            {/* Subject Categories */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-3">Browse by Subject</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {subjects.map(subject => <Card key={subject.name} className="cursor-pointer hover:scale-105 transition-transform">
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
          </div>;
      case 'mega':
        return <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Mega Search</h3>
              <p className="text-gray-600">Search across all categories or select a specific one</p>
            </div>
            
            {/* Mega Search Bar with Category Dropdown */}
            <div className="relative mb-6">
              <div className="flex rounded-lg overflow-hidden border border-gray-300">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input ref={megaInputRef} type="text" placeholder={selectedCategory && selectedCategory !== 'all' ? `Search in ${searchCategories.find(c => c.value === selectedCategory)?.name}...` : "Search programs, universities, subjects..."} className="pl-10 pr-4 py-3 text-lg border-0 rounded-none focus:ring-0 focus:border-transparent" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onFocus={handleMegaInputFocus} />
                  {selectedCategory && selectedCategory !== 'all' && <Badge className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-100 text-blue-800">
                      {searchCategories.find(c => c.value === selectedCategory)?.name}
                    </Badge>}
                </div>
                <Button className="rounded-none px-6 text-white bg-teal-700 hover:bg-teal-600">
                  <Search className="w-5 h-5" />
                </Button>
              </div>

              {/* Category Dropdown */}
              {showMegaDropdown && <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  <div className="p-2">
                    <div className="text-xs text-gray-500 uppercase font-semibold mb-2 px-2">Search in:</div>
                    {searchCategories.map(category => <div key={category.value} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded" onClick={() => handleCategorySelect(category)}>
                        <category.icon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">{category.name}</span>
                        {selectedCategory === category.value && <div className="ml-auto w-2 h-2 rounded-full bg-teal-600"></div>}
                      </div>)}
                  </div>
                </div>}
            </div>

            {/* Popular Searches */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600 font-medium">Popular searches:</span>
                {popularSearches.map(term => <Badge key={term} variant="secondary" className="cursor-pointer hover:bg-accent hover:text-accent-foreground px-3 py-1" onClick={() => setSearchQuery(term)}>
                    {term}
                  </Badge>)}
              </div>
            </div>

            {/* Quick Category Access */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Category Access</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {searchCategories.slice(1, 13).map(category => <Card key={category.value} className={`cursor-pointer hover:scale-105 transition-transform ${selectedCategory === category.value ? 'ring-2 ring-purple-500' : ''}`} onClick={() => handleCategorySelect(category)}>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <category.icon className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                        <h4 className="font-medium text-sm">{category.name}</h4>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/lovable-uploads/f9cd9d53-d676-4f5b-a143-85d026ced35b.png" alt="Educations.com Logo" className="h-8" />
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
            <div className="flex rounded-lg overflow-hidden border border-gray-300 cursor-pointer hover:border-gray-400 transition-colors" onClick={handleSearchClick}>
              <div className="flex-1 px-3 py-2 bg-white">
                <span className="text-gray-500">Search for subject, school or location</span>
              </div>
              <div className="px-4 bg-primary text-white flex items-center">
                <Search className="w-4 h-4" />
              </div>
            </div>
            
            {isExpanded && <div className="absolute top-12 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-[900px] -ml-60">
                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                  <div className="flex space-x-4">
                    <button onClick={() => setActiveTab('structured')} className={`px-3 py-1 text-sm font-medium rounded ${activeTab === 'structured' ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:text-gray-900'}`}>
                      Structured
                    </button>
                    <button onClick={() => setActiveTab('freetext')} className={`px-3 py-1 text-sm font-medium rounded ${activeTab === 'freetext' ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:text-gray-900'}`}>
                      Free Text
                    </button>
                    <button onClick={() => setActiveTab('amazon')} className={`px-3 py-1 text-sm font-medium rounded ${activeTab === 'amazon' ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:text-gray-900'}`}>
                      Category + Search
                    </button>
                    <button onClick={() => setActiveTab('visual')} className={`px-3 py-1 text-sm font-medium rounded ${activeTab === 'visual' ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:text-gray-900'}`}>
                      Visual
                    </button>
                    <button onClick={() => setActiveTab('mega')} className={`px-3 py-1 text-sm font-medium rounded ${activeTab === 'mega' ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:text-gray-900'}`}>
                      Mega Search
                    </button>
                  </div>
                  <button onClick={handleCloseSearch} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {renderSearchContent()}
              </div>}
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
    </header>;
};
export default Header;