
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Calendar, GraduationCap, Globe, Building2, Network, Tag, BookOpen, Award } from 'lucide-react';
import FiltersSidebar from '@/components/search/FiltersSidebar';

const searchResults = [
  {
    id: '1',
    type: 'program',
    title: 'Bachelor of Business Administration',
    university: 'London Business School',
    location: 'London, UK',
    degree: 'Bachelors',
    duration: '3 years',
    studyPace: 'Hybrid',
    language: 'English',
    description: 'Comprehensive business program with focus on leadership and entrepreneurship.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    promoted: true,
  },
  {
    id: '2',
    type: 'scholarship',
    title: 'Global Leaders Scholarship',
    university: 'University of Cambridge',
    location: 'Cambridge, UK',
    description: 'Scholarship for students demonstrating leadership potential and academic excellence.',
    deadline: '15/12/2024',
    field: 'Business',
    image: 'https://images.unsplash.com/photo-1523289316-679942773b56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    type: 'article',
    title: 'MBA vs Masters: Which Degree is Right for You?',
    description: 'Comprehensive comparison of MBA and specialized Masters programs to help you make the right career decision.',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Business', 'Global'],
  },
  {
    id: '4',
    type: 'program',
    title: 'Master of International Business',
    university: 'National University of Singapore',
    location: 'Singapore',
    degree: 'Masters',
    duration: '18 months',
    studyPace: 'On-campus',
    language: 'English',
    description: 'Global business program with international exchange opportunities.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const renderResultCard = (result) => (
  <Card key={result.id} className="hover:shadow-lg transition-shadow overflow-hidden">
    <div className="grid grid-cols-1 md:grid-cols-12">
      <div className="md:col-span-3">
        <img src={result.image} alt={result.title} className="w-full h-full object-cover min-h-[150px]" />
      </div>
      <div className="md:col-span-9">
        <CardContent className="p-4 md:p-6 h-full flex flex-col justify-between">
          {result.type === 'program' && (
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{result.university}</p>
                  <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{result.description}</p>
                </div>
                {result.promoted && <Badge>Promoted</Badge>}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mt-auto pt-4 border-t">
                <div className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> {result.degree}</div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {result.duration}</div>
                <div className="flex items-center gap-1.5">
                  {result.studyPace === 'Hybrid' ? <Network className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                  {result.studyPace}
                </div>
                <div className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> {result.language}</div>
              </div>
            </div>
          )}
          {result.type === 'scholarship' && (
             <div>
                <p className="text-sm text-gray-500 mb-1">{result.university}</p>
                <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{result.description}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mt-auto pt-4 border-t">
                    <div className="flex items-center gap-1.5"><Tag className="w-4 h-4" /> {result.field}</div>
                    <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {result.location}</div>
                    <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Deadline: {result.deadline}</div>
                </div>
            </div>
          )}
          {result.type === 'article' && (
            <div>
                <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{result.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t">
                    {result.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  </Card>
);

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const programs = searchResults.filter(r => r.type === 'program');
  const scholarships = searchResults.filter(r => r.type === 'scholarship');
  const articles = searchResults.filter(r => r.type === 'article');

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <aside className="lg:col-span-1 lg:sticky top-8">
            <FiltersSidebar />
          </aside>
          <main className="lg:col-span-3">
            <h1 className="text-2xl font-bold">Search Results</h1>
            <p className="text-gray-600 mb-6 mt-1">{searchResults.length} results found for "{query}"</p>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Results ({searchResults.length})</TabsTrigger>
                <TabsTrigger value="programs"><GraduationCap className="w-4 h-4 mr-2" />Programs ({programs.length})</TabsTrigger>
                <TabsTrigger value="scholarships"><Award className="w-4 h-4 mr-2" />Scholarships ({scholarships.length})</TabsTrigger>
                <TabsTrigger value="articles"><BookOpen className="w-4 h-4 mr-2" />Articles ({articles.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                  <div className="space-y-4">{searchResults.map(renderResultCard)}</div>
              </TabsContent>
              <TabsContent value="programs" className="mt-6">
                  <div className="space-y-4">{programs.map(renderResultCard)}</div>
              </TabsContent>
              <TabsContent value="scholarships" className="mt-6">
                  <div className="space-y-4">{scholarships.map(renderResultCard)}</div>
              </TabsContent>
              <TabsContent value="articles" className="mt-6">
                  <div className="space-y-4">{articles.map(renderResultCard)}</div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
