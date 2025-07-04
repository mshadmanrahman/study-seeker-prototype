
import React from 'react';
import StructuredSearch from '../search/StructuredSearch';
import FreeTextSearch from '../search/FreeTextSearch';
import AmazonStyleSearch from '../search/AmazonStyleSearch';
import VisualSearch from '../search/VisualSearch';
import MegaSearch from '../search/MegaSearch';
import Careers360Search from '../search/Careers360Search';

interface SearchContentProps {
  activeTab: string;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedDegree: string;
  setSelectedDegree: (value: string) => void;
  selectedCategory: string;
  showMegaDropdown: boolean;
  setShowMegaDropdown: (show: boolean) => void;
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
  setShowMegaDropdown,
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
          <StructuredSearch
            selectedSubject=""
            setSelectedSubject={() => {}}
            selectedStructuredLocation=""
            setSelectedStructuredLocation={() => {}}
            onSearch={handleSearch}
          />
        );
      case 'freetext':
        return (
          <FreeTextSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onKeyPress={handleKeyPress}
            onPopularSearchClick={handlePopularSearchClick}
          />
        );
      case 'amazon':
        return (
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
        );
      case 'visual':
        return (
          <VisualSearch
            selectedDegree={selectedDegree}
            setSelectedDegree={setSelectedDegree}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onKeyPress={handleKeyPress}
            onSearch={handleSearch}
            onSubjectClick={handleSubjectClick}
          />
        );
      case 'mega':
        return (
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
        );
      case 'careers360':
        return (
          <Careers360Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onKeyPress={handleKeyPress}
            onSearch={handleSearch}
            onPopularSearchClick={handlePopularSearchClick}
          />
        );
      default:
        return null;
    }
  };

  return <div>{renderSearchContent()}</div>;
};
