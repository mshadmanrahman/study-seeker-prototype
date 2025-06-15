
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { SearchResult } from '@/types/search';
import { mockResults } from '@/data/searchResultsData';

const filterResult = (
  result: SearchResult,
  filters: {
    searchQuery: string;
    selectedDegreeTypes: string[];
    selectedFields: string[];
    selectedLocations: string[];
    selectedDurations: string[];
    selectedPaces: string[];
    selectedLanguages: string[];
    selectedFormats: string[];
  }
) => {
  const {
    searchQuery,
    selectedDegreeTypes,
    selectedFields,
    selectedLocations,
    selectedDurations,
    selectedPaces,
    selectedLanguages,
    selectedFormats,
  } = filters;

  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      result.title.toLowerCase().includes(query) ||
      result.description.toLowerCase().includes(query) ||
      (result.institution && result.institution.toLowerCase().includes(query)) ||
      (result.fieldOfStudy && result.fieldOfStudy.toLowerCase().includes(query));
    if (!matchesSearch) return false;
  }

  if (selectedDegreeTypes.length > 0 && result.degreeType && !selectedDegreeTypes.includes(result.degreeType)) return false;
  if (selectedFields.length > 0 && result.fieldOfStudy && !selectedFields.includes(result.fieldOfStudy)) return false;
  if (selectedLocations.length > 0 && result.location && !selectedLocations.some(loc => result.location?.includes(loc))) return false;
  if (selectedDurations.length > 0 && result.duration && !selectedDurations.includes(result.duration)) return false;
  if (selectedPaces.length > 0 && result.studyPace && !selectedPaces.includes(result.studyPace)) return false;
  if (selectedLanguages.length > 0 && result.language && !selectedLanguages.includes(result.language)) return false;
  if (selectedFormats.length > 0 && result.studyFormat && !selectedFormats.includes(result.studyFormat)) return false;
  
  return true;
};

