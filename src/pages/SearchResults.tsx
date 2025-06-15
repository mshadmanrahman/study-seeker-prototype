import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Calendar, DollarSign } from 'lucide-react';

// Mock data for search results
const searchResults = [
  {
    id: '1',
    title: 'Bachelor of Science in Computer Science',
    university: 'Stanford University',
    location: 'Stanford, CA',
    duration: '4 years',
    deadline: 'May 15, 2024',
    scholarship: '$20,000',
  },
  {
    id: '2',
    title: 'Master of Business Administration',
    university: 'Harvard University',
    location: 'Cambridge, MA',
    duration: '2 years',
    deadline: 'April 30, 2024',
    scholarship: '$15,000',
  },
  {
    id: '3',
    title: 'PhD in Psychology',
    university: 'University of California, Berkeley',
    location: 'Berkeley, CA',
    duration: '5 years',
    deadline: 'June 1, 2024',
    scholarship: '$25,000',
  },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
        {searchResults.map((result) => (
          <Card key={result.id} className="mb-4">
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold">{result.title}</h2>
                <p className="text-gray-600">{result.university}, {result.location}</p>
              </div>
              <div>
                <div className="flex items-center text-gray-500 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Duration: {result.duration}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Deadline: {result.deadline}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>Scholarship: {result.scholarship}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Location: {result.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
