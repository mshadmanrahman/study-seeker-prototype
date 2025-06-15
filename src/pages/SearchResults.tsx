
import React from 'react';
import { useLocation } from 'react-router-dom';
import { mockSuggestions, scoreSuggestion, SearchSuggestion } from '@/hooks/useSearchSuggestions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const filterResults = (query: string): SearchSuggestion[] => {
  if (!query || query.trim().length < 2) return [];
  const searchTerms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const scored = mockSuggestions
    .map(item => ({
      item,
      score: scoreSuggestion(item, searchTerms)
    }))
    .filter(row => row.score > 0);
  scored.sort((a, b) => b.score - a.score);
  // Return both programs and articles, and other highly matching items
  return scored.map(row => row.item).filter(item =>
    ["program", "article"].includes(item.type) ||
    // Or if the matched title/content includes all search terms for completeness
    searchTerms.every(term =>
      [
        item.title,
        item.institution,
        item.location,
        item.category,
        item.region,
        item.type
      ].filter(Boolean).join(' ').toLowerCase().includes(term)
    )
  );
};

const SearchResults: React.FC = () => {
  const query = useQuery().get('q') || '';
  const results = React.useMemo(() => filterResults(query), [query]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for <span className="text-primary">"{query}"</span>
      </h1>
      {results.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="mb-4">No results found</p>
          <p>We couldn't find any results for "{query}"</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map(result => (
            <Card key={result.id}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{result.title}</span>
                    <Badge className="text-xs capitalize">{result.type}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {[result.institution, result.location, result.category, result.amount, result.region]
                      .filter(Boolean)
                      .join(' • ')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