export const useSearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results] = useState<SearchResult[]>(mockResults);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(mockResults);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentTypeFilter, setContentTypeFilter] = useState<string>('all');
  const resultsPerPage = 37;

  const [selectedDegreeTypes, setSelectedDegreeTypes] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedPaces, setSelectedPaces] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('relevance');

  const degreeTypes = useMemo(() => ['Bachelors', 'Masters', 'PhD', 'Certificate', 'Diploma'], []);
  const fieldsOfStudy = useMemo(() => ['Computer Science', 'Business', 'Engineering', 'Medicine', 'Arts', 'Law', 'STEM'], []);
  const locations = useMemo(() => ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Netherlands'], []);
  const durations = useMemo(() => ['1 year', '2 years', '3 years', '4 years', '5+ years'], []);
  const studyPaces = useMemo(() => ['Full-time', 'Part-time', 'Flexible'], []);
  const languages = useMemo(() => ['English', 'German', 'French', 'Spanish', 'Dutch'], []);
  const studyFormats = useMemo(() => ['On-campus', 'Online', 'Hybrid'], []);
  
  const currentFilters = useMemo(() => ({
    searchQuery,
    selectedDegreeTypes,
    selectedFields,
    selectedLocations,
    selectedDurations,
    selectedPaces,
    selectedLanguages,
    selectedFormats
  }), [searchQuery, selectedDegreeTypes, selectedFields, selectedLocations, selectedDurations, selectedPaces, selectedLanguages, selectedFormats]);

  useEffect(() => {
    let filtered = results.filter(result => {
      const baseFilterPass = filterResult(result, currentFilters);
      if (!baseFilterPass) return false;
      if (contentTypeFilter !== 'all' && result.type !== contentTypeFilter) return false;
      return true;
    });

    if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'deadline') {
      filtered.sort((a, b) => {
        if (!a.deadline || !b.deadline) return 0;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    }
    setFilteredResults(filtered);
    setCurrentPage(1);
  }, [results, currentFilters, sortBy, contentTypeFilter]);

  const clearAllFilters = useCallback(() => {
    setSelectedDegreeTypes([]);
    setSelectedFields([]);
    setSelectedLocations([]);
    setSelectedDurations([]);
    setSelectedPaces([]);
    setSelectedLanguages([]);
    setSelectedFormats([]);
    setContentTypeFilter('all');
  }, []);

  const handleNewSearch = useCallback((newQuery: string) => {
    setSearchQuery(newQuery);
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  }, [navigate]);

  const getActiveFiltersCount = useCallback(() => {
    return selectedDegreeTypes.length + selectedFields.length + selectedLocations.length + selectedDurations.length + selectedPaces.length + selectedLanguages.length + selectedFormats.length;
  }, [selectedDegreeTypes, selectedFields, selectedLocations, selectedDurations, selectedPaces, selectedLanguages, selectedFormats]);

  const createMixedPageResults = useCallback(() => {
    const programs = filteredResults.filter(r => r.type === 'program');
    const schools = filteredResults.filter(r => r.type === 'school');
    const scholarships = filteredResults.filter(r => r.type === 'scholarship');
    const articles = filteredResults.filter(r => r.type === 'article');
    
    const itemsPerPage = 37;
    const programsPerPage = 15;
    const schoolsPerPage = 10;
    const scholarshipsPerPage = 5;
    const articlesPerPage = 7;
    
    const programStart = (currentPage - 1) * programsPerPage;
    const schoolStart = (currentPage - 1) * schoolsPerPage;
    const scholarshipStart = (currentPage - 1) * scholarshipsPerPage;
    const articleStart = (currentPage - 1) * articlesPerPage;
    
    const pagePrograms = programs.slice(programStart, programStart + programsPerPage);
    const pageSchools = schools.slice(schoolStart, schoolStart + schoolsPerPage);
    const pageScholarships = scholarships.slice(scholarshipStart, scholarshipStart + scholarshipsPerPage);
    const pageArticles = articles.slice(articleStart, articleStart + articlesPerPage);
    
    const mixedResults: (SearchResult | { id: string; type: 'banner' })[] = [];
    
    const promotedPrograms = pagePrograms.filter(p => p.isPromoted).slice(0, 3);
    const regularPrograms = pagePrograms.filter(p => !p.isPromoted);
    const remainingPromoted = pagePrograms.filter(p => p.isPromoted).slice(3);
    
    promotedPrograms.forEach(program => mixedResults.push(program));
    
    const remainingContent = [
      ...regularPrograms,
      ...remainingPromoted,
      ...pageSchools,
      ...pageScholarships,
      ...pageArticles
    ];
    
    const shuffledContent = remainingContent.sort(() => Math.random() - 0.5);
    
    shuffledContent.forEach((item) => {
      if (mixedResults.length === 5 && currentPage === 1) {
        mixedResults.push({ id: 'banner', type: 'banner' });
      }
      mixedResults.push(item);
    });
    
    return mixedResults;
  }, [filteredResults, currentPage]);
  
  const getTabCount = useCallback((type: 'all' | 'program' | 'school' | 'scholarship' | 'article') => {
      const baseFiltered = results.filter(r => filterResult(r, currentFilters));
      if (type === 'all') return baseFiltered.length;
      return baseFiltered.filter(r => r.type === type).length;
  }, [results, currentFilters]);

  const getTotalPages = useCallback(() => {
    if (contentTypeFilter === 'program') {
      return Math.ceil(getTabCount('program') / 15);
    } else if (contentTypeFilter === 'school') {
      return Math.ceil(getTabCount('school') / 10);
    } else if (contentTypeFilter === 'scholarship') {
      return Math.ceil(getTabCount('scholarship') / 5);
    } else if (contentTypeFilter === 'article') {
      return Math.ceil(getTabCount('article') / 7);
    } else {
      return Math.max(
        Math.ceil(getTabCount('program') / 15),
        Math.ceil(getTabCount('school') / 10),
        Math.ceil(getTabCount('scholarship') / 5),
        Math.ceil(getTabCount('article') / 7),
        1
      );
    }
  }, [contentTypeFilter, getTabCount]);

  const currentResults = useMemo(() => createMixedPageResults(), [createMixedPageResults]);
  const visibleResults = useMemo(() => currentResults.filter(r => 'title' in r) as SearchResult[], [currentResults]);
  const totalPages = useMemo(() => getTotalPages(), [getTotalPages]);

  return {
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
  };
};
