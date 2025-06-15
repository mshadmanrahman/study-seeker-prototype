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

  // ========= Added for Engineering Degrees in Spain =========
  { id: '201', title: 'Bachelor of Engineering', type: 'program', institution: 'Universitat Politècnica de Catalunya', location: 'Barcelona, Spain' },
  { id: '202', title: 'Engineering Degrees in Spain', type: 'article', category: 'Program Guides', location: 'Spain' },
  { id: '203', title: 'Top Engineering Programs in Spain', type: 'article', category: 'Education', location: 'Spain' },
  { id: '204', title: 'Civil Engineering Degree', type: 'program', institution: 'University of Salamanca', location: 'Salamanca, Spain' },
  { id: '205', title: 'Study Engineering in Spain', type: 'article', category: 'Study Abroad', location: 'Spain' },
  { id: '206', title: 'Mechanical Engineering Degree in Madrid', type: 'program', institution: 'Complutense University of Madrid', location: 'Madrid, Spain' },
  { id: '207', title: 'Electrical Engineering (Graduate)', type: 'program', institution: 'University of Zaragoza', location: 'Zaragoza, Spain' },
];

export const useSearchSuggestions = (query: string, maxSuggestions = 100) => {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredSuggestions = useMemo(() => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const searchTerms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    
    const filtered = mockSuggestions.filter(item => {
      const searchableText = [
        item.title,
        item.institution,
        item.location,
        item.category,
        item.region,
        item.type
      ].filter(Boolean).join(' ').toLowerCase();
      
      return searchTerms.every(term => searchableText.includes(term));
    });

    return filtered.slice(0, maxSuggestions);
  }, [query, maxSuggestions]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      setSuggestions(filteredSuggestions);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [filteredSuggestions, query]);

  return { suggestions, isLoading };
};
