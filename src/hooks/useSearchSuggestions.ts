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

  // ========= Added/expanded for Engineering Degrees in Spain =========
  // Programs
  { id: '211', title: 'Bachelor of Civil Engineering', type: 'program', institution: 'Polytechnic University of Madrid', location: 'Madrid, Spain', category: 'Engineering', region: 'Europe' },
  { id: '212', title: 'Bachelor in Industrial Engineering', type: 'program', institution: 'University of Valencia', location: 'Valencia, Spain', category: 'Engineering', region: 'Europe' },
  { id: '213', title: 'Masters in Electrical Engineering', type: 'program', institution: 'Technical University of Catalonia', location: 'Barcelona, Spain', category: 'Engineering', region: 'Europe' },
  { id: '214', title: 'Chemical Engineering Degree', type: 'program', institution: 'University of Zaragoza', location: 'Zaragoza, Spain', category: 'Engineering', region: 'Europe' },
  { id: '215', title: 'Aerospace Engineering BSc', type: 'program', institution: 'Carlos III University of Madrid', location: 'Madrid, Spain', category: 'Engineering', region: 'Europe' },
  { id: '216', title: 'Marine Engineering Program', type: 'program', institution: 'University of La Coruña', location: 'La Coruña, Spain', category: 'Engineering', region: 'Europe' },
  { id: '217', title: 'Industrial Design Engineering', type: 'program', institution: 'University of Seville', location: 'Seville, Spain', category: 'Engineering', region: 'Europe' },
  { id: '218', title: 'Engineering Degrees in Spain', type: 'program', institution: 'Multiple Institutions', location: 'Spain', category: 'Engineering', region: 'Europe' }, // KEY: Exact search phrase

  // Articles
  { id: '202', title: 'Engineering Degrees in Spain', type: 'article', category: 'Program Guides', location: 'Spain', region: 'Europe' },
  { id: '203', title: 'Top Engineering Programs in Spain', type: 'article', category: 'Education', location: 'Spain', region: 'Europe' },
  { id: '205', title: 'Study Engineering in Spain', type: 'article', category: 'Study Abroad', location: 'Spain', region: 'Europe' },

  // Remainng original suggestions for completeness
  { id: '201', title: 'Bachelor of Engineering', type: 'program', institution: 'Universitat Politècnica de Catalunya', location: 'Barcelona, Spain', category: 'Engineering', region: 'Europe' },
  { id: '204', title: 'Civil Engineering Degree', type: 'program', institution: 'University of Salamanca', location: 'Salamanca, Spain', category: 'Engineering', region: 'Europe' },
  { id: '206', title: 'Mechanical Engineering Degree in Madrid', type: 'program', institution: 'Complutense University of Madrid', location: 'Madrid, Spain', category: 'Engineering', region: 'Europe' },
  { id: '207', title: 'Electrical Engineering (Graduate)', type: 'program', institution: 'University of Zaragoza', location: 'Zaragoza, Spain', category: 'Engineering', region: 'Europe' },
];

function scoreSuggestion(item: SearchSuggestion, searchTerms: string[]) {
  // Higher score for closer matches
  let score = 0;
  const content = [
    item.title, item.institution, item.location, item.category, item.region, item.type
  ].filter(Boolean).join(' ').toLowerCase();

  // Exact phrase (all terms spaced the same)
  if (searchTerms.length > 1 && content.includes(searchTerms.join(' '))) {
    score += 10;
  }
  // All terms somewhere in content
  if (searchTerms.every(term => content.includes(term))) {
    score += 6;
  }
  // Count number of matching terms
  const matches = searchTerms.filter(term => content.includes(term)).length;
  score += matches;
  // Prefer program and article types for this kind of query
  if (item.type === 'program' || item.type === 'article') {
    score += 2;
  }
  // Small bonus if in Spain for engineering
  if (content.includes('spain') && content.includes('engineering')) {
    score += 2;
  }
  return score;
}

export const useSearchSuggestions = (query: string, maxSuggestions = 100) => {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredSuggestions = useMemo(() => {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const searchTerms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

    // Calculate score for all suggestions
    const scored = mockSuggestions
      .map(item => ({
        item, 
        score: scoreSuggestion(item, searchTerms)
      }))
      .filter(row => row.score > 0);

    // Sort by highest score
    scored.sort((a, b) => b.score - a.score);

    // Extract sorted suggestion objects and slice
    return scored.map(row => row.item).slice(0, maxSuggestions);
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
    }, 120);

    return () => clearTimeout(timer);
  }, [filteredSuggestions, query]);

  return { suggestions, isLoading };
};
