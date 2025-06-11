
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSearchLogic = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('amazon');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [showMegaDropdown, setShowMegaDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const megaInputRef = useRef<HTMLInputElement>(null);

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
    if (selectedCategory === category.name) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category.name);
    }
    setShowMegaDropdown(false);
    if (megaInputRef.current) {
      megaInputRef.current.focus();
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSubjectClick = (subjectName: string) => {
    navigate(`/search?q=${encodeURIComponent(subjectName)}`);
    setIsExpanded(false);
  };

  const handlePopularSearchClick = (searchTerm: string) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setIsExpanded(false);
  };

  return {
    searchQuery,
    setSearchQuery,
    isExpanded,
    activeTab,
    setActiveTab,
    selectedDegree,
    setSelectedDegree,
    showMegaDropdown,
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
  };
};
