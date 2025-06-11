
import React from 'react';
import { Search, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { subjects, degreeTypes, popularSearches, megaSearchCategories, recentSearches } from './searchData';

interface SearchContentProps {
  activeTab: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDegree: string;
  setSelectedDegree: (degree: string) => void;
  selectedCategory: string;
  showMegaDropdown: boolean;
  megaInputRef: React.RefObject<HTMLInputElement>;
  handleSearch: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleSubjectClick: (subjectName: string) => void;
  handlePopularSearchClick: (searchTerm: string) => void;
  handleMegaInputFocus: () => void;
  handleCategorySelect: (category: any) => void;
}

export const SearchContent: React.FC<SearchContentProps> = ({
  activeTab,
  searchQuery,
  setSearchQuery,
  selectedDegree,
  setSelectedDegree,
  selectedCategory,
  showMegaDropdown,
  megaInputRef,
  handleSearch,
  handleKeyPress,
  handleSubjectClick,
  handlePopularSearchClick,
  handleMegaInputFocus,
  handleCategorySelect
}) => {
  const renderSearchContent = () => {
    switch (activeTab) {
      case 'structured':
        return (
          <div className="p-6 space-y-4">
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
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search Programs
            </Button>
          </div>
        );

      case 'freetext':
        return (
          <div className="p-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                type="text" 
                placeholder="Search for any program, university, or location..." 
                className="pl-10 pr-4 py-3 text-lg" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                onKeyPress={handleKeyPress} 
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Popular searches:</span>
              {popularSearches.map(term => 
                <Badge 
                  key={term} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground" 
                  onClick={() => handlePopularSearchClick(term)}
                >
                  {term}
                </Badge>
              )}
            </div>
          </div>
        );

      case 'amazon':
        return (
          <div className="p-6">
            {/* Search Bar */}
            <div className="flex rounded-lg overflow-hidden border border-gray-300 mb-6">
              <Select value={selectedDegree} onValueChange={setSelectedDegree}>
                <SelectTrigger className="w-32 border-0 border-r border-gray-300 rounded-none bg-gray-50">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  <SelectItem value="all">All Degrees</SelectItem>
                  {degreeTypes.map(degree => 
                    <SelectItem key={degree.value} value={degree.value}>
                      <div className="flex items-center gap-2">
                        <degree.icon className="w-4 h-4" />
                        {degree.label}
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <div className="flex-1 relative">
                <Input 
                  type="text" 
                  placeholder="Search programs, universities, subjects..." 
                  className="border-0 rounded-none focus:ring-0 focus:border-transparent" 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  onKeyPress={handleKeyPress} 
                />
              </div>
              <Button className="rounded-none px-6 text-white bg-primary hover:bg-primary/90" onClick={handleSearch}>
                <Search className="w-5 h-5" />
              </Button>
            </div>

            {/* Popular Searches */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600 font-medium">Popular searches:</span>
                {popularSearches.map(term => 
                  <Badge 
                    key={term} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground px-3 py-1" 
                    onClick={() => handlePopularSearchClick(term)}
                  >
                    {term}
                  </Badge>
                )}
              </div>
            </div>

            {/* Browse by Subject */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Browse by Subject</h4>
              <div className="grid grid-cols-3 gap-4 max-h-80 overflow-y-auto">
                {subjects.map(subject => 
                  <Card 
                    key={subject.name} 
                    className="cursor-pointer hover:scale-105 transition-transform border border-gray-200" 
                    onClick={() => handleSubjectClick(subject.name)}
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
                )}
              </div>
            </div>
          </div>
        );

      case 'visual':
        return (
          <div className="p-6">
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
                  {degreeTypes.map(degree => 
                    <SelectItem key={degree.value} value={degree.value}>
                      <div className="flex items-center gap-2">
                        <degree.icon className="w-4 h-4" />
                        {degree.label}
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <div className="flex-1 relative">
                <Input 
                  type="text" 
                  placeholder="Search subjects, universities, locations..." 
                  className="border-0 rounded-none focus:ring-0 focus:border-transparent" 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  onKeyPress={handleKeyPress} 
                />
              </div>
              <Button className="rounded-none px-6 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleSearch}>
                <Search className="w-5 h-5" />
              </Button>
            </div>

            {/* Degree Type Cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
              {degreeTypes.map(degree => 
                <Card 
                  key={degree.value} 
                  className={`cursor-pointer hover:scale-105 transition-transform ${selectedDegree === degree.value ? 'ring-2 ring-primary' : ''}`} 
                  onClick={() => setSelectedDegree(degree.value)}
                >
                  <CardContent className="p-4">
                    <div className="mb-2 text-center text-gray-600">
                      <degree.icon className="w-8 h-8 mx-auto" />
                    </div>
                    <h4 className="font-semibold text-center text-sm">{degree.label}</h4>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Subject Categories */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-3">Browse by Subject</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {subjects.map(subject => 
                  <Card 
                    key={subject.name} 
                    className="cursor-pointer hover:scale-105 transition-transform" 
                    onClick={() => handleSubjectClick(subject.name)}
                  >
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
                )}
              </div>
            </div>
          </div>
        );

      case 'mega':
        return (
          <div className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Mega Search</h3>
              <p className="text-gray-600">Search across all categories or select a specific one</p>
            </div>
            
            {/* Mega Search Bar with Category Dropdown */}
            <div className="relative mb-6">
              <div className="flex rounded-lg overflow-hidden border border-gray-300">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input 
                    ref={megaInputRef} 
                    type="text" 
                    placeholder={selectedCategory && selectedCategory !== 'all' ? `Search in ${megaSearchCategories.find(c => c.name === selectedCategory)?.name}...` : "Search programs, universities, subjects..."} 
                    className="pl-10 pr-4 py-3 text-lg border-0 rounded-none focus:ring-0 focus:border-transparent" 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)} 
                    onFocus={handleMegaInputFocus} 
                    onKeyPress={handleKeyPress} 
                  />
                  {selectedCategory && selectedCategory !== 'all' && 
                    <Badge className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary/10 text-primary border-primary">
                      {megaSearchCategories.find(c => c.name === selectedCategory)?.name}
                    </Badge>
                  }
                </div>
                <Button className="rounded-none px-6 text-white bg-primary hover:bg-primary/90" onClick={handleSearch}>
                  <Search className="w-5 h-5" />
                </Button>
              </div>

              {/* Enhanced Category Dropdown with higher z-index */}
              {showMegaDropdown && 
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl z-[999999] max-h-80 overflow-y-auto">
                  <div className="p-4">
                    {/* Search Types - Chip Layout */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Search in</h4>
                      <div className="flex flex-wrap gap-2">
                        {megaSearchCategories.map(category => 
                          <div 
                            key={category.name} 
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border cursor-pointer transition-all hover:shadow-md ${selectedCategory === category.name ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 bg-white hover:border-gray-300'}`} 
                            onClick={() => handleCategorySelect(category)}
                          >
                            <category.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{category.name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Recent Searches - Compact List */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Recent searches</h4>
                      <div className="space-y-1">
                        {recentSearches.map(search => 
                          <div 
                            key={search} 
                            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer rounded text-sm" 
                            onClick={() => handlePopularSearchClick(search)}
                          >
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span>{search}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Popular Searches - Badge Layout */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Popular searches</h4>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map(search => 
                          <Badge 
                            key={search} 
                            variant="secondary" 
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs px-2 py-1" 
                            onClick={() => handlePopularSearchClick(search)}
                          >
                            {search}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>

            {/* Quick Access - Single Line with Chips */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Quick Access:</span>
              <div className="flex flex-wrap gap-2">
                {megaSearchCategories.map(category => 
                  <div 
                    key={category.name} 
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition-all hover:shadow-md text-xs ${selectedCategory === category.name ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 bg-white hover:border-gray-300'}`} 
                    onClick={() => handleCategorySelect(category)}
                  >
                    <category.icon className="w-3 h-3" />
                    <span className="font-medium">{category.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderSearchContent();
};
