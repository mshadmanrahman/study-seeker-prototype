import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, Globe, GraduationCap, Calendar, BookOpen, Award, Building, ChevronDown, X, Star, User, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';

interface SearchResult {
  id: string;
  type: 'program' | 'article' | 'scholarship' | 'school';
  title: string;
  description: string;
  location?: string;
  duration?: string;
  language?: string;
  deadline?: string;
  degreeType?: string;
  fieldOfStudy?: string;
  studyPace?: string;
  studyFormat?: string;
  tuitionFee?: string;
  rating?: number;
  image?: string;
  institution?: string;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    type: 'program',
    title: 'Master of Computer Science',
    description: 'Comprehensive program covering advanced computing concepts, algorithms, and software engineering.',
    location: 'MIT, Boston, USA',
    duration: '2 years',
    language: 'English',
    deadline: '2024-12-15',
    degreeType: 'Masters',
    fieldOfStudy: 'Computer Science',
    studyPace: 'Full-time',
    studyFormat: 'On-campus',
    tuitionFee: '$55,000/year',
    rating: 4.8,
    institution: 'Massachusetts Institute of Technology'
  },
  {
    id: '2',
    type: 'scholarship',
    title: 'Merit-Based Excellence Scholarship',
    description: 'Full tuition scholarship for outstanding international students in STEM fields.',
    location: 'Stanford, USA',
    deadline: '2024-11-30',
    fieldOfStudy: 'STEM',
    tuitionFee: '$75,000 coverage',
    institution: 'Stanford University'
  },
  {
    id: '3',
    type: 'program',
    title: 'Bachelor of Business Administration',
    description: 'Comprehensive business program with focus on leadership and entrepreneurship.',
    location: 'London, UK',
    duration: '3 years',
    language: 'English',
    deadline: '2025-01-15',
    degreeType: 'Bachelors',
    fieldOfStudy: 'Business',
    studyPace: 'Full-time',
    studyFormat: 'Hybrid',
    tuitionFee: '£25,000/year',
    rating: 4.5,
    institution: 'London Business School'
  },
  {
    id: '4',
    type: 'article',
    title: 'Study a Masters in Europe: The Complete Guide',
    description: 'Everything you need to know about pursuing a Masters degree in Europe, including costs, application requirements, and the best programs available.',
    location: 'Europe',
    fieldOfStudy: 'Masters Programs'
  },
  {
    id: '5',
    type: 'article',
    title: 'Scholarship Opportunities for International Students',
    description: 'Discover the best scholarships available for international students, including merit-based, need-based, and country-specific funding options.',
    fieldOfStudy: 'Scholarships'
  }
];

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>(mockResults);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(mockResults);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedDegreeTypes, setSelectedDegreeTypes] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedPaces, setSelectedPaces] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('relevance');

  const degreeTypes = ['Bachelors', 'Masters', 'PhD', 'Certificate', 'Diploma'];
  const fieldsOfStudy = ['Computer Science', 'Business', 'Engineering', 'Medicine', 'Arts', 'Law', 'STEM'];
  const locations = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Netherlands'];
  const durations = ['1 year', '2 years', '3 years', '4 years', '5+ years'];
  const studyPaces = ['Full-time', 'Part-time', 'Flexible'];
  const languages = ['English', 'German', 'French', 'Spanish', 'Dutch'];
  const studyFormats = ['On-campus', 'Online', 'Hybrid'];

  // Apply filters
  useEffect(() => {
    let filtered = results.filter(result => {
      if (selectedDegreeTypes.length > 0 && result.degreeType && !selectedDegreeTypes.includes(result.degreeType)) return false;
      if (selectedFields.length > 0 && result.fieldOfStudy && !selectedFields.includes(result.fieldOfStudy)) return false;
      if (selectedLocations.length > 0 && result.location && !selectedLocations.some(loc => result.location?.includes(loc))) return false;
      if (selectedDurations.length > 0 && result.duration && !selectedDurations.includes(result.duration)) return false;
      if (selectedPaces.length > 0 && result.studyPace && !selectedPaces.includes(result.studyPace)) return false;
      if (selectedLanguages.length > 0 && result.language && !selectedLanguages.includes(result.language)) return false;
      if (selectedFormats.length > 0 && result.studyFormat && !selectedFormats.includes(result.studyFormat)) return false;
      return true;
    });

    // Apply sorting
    if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'deadline') {
      filtered.sort((a, b) => {
        if (!a.deadline || !b.deadline) return 0;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    }

    setFilteredResults(filtered);
  }, [results, selectedDegreeTypes, selectedFields, selectedLocations, selectedDurations, selectedPaces, selectedLanguages, selectedFormats, sortBy]);

  const clearAllFilters = () => {
    setSelectedDegreeTypes([]);
    setSelectedFields([]);
    setSelectedLocations([]);
    setSelectedDurations([]);
    setSelectedPaces([]);
    setSelectedLanguages([]);
    setSelectedFormats([]);
  };

  const getActiveFiltersCount = () => {
    return selectedDegreeTypes.length + selectedFields.length + selectedLocations.length + 
           selectedDurations.length + selectedPaces.length + selectedLanguages.length + selectedFormats.length;
  };

  const getResultTypeIcon = (type: string) => {
    switch (type) {
      case 'program': return <GraduationCap className="w-4 h-4" />;
      case 'scholarship': return <Award className="w-4 h-4" />;
      case 'article': return <BookOpen className="w-4 h-4" />;
      case 'school': return <Building className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const FilterSection = ({ title, options, selected, onSelectionChange }: {
    title: string;
    options: string[];
    selected: string[];
    onSelectionChange: (values: string[]) => void;
  }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          {title}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${title}-${option}`}
                  checked={selected.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onSelectionChange([...selected, option]);
                    } else {
                      onSelectionChange(selected.filter(item => item !== option));
                    }
                  }}
                />
                <label
                  htmlFor={`${title}-${option}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ProgramCard = ({ result }: { result: SearchResult }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex">
        {/* Left side - Campus image */}
        <div className="w-48 h-48 flex-shrink-0">
          <div className="w-full h-full relative">
            <img 
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop" 
              alt={`${result.institution} campus`} 
              className="w-full h-full object-cover" 
            />
            {/* Institution logo overlay */}
            <div className="absolute bottom-3 left-3">
              <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Program details */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start h-full">
            <div className="flex-1">
              {/* Institution name */}
              <p className="text-sm text-gray-600 mb-1">{result.institution}</p>
              
              {/* Program title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {result.title}
              </h3>
              
              {/* Location */}
              <p className="text-sm text-gray-600 mb-4">{result.location}</p>
              
              {/* Program details */}
              <div className="flex flex-wrap gap-4 mb-4">
                {result.degreeType && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    {result.degreeType}
                  </div>
                )}
                {result.duration && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {result.duration}
                  </div>
                )}
                {result.studyFormat && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {result.studyFormat}
                  </div>
                )}
                {result.language && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    {result.language}
                  </div>
                )}
              </div>
              
              {/* Description */}
              <p className="text-sm text-gray-700 line-clamp-2 mb-4">
                {result.description}
              </p>
            </div>
            
            {/* Right side - Price and action */}
            <div className="text-right ml-6">
              {result.tuitionFee && (
                <p className="text-lg font-semibold text-green-600 mb-4">
                  {result.tuitionFee}
                </p>
              )}
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                Read more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const ArticleCard = ({ result }: { result: SearchResult }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex gap-4 p-4">
        {/* Left side - Article image */}
        <div className="w-24 h-20 flex-shrink-0 relative">
          <img 
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop" 
            alt="Article image" 
            className="w-full h-full object-cover rounded-lg" 
          />
          {/* Article icon overlay */}
          <div className="absolute bottom-1 right-1">
            <div className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
              <BookOpen className="w-3 h-3 text-blue-600" />
            </div>
          </div>
        </div>
        
        {/* Right side - Article content */}
        <div className="flex-1 min-w-0">
          {/* Publication date */}
          <p className="text-xs text-gray-500 mb-2">Dec 2024</p>
          
          {/* Article title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {result.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {result.description}
          </p>
          
          {/* Metadata footer */}
          <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
            {result.fieldOfStudy && (
              <div className="flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                <span>{result.fieldOfStudy}</span>
              </div>
            )}
            {result.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{result.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const ScholarshipCard = ({ result }: { result: SearchResult }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex gap-4 p-4">
        {/* Left side - Scholarship image */}
        <div className="w-24 h-20 flex-shrink-0 relative">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop" 
            alt="Scholarship image" 
            className="w-full h-full object-cover rounded-lg" 
          />
          {/* Scholarship icon overlay */}
          <div className="absolute bottom-1 right-1">
            <div className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
              <Award className="w-3 h-3 text-yellow-600" />
            </div>
          </div>
        </div>
        
        {/* Right side - Scholarship content */}
        <div className="flex-1 min-w-0">
          {/* Publication date */}
          <p className="text-xs text-gray-500 mb-2">Dec 2024</p>
          
          {/* Scholarship title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {result.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {result.description}
          </p>
          
          {/* Metadata footer */}
          <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
            {result.fieldOfStudy && (
              <div className="flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                <span>{result.fieldOfStudy}</span>
              </div>
            )}
            {result.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{result.location}</span>
              </div>
            )}
            {result.deadline && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Deadline: {new Date(result.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use shared Header component */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-80 flex-shrink-0`}>
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <X className="w-4 h-4" />
                </Button>
                {getActiveFiltersCount() > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-blue-600"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <FilterSection
                title="Degree Type"
                options={degreeTypes}
                selected={selectedDegreeTypes}
                onSelectionChange={setSelectedDegreeTypes}
              />

              <FilterSection
                title="Field of Study"
                options={fieldsOfStudy}
                selected={selectedFields}
                onSelectionChange={setSelectedFields}
              />

              <FilterSection
                title="Location"
                options={locations}
                selected={selectedLocations}
                onSelectionChange={setSelectedLocations}
              />

              <FilterSection
                title="Duration"
                options={durations}
                selected={selectedDurations}
                onSelectionChange={setSelectedDurations}
              />

              <FilterSection
                title="Study Pace"
                options={studyPaces}
                selected={selectedPaces}
                onSelectionChange={setSelectedPaces}
              />

              <FilterSection
                title="Language"
                options={languages}
                selected={selectedLanguages}
                onSelectionChange={setSelectedLanguages}
              />

              <FilterSection
                title="Study Format"
                options={studyFormats}
                selected={selectedFormats}
                onSelectionChange={setSelectedFormats}
              />
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Search Results
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {filteredResults.length} results found
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
                </Button>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="deadline">Application Deadline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {getActiveFiltersCount() > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedDegreeTypes.map(type => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      {type}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSelectedDegreeTypes(selectedDegreeTypes.filter(t => t !== type))}
                      />
                    </Badge>
                  ))}
                  {selectedFields.map(field => (
                    <Badge key={field} variant="secondary" className="flex items-center gap-1">
                      {field}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSelectedFields(selectedFields.filter(f => f !== field))}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            <div className="space-y-6">
              {filteredResults.map((result) => (
                <div key={result.id}>
                  {result.type === 'program' && <ProgramCard result={result} />}
                  {result.type === 'article' && <ArticleCard result={result} />}
                  {result.type === 'scholarship' && <ScholarshipCard result={result} />}
                </div>
              ))}
            </div>

            {filteredResults.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
