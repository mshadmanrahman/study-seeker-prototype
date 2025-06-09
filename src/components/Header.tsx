
import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, User, ChevronDown, BookOpen, GraduationCap, Award, Target, Microscope, FileText, MapPin, Clock, Star, X, Monitor, Palette, Heart, Calculator, Briefcase, Camera, Music, Settings, Building, Plane, Hammer, Scissors, TrendingUp, Users, Zap, Cog, Leaf, Shirt, DollarSign, UtensilsCrossed, Newspaper, MessageCircle, Scale, Dna, Lightbulb, UserCheck, Megaphone, Activity, Recycle, Hotel, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const subjects = [
    { name: 'Administration Programs', icon: Settings, category: 'Business' },
    { name: 'Architecture Programs', icon: Building, category: 'Design' },
    { name: 'Art Programs', icon: Palette, category: 'Creative' },
    { name: 'Aviation Programs', icon: Plane, category: 'Transportation' },
    { name: 'Business Programs', icon: Briefcase, category: 'Business' },
    { name: 'Construction Programs', icon: Hammer, category: 'Engineering' },
    { name: 'Cosmetology Programs', icon: Scissors, category: 'Personal Care' },
    { name: 'Design Programs', icon: Target, category: 'Creative' },
    { name: 'Economic Programs', icon: TrendingUp, category: 'Business' },
    { name: 'Education Programs', icon: Users, category: 'Education' },
    { name: 'Energy Programs', icon: Zap, category: 'Engineering' },
    { name: 'Engineering Programs', icon: Cog, category: 'Engineering' },
  ];

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
              <div className="absolute top-0 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-[800px] -ml-48">
                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Search Programs</h3>
                  <button
                    onClick={handleCloseSearch}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-6">
                  {/* Search Bar */}
                  <div className="flex rounded-lg overflow-hidden border border-gray-300 mb-6">
                    <div className="w-24 border-r border-gray-300 bg-gray-50 flex items-center justify-center text-xs text-gray-600">
                      All
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </div>
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder="Search programs, universities, subjects..."
                        className="border-0 rounded-none focus:ring-0 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button className="rounded-none px-6 bg-pink-800 text-white hover:bg-pink-700">
                      <Search className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Popular Searches */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-sm text-gray-600 font-medium">Popular searches:</span>
                      {popularSearches.map(term => (
                        <Badge
                          key={term}
                          variant="secondary"
                          className="cursor-pointer hover:bg-accent hover:text-accent-foreground px-3 py-1"
                          onClick={() => setSearchQuery(term)}
                        >
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Browse by Subject */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Browse by Subject</h4>
                    <div className="grid grid-cols-3 gap-4 max-h-80 overflow-y-auto">
                      {subjects.map(subject => (
                        <Card 
                          key={subject.name} 
                          className="cursor-pointer hover:scale-105 transition-transform border border-gray-200"
                          onClick={() => setSearchQuery(subject.name)}
                        >
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
                        </Card>
                      ))}
                    </div>
                  </div>
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
