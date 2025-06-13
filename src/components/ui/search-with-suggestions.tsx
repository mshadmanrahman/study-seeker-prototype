
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, BookOpen, GraduationCap, FileText, DollarSign, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useSearchSuggestions, SearchSuggestion } from '@/hooks/useSearchSuggestions';

interface SearchWithSuggestionsProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (suggestion: SearchSuggestion) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  className?: string;
  showIcon?: boolean;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'program':
      return <GraduationCap className="w-4 h-4" />;
    case 'school':
      return <BookOpen className="w-4 h-4" />;
    case 'article':
      return <FileText className="w-4 h-4" />;
    case 'scholarship':
      return <DollarSign className="w-4 h-4" />;
    case 'location':
      return <MapPin className="w-4 h-4" />;
    default:
      return <Search className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'program':
      return 'bg-blue-100 text-blue-800';
    case 'school':
      return 'bg-green-100 text-green-800';
    case 'article':
      return 'bg-purple-100 text-purple-800';
    case 'scholarship':
      return 'bg-yellow-100 text-yellow-800';
    case 'location':
      return 'bg-pink-100 text-pink-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <span key={index} className="bg-primary/20 text-primary font-medium">
        {part}
      </span>
    ) : (
      part
    )
  );
};

export const SearchWithSuggestions: React.FC<SearchWithSuggestionsProps> = ({
  value,
  onChange,
  onSelect,
  onKeyPress,
  placeholder = "Search...",
  className = "",
  showIcon = true
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const {
    suggestions,
    isLoading
  } = useSearchSuggestions(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  console.log('SearchWithSuggestions render:', {
    value,
    suggestions: suggestions.length,
    showSuggestions,
    isLoading
  });

  // Calculate dropdown position
  const updateDropdownPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  };

  useEffect(() => {
    if (showSuggestions) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition);
      window.addEventListener('resize', updateDropdownPosition);
      return () => {
        window.removeEventListener('scroll', updateDropdownPosition);
        window.removeEventListener('resize', updateDropdownPosition);
      };
    }
  }, [showSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log('Input change:', newValue);
    onChange(newValue);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    console.log('Input focus, suggestions available:', suggestions.length);
    if (suggestions.length > 0 || value.trim().length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    console.log('Suggestion clicked:', suggestion.title);
    onChange(suggestion.title);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onSelect?.(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      onKeyPress?.(e);
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          onKeyPress?.(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        onKeyPress?.(e);
    }
  };

  const SuggestionsDropdown = () => {
    if (!showSuggestions || value.trim().length < 2) return null;

    return (
      <div 
        style={{
          position: 'absolute',
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: Math.max(dropdownPosition.width, 400),
          zIndex: 999999
        }}
      >
        <div className="bg-white border border-gray-300 rounded-lg shadow-xl max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-pulse">Searching...</div>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="py-2">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={suggestion.id} 
                  className={`px-4 py-3 cursor-pointer transition-colors border-l-4 border-transparent hover:bg-gray-50 ${index === selectedIndex ? 'bg-blue-50 border-l-blue-500' : ''}`} 
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-gray-500">
                      {getTypeIcon(suggestion.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 truncate">
                          {highlightText(suggestion.title, value)}
                        </span>
                        <Badge className={`text-xs ${getTypeColor(suggestion.type)}`}>
                          {suggestion.type}
                        </Badge>
                      </div>
                      {(suggestion.institution || suggestion.location || suggestion.category || suggestion.amount) && (
                        <div className="text-sm text-gray-500 truncate">
                          {suggestion.institution || suggestion.location || suggestion.category || suggestion.amount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No suggestions found for "{value}"
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        {showIcon && <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
        <Input 
          ref={inputRef} 
          type="text" 
          placeholder={placeholder} 
          value={value} 
          onChange={handleInputChange} 
          onFocus={handleInputFocus} 
          onKeyDown={handleKeyDown} 
          className={showIcon ? "pl-10" : ""} 
        />
      </div>

      {typeof document !== 'undefined' && createPortal(
        <SuggestionsDropdown />,
        document.body
      )}
    </div>
  );
};
