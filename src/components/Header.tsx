
import React from 'react';
import { Search, Globe, User, ChevronDown, BookOpen, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearchLogic } from './header/useSearchLogic';
import { SearchContent } from './header/SearchContent';

const Header = () => {
  const {
    searchQuery,
    setSearchQuery,
    isExpanded,
    activeTab,
    setActiveTab,
    selectedDegree,
    setSelectedDegree,
    showMegaDropdown,
    setShowMegaDropdown,
    selectedCategory,
    searchRef,
    megaInputRef,
    handleSearchClick,
    handleCloseSearch,
    handleMegaInputFocus,
    handleCategorySelect,
    handleSearch,
    handleKeyPress,
    handleLogoClick,
    handleSubjectClick,
    handlePopularSearchClick
  } = useSearchLogic();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Now clickable */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/f9cd9d53-d676-4f5b-a143-85d026ced35b.png" 
              alt="Educations.com Logo" 
              className="h-8 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={handleLogoClick}
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
            <div className="flex rounded-lg overflow-hidden border border-gray-300 cursor-pointer hover:border-gray-400 transition-colors" onClick={handleSearchClick}>
              <div className="flex-1 px-3 py-2 bg-white">
                <span className="text-gray-500">Search for subject, school or location</span>
              </div>
              <div className="px-4 bg-primary text-white flex items-center">
                <Search className="w-4 h-4" />
              </div>
            </div>
            
            {isExpanded && (
              <div className="absolute top-12 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-[900px] -ml-60">
                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => setActiveTab('careers360')} 
                      className={`px-3 py-1 text-sm font-medium rounded ${activeTab === 'careers360' ? 'bg-teal-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Careers360 Style
                    </button>
                    <button 
                      onClick={() => setActiveTab('structured')} 
                      className={`px-3 py-1 text-sm font-medium rounded ${activeTab === 'structured' ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Structured
                    </button>
                    <button 
                      onClick={() => setActiveTab('freetext')} 
                      className={`px-3 py-1 text-sm font-medium rounded ${activeTab === 'freetext' ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Free Text
                    </button>
                    <button 
                      onClick={() => setActiveTab('amazon')} 
                      className={`px-3 py-1 text-sm font-medium rounded ${activeTab === 'amazon' ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Category + Search
                    </button>
                    <button 
                      onClick={() => setActiveTab('visual')} 
                      className={`px-3 py-1 text-sm font-medium rounded ${activeTab === 'visual' ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Visual
                    </button>
                    <button 
                      onClick={() => setActiveTab('mega')} 
                      className={`px-3 py-1 text-sm font-medium rounded ${activeTab === 'mega' ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      Mega Search
                    </button>
                  </div>
                  <button onClick={handleCloseSearch} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <SearchContent
                  activeTab={activeTab}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedDegree={selectedDegree}
                  setSelectedDegree={setSelectedDegree}
                  selectedCategory={selectedCategory}
                  showMegaDropdown={showMegaDropdown}
                  setShowMegaDropdown={setShowMegaDropdown}
                  megaInputRef={megaInputRef}
                  handleSearch={handleSearch}
                  handleKeyPress={handleKeyPress}
                  handleSubjectClick={handleSubjectClick}
                  handlePopularSearchClick={handlePopularSearchClick}
                  handleMegaInputFocus={handleMegaInputFocus}
                  handleCategorySelect={handleCategorySelect}
                />
              </div>
            )}
          </div>

          {/* Right side - Language and Sign in */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center hover:bg-primary/10 hover:text-primary">
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
