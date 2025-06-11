
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import StructuredSearch from '@/components/search/StructuredSearch';
import FreeTextSearch from '@/components/search/FreeTextSearch';
import AmazonStyleSearch from '@/components/search/AmazonStyleSearch';
import VisualSearch from '@/components/search/VisualSearch';
import MegaSearch from '@/components/search/MegaSearch';
import { searchImplementations } from '@/constants/searchData';

const Index = () => {
  const navigate = useNavigate();
  const [activeSearch, setActiveSearch] = useState('structured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showMegaDropdown, setShowMegaDropdown] = useState(false);

  // New state for structured search
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedStructuredLocation, setSelectedStructuredLocation] = useState('');

  const handleCategorySelect = (category: any) => {
    if (selectedCategory === category.name) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category.name);
    }
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{
        backgroundImage: "url('/lovable-uploads/63335a7f-43dc-43ec-a36d-101c26e52820.png')",
        minHeight: "200px"
      }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Search Experience Prototype</h1>
          <p className="text-lg text-primary/80">Explore different search implementations</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">Choose Your Search Experience</h2>
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {searchImplementations.map(type => (
              <Card 
                key={type.id} 
                className={`cursor-pointer transition-all ${activeSearch === type.id ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'}`} 
                onClick={() => setActiveSearch(type.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{type.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {activeSearch === 'structured' && (
            <StructuredSearch
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              selectedStructuredLocation={selectedStructuredLocation}
              setSelectedStructuredLocation={setSelectedStructuredLocation}
              onSearch={handleStructuredSearch}
            />
          )}
          {activeSearch === 'freetext' && (
            <FreeTextSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onKeyPress={handleKeyPress}
              onPopularSearchClick={handlePopularSearchClick}
            />
          )}
          {activeSearch === 'amazon' && (
            <AmazonStyleSearch
              selectedDegree={selectedDegree}
              setSelectedDegree={setSelectedDegree}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onKeyPress={handleKeyPress}
              onSearch={handleSearch}
              onPopularSearchClick={handlePopularSearchClick}
              onSubjectClick={handleSubjectClick}
            />
          )}
          {activeSearch === 'visual' && (
            <VisualSearch
              selectedDegree={selectedDegree}
              setSelectedDegree={setSelectedDegree}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onKeyPress={handleKeyPress}
              onSearch={handleSearch}
              onSubjectClick={handleSubjectClick}
            />
          )}
          {activeSearch === 'mega' && (
            <MegaSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              showMegaDropdown={showMegaDropdown}
              setShowMegaDropdown={setShowMegaDropdown}
              onKeyPress={handleKeyPress}
              onSearch={handleSearch}
              onCategorySelect={handleCategorySelect}
              onPopularSearchClick={handlePopularSearchClick}
            />
          )}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Implementation Comparison</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
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
              }
            ].map((item, index) => (
              <Card key={index} className="search-card">
                <CardHeader>
                  <CardTitle className="text-lg">{item.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-teal-600">Pros</h4>
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
                    <h4 className="font-semibold mb-2 text-pink-600">Considerations</h4>
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
                    <h4 className="font-semibold mb-2 text-gray-600">Best For</h4>
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
