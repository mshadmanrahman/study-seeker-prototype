
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { useSearchResults } from '@/hooks/useSearchResults';
import FilterSidebar from '@/components/search/FilterSidebar';
import ResultsHeader from '@/components/search/ResultsHeader';
import ContentTypeTabs from '@/components/search/ContentTypeTabs';
import ResultsList from '@/components/search/ResultsList';

const SearchResults: React.FC = () => {
  const {
    searchQuery,
    filteredResults,
    showFilters,
    setShowFilters,
    currentPage,
    setCurrentPage,
    contentTypeFilter,
    setContentTypeFilter,
    selectedDegreeTypes,
    setSelectedDegreeTypes,
    selectedFields,
    setSelectedFields,
    selectedLocations,
    setSelectedLocations,
    selectedDurations,
    setSelectedDurations,
    selectedPaces,
    setSelectedPaces,
    selectedLanguages,
    setSelectedLanguages,
    selectedFormats,
    setSelectedFormats,
    sortBy,
    setSortBy,
    degreeTypes,
    fieldsOfStudy,
    locations,
    durations,
    studyPaces,
    languages,
    studyFormats,
    clearAllFilters,
    handleNewSearch,
    getActiveFiltersCount,
    currentResults,
    visibleResults,
    totalPages,
    getTabCount
  } = useSearchResults();
  
  const activeFiltersCount = getActiveFiltersCount();

  const activeFilterBadges = [
    ...selectedDegreeTypes.map(value => ({ value, setter: setSelectedDegreeTypes, all: selectedDegreeTypes })),
    ...selectedFields.map(value => ({ value, setter: setSelectedFields, all: selectedFields })),
    ...selectedLocations.map(value => ({ value, setter: setSelectedLocations, all: selectedLocations })),
    ...selectedDurations.map(value => ({ value, setter: setSelectedDurations, all: selectedDurations })),
    ...selectedPaces.map(value => ({ value, setter: setSelectedPaces, all: selectedPaces })),
    ...selectedLanguages.map(value => ({ value, setter: setSelectedLanguages, all: selectedLanguages })),
    ...selectedFormats.map(value => ({ value, setter: setSelectedFormats, all: selectedFormats })),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <FilterSidebar
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            activeFiltersCount={activeFiltersCount}
            clearAllFilters={clearAllFilters}
            degreeTypes={degreeTypes}
            selectedDegreeTypes={selectedDegreeTypes}
            onDegreeTypeChange={setSelectedDegreeTypes}
            fieldsOfStudy={fieldsOfStudy}
            selectedFields={selectedFields}
            onFieldChange={setSelectedFields}
            locations={locations}
            selectedLocations={selectedLocations}
            onLocationChange={setSelectedLocations}
            durations={durations}
            selectedDurations={selectedDurations}
            onDurationChange={setSelectedDurations}
            studyPaces={studyPaces}
            selectedPaces={selectedPaces}
            onPaceChange={setSelectedPaces}
            languages={languages}
            selectedLanguages={selectedLanguages}
            onLanguageChange={setSelectedLanguages}
            studyFormats={studyFormats}
            selectedFormats={selectedFormats}
            onFormatChange={setSelectedFormats}
          />

          <div className="flex-1 min-w-0">
            <ResultsHeader
              filteredResultsCount={filteredResults.length}
              searchQuery={searchQuery}
              onShowFilters={() => setShowFilters(true)}
              activeFiltersCount={activeFiltersCount}
              sortBy={sortBy}
              onSortByChange={setSortBy}
            />

            <ContentTypeTabs
                contentTypeFilter={contentTypeFilter}
                onContentTypeFilterChange={setContentTypeFilter}
                getTabCount={getTabCount}
            />

            {activeFiltersCount > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {activeFilterBadges.map(({ value, setter, all }) => (
                    <Badge key={value} variant="secondary" className="flex items-center gap-1">
                      {value}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setter(all.filter((item) => item !== value))} />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <ResultsList
              filteredResults={filteredResults}
              searchQuery={searchQuery}
              onNewSearch={handleNewSearch}
              onClearFilters={clearAllFilters}
              hasActiveFilters={activeFiltersCount > 0}
              currentResults={currentResults}
              visibleResults={visibleResults}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
