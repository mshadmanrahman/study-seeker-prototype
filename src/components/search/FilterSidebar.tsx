
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import FilterSection from '@/components/search/FilterSection';

interface FilterSidebarProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  activeFiltersCount: number;
  clearAllFilters: () => void;
  degreeTypes: string[];
  selectedDegreeTypes: string[];
  onDegreeTypeChange: (value: string[]) => void;
  fieldsOfStudy: string[];
  selectedFields: string[];
  onFieldChange: (value: string[]) => void;
  locations: string[];
  selectedLocations: string[];
  onLocationChange: (value: string[]) => void;
  durations: string[];
  selectedDurations: string[];
  onDurationChange: (value: string[]) => void;
  studyPaces: string[];
  selectedPaces: string[];
  onPaceChange: (value: string[]) => void;
  languages: string[];
  selectedLanguages: string[];
  onLanguageChange: (value: string[]) => void;
  studyFormats: string[];
  selectedFormats: string[];
  onFormatChange: (value: string[]) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  showFilters,
  setShowFilters,
  activeFiltersCount,
  clearAllFilters,
  degreeTypes,
  selectedDegreeTypes,
  onDegreeTypeChange,
  fieldsOfStudy,
  selectedFields,
  onFieldChange,
  locations,
  selectedLocations,
  onLocationChange,
  durations,
  selectedDurations,
  onDurationChange,
  studyPaces,
  selectedPaces,
  onPaceChange,
  languages,
  selectedLanguages,
  onLanguageChange,
  studyFormats,
  selectedFormats,
  onFormatChange,
}) => (
  <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-80 flex-shrink-0`}>
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button variant="outline" onClick={() => setShowFilters(false)} className="lg:hidden">
          <X className="w-4 h-4" />
        </Button>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-blue-600">
            Clear all
          </Button>
        )}
      </div>

      <FilterSection
        title="Degree Type"
        options={degreeTypes}
        selected={selectedDegreeTypes}
        onSelectionChange={onDegreeTypeChange}
      />

      <FilterSection
        title="Field of Study"
        options={fieldsOfStudy}
        selected={selectedFields}
        onSelectionChange={onFieldChange}
      />

      <FilterSection
        title="Location"
        options={locations}
        selected={selectedLocations}
        onSelectionChange={onLocationChange}
      />

      <FilterSection
        title="Duration"
        options={durations}
        selected={selectedDurations}
        onSelectionChange={onDurationChange}
      />

      <FilterSection
        title="Study Pace"
        options={studyPaces}
        selected={selectedPaces}
        onSelectionChange={onPaceChange}
      />

      <FilterSection
        title="Language"
        options={languages}
        selected={selectedLanguages}
        onSelectionChange={onLanguageChange}
      />

      <FilterSection
        title="Study Format"
        options={studyFormats}
        selected={selectedFormats}
        onSelectionChange={onFormatChange}
      />
    </div>
  </div>
);

export default FilterSidebar;
