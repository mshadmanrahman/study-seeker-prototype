
import React, { useState, useRef, useEffect } from 'react';
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

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        {showIcon && <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
        <Input ref={inputRef} type="text" placeholder={placeholder} value={value} onChange={handleInputChange} onFocus={handleInputFocus} onKeyDown={handleKeyDown} className={showIcon ? "pl-10" : ""} />
      </div>

      {showSuggestions && value.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 z-[99999] mt-1">
          <div className="bg-white border border-gray-300 rounded-lg shadow-xl max-h-80 overflow-y-auto min-w-[400px]">
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
                            {suggestion.title}
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
      )}
    </div>
  );
};
