
import { useState, useEffect, useMemo } from 'react';

export interface SearchSuggestion {
  id: string;
  title: string;
  type: 'program' | 'school' | 'article' | 'scholarship' | 'location';
  institution?: string;
  location?: string;
  category?: string;
  amount?: string;
  region?: string;
}

// Mock data for suggestions - in a real app, this would come from your API
const mockSuggestions: SearchSuggestion[] = [
  // Programs
  { id: '1', title: 'Bachelor of Business Administration', type: 'program', institution: 'Harvard University' },
  { id: '2', title: 'Master of Computer Science', type: 'program', institution: 'MIT' },
  { id: '3', title: 'PhD in Psychology', type: 'program', institution: 'Stanford University' },
  { id: '4', title: 'Bachelor of Arts in Spanish Literature', type: 'program', institution: 'University of Barcelona' },
  { id: '5', title: 'Master of International Business', type: 'program', institution: 'London School of Economics' },
  { id: '6', title: 'Bachelor of Sports Medicine', type: 'program', institution: 'University of Sydney' },
  { id: '7', title: 'Master of Data Science', type: 'program', institution: 'University of California' },
  
  // Schools/Universities
  { id: '8', title: 'Harvard University', type: 'school', location: 'Cambridge, USA' },
  { id: '9', title: 'MIT', type: 'school', location: 'Cambridge, USA' },
  { id: '10', title: 'Stanford University', type: 'school', location: 'California, USA' },
  { id: '11', title: 'University of Barcelona', type: 'school', location: 'Barcelona, Spain' },
  { id: '12', title: 'London School of Economics', type: 'school', location: 'London, UK' },
  { id: '13', title: 'University of Sydney', type: 'school', location: 'Sydney, Australia' },
  { id: '14', title: 'Sorbonne University', type: 'school', location: 'Paris, France' },
  
  // Articles
  { id: '15', title: 'How to Apply for Spanish Universities', type: 'article', category: 'Application Tips' },
  { id: '16', title: 'Best Computer Science Programs in Europe', type: 'article', category: 'Program Guides' },
  { id: '17', title: 'Scholarship Opportunities in Spain', type: 'article', category: 'Financial Aid' },
  { id: '18', title: 'Study Abroad in Australia: Complete Guide', type: 'article', category: 'Study Abroad' },
  
  // Scholarships
  { id: '19', title: 'Spain Excellence Scholarship', type: 'scholarship', amount: '€15,000' },
  { id: '20', title: 'MIT Computer Science Fellowship', type: 'scholarship', amount: '$25,000' },
  { id: '21', title: 'International Business Scholarship', type: 'scholarship', amount: '£10,000' },
  { id: '22', title: 'Sports Medicine Research Grant', type: 'scholarship', amount: '$8,000' },
  
  // Locations
  { id: '23', title: 'Spain', type: 'location', region: 'Europe' },
  { id: '24', title: 'Australia', type: 'location', region: 'Oceania' },
  { id: '25', title: 'United Kingdom', type: 'location', region: 'Europe' },
  { id: '26', title: 'France', type: 'location', region: 'Europe' },
  { id: '27', title: 'Germany', type: 'location', region: 'Europe' },

  // Data for recent and popular searches
  { id: '100', title: 'A Guide to Engineering Degrees in Spain', type: 'article', category: 'Program Guides' },
  { id: '101', title: 'Finding Free Masters Programs', type: 'article', category: 'Financial Aid' },
  { id: '102', title: 'Exploring Erasmus Programs', type: 'article', category: 'Study Abroad' },
  { id: '103', title: 'Advantages of Dual Masters in Europe', type: 'article', category: 'Program Guides' },
  { id: '104', title: 'Top MBA in London for 2025', type: 'article', category: 'Program Guides' },
  { id: '105', title: 'Your Path to a Computer Science PhD', type: 'article', category: 'Program Guides' },
  { id: '106', title: 'How to Study Medicine in Germany', type: 'article', category: 'Study Abroad' },
  { id: '107', title: 'The Rise of Online Masters Degrees', type: 'article', category: 'Program Guides' },
  { id: '108', title: 'MBA Programme', type: 'program', institution: 'London Business School', location: 'London, UK'},
  { id: '109', title: 'PhD in Computer Science', type: 'program', institution: 'University of Cambridge', location: 'Cambridge, UK'},
  { id: '110', title: 'Master in Engineering', type: 'program', institution: 'Technical University of Madrid', location: 'Madrid, Spain' },
];

export const useSearchSuggestions = (query: string, maxSuggestions = 6) => {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log('useSearchSuggestions hook called with query:', query);

  const filteredSuggestions = useMemo(() => {
    if (!query || query.trim().length < 2) {
      console.log('Query too short, returning empty suggestions');
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    console.log('Filtering suggestions for term:', searchTerm);
    
    const filtered = mockSuggestions.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      (item.institution && item.institution.toLowerCase().includes(searchTerm)) ||
      (item.location && item.location.toLowerCase().includes(searchTerm)) ||
      (item.category && item.category.toLowerCase().includes(searchTerm))
    );

    console.log('Filtered suggestions count:', filtered.length);

    // Group by type and limit results
    const grouped: { [key: string]: SearchSuggestion[] } = {};
    filtered.forEach(item => {
      if (!grouped[item.type]) {
        grouped[item.type] = [];
      }
      if (grouped[item.type].length < 2) { // Max 2 per type
        grouped[item.type].push(item);
      }
    });

    // Flatten and return limited results
    const result = Object.values(grouped).flat().slice(0, maxSuggestions);
    console.log('Final suggestions result:', result.length, result.map(r => r.title));
    return result;
  }, [query, maxSuggestions]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    console.log('Setting loading true, will set suggestions after delay');
    
    // Simulate API delay
    const timer = setTimeout(() => {
      console.log('Setting suggestions:', filteredSuggestions.length);
      setSuggestions(filteredSuggestions);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [filteredSuggestions, query]);

  return { suggestions, isLoading };
};
