import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface SearchResult {
  title: string;
  description: string;
  imageUrl: string;
  tags?: string[];
}

const MOCK_SEARCH_RESULTS: SearchResult[] = [
  {
    title: "The Future of AI in Education",
    description: "Explore how artificial intelligence is transforming the education sector, offering personalized learning experiences and new tools for educators.",
    imageUrl: "https://images.unsplash.com/photo-1673228475414-b9569394752a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    tags: ["AI", "Education", "Technology"]
  },
  {
    title: "Scholarships for Computer Science Majors",
    description: "A comprehensive guide to scholarships available for students pursuing degrees in computer science. Find the right funding for your education.",
    imageUrl: "https://images.unsplash.com/photo-1517245386804-bb43f65368ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    tags: ["Scholarships", "Computer Science", "Funding"]
  },
  {
    title: "The Benefits of Online Learning",
    description: "Discover the advantages of online education, from flexibility and convenience to cost savings and access to a wider range of courses.",
    imageUrl: "https://images.unsplash.com/photo-1622271335087-7549453149a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    tags: ["Online Learning", "Education", "E-learning"]
  },
  {
    title: "Top 10 Universities for Engineering",
    description: "A ranking of the best universities around the world for studying engineering, based on faculty, research output, and student satisfaction.",
    imageUrl: "https://images.unsplash.com/photo-1588421357569-ca6fa0d33ca9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    tags: ["Engineering", "Universities", "Education"]
  },
  {
    title: "How to Write a Winning Scholarship Essay",
    description: "Expert tips and advice on crafting a compelling scholarship essay that will impress the judges and increase your chances of winning.",
    imageUrl: "https://images.unsplash.com/photo-1542744166-e35939358f7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    tags: ["Scholarships", "Essay Writing", "Education"]
  },
  {
    title: "The Impact of Technology on Society",
    description: "An analysis of how technology is shaping our society, from communication and transportation to healthcare and entertainment.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-87b59e850b4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    tags: ["Technology", "Society", "Innovation"]
  }
];

const getImageForResult = (result: SearchResult, index: number) => {
  // Use the imageUrl from the result if available, otherwise use a fallback image based on the index
  return result.imageUrl || `https://source.unsplash.com/random/400x225?sig=${index}`;
};

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    // Simulate fetching search results based on the query
    // In a real application, you would make an API call here
    const filteredResults = MOCK_SEARCH_RESULTS.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase()) ||
      (result.tags && result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
    );
    setResults(filteredResults);
  }, [query]);

  // Function to generate random reading time
  const getRandomReadTime = () => {
    const times = ["3 min read", "5 min read", "7 min read", "4 min read", "6 min read", "8 min read"];
    return times[Math.floor(Math.random() * times.length)];
  };

  const ArticleCard = ({ result, index }: { result: SearchResult; index: number }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex h-40">
        {/* Left side - Article image */}
        <div className="w-32 flex-shrink-0 overflow-hidden">
          <img src={getImageForResult(result, index)} alt="Article image" className="w-full h-full object-cover block" />
        </div>
        
        {/* Right side - Article content */}
        <div className="flex-1 min-w-0 p-4">
          {/* Publication date */}
          <p className="text-xs text-gray-500 mb-2">Dec 2024</p>
          
          {/* Title */}
          <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2">
            {result.title}
          </h3>
          
          {/* Description */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {result.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {result.tags?.slice(0, 3).map((tag, tagIndex) => (
              <Badge key={tagIndex} variant="secondary" className="text-xs px-2 py-0.5 h-auto">
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Footer metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{getRandomReadTime()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Published</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const ScholarshipCard = ({ result, index }: { result: SearchResult; index: number }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex h-40">
        {/* Left side - Scholarship image */}
        <div className="w-32 flex-shrink-0 overflow-hidden relative">
          <img src={getImageForResult(result, index)} alt="Scholarship image" className="w-full h-full object-cover block" />
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            SCHOLARSHIP
          </div>
        </div>
        
        {/* Right side - Scholarship content */}
        <div className="flex-1 min-w-0 p-4">
          {/* Publication date */}
          <p className="text-xs text-gray-500 mb-2">Dec 2024</p>
          
          {/* Title */}
          <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2">
            {result.title}
          </h3>
          
          {/* Description */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {result.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {result.tags?.slice(0, 3).map((tag, tagIndex) => (
              <Badge key={tagIndex} variant="secondary" className="text-xs px-2 py-0.5 h-auto">
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Footer metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{getRandomReadTime()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Deadline: Jan 15</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <Input type="text" placeholder="Search articles..." className="pl-10" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {results.map((result, index) => {
            // Alternate between ArticleCard and ScholarshipCard
            if (index % 2 === 0) {
              return <ArticleCard key={index} result={result} index={index} />;
            } else {
              return <ScholarshipCard key={index} result={result} index={index} />;
            }
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No results found for "{query}".
        </div>
      )}
    </div>
  );
};

export default SearchResults;
