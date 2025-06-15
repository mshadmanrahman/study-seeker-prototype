
import React from 'react';
import type { SearchResult } from '@/types/search';
import { getNonRepeatingImageForPage } from '@/data/searchResultsData';
import NoResults from '@/components/search/NoResults';
import ProgramCard from '@/components/search/cards/ProgramCard';
import SchoolCard from '@/components/search/cards/SchoolCard';
import ScholarshipCard from '@/components/search/cards/ScholarshipCard';
import ArticleCard from '@/components/search/cards/ArticleCard';
import PromotedBanner from '@/components/search/cards/PromotedBanner';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface ResultsListProps {
  filteredResults: SearchResult[];
  searchQuery: string;
  onNewSearch: (query: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  currentResults: (SearchResult | { type: 'banner'; id: string })[];
  visibleResults: SearchResult[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const ResultsList: React.FC<ResultsListProps> = ({
  filteredResults,
  searchQuery,
  onNewSearch,
  onClearFilters,
  hasActiveFilters,
  currentResults,
  visibleResults,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  if (filteredResults.length === 0) {
    return (
      <NoResults
        searchQuery={searchQuery}
        onNewSearch={onNewSearch}
        onClearFilters={onClearFilters}
        hasActiveFilters={hasActiveFilters}
      />
    );
  }

  return (
    <>
      <div className="space-y-6">
        {currentResults.map((result, index) => {
          if (result.type === 'banner') {
            return <div key={result.id}><PromotedBanner /></div>;
          }

          const searchResult = result as SearchResult;
          const visibleResultIndex = visibleResults.findIndex((r) => r.id === searchResult.id);
          const imageIndex = visibleResultIndex !== -1 ? visibleResultIndex : index;
          const getImage = () => getNonRepeatingImageForPage(visibleResults, imageIndex, currentPage);

          return (
            <div key={result.id}>
              {result.type === 'program' && <ProgramCard result={searchResult} index={index} getImageForResult={getImage} />}
              {result.type === 'school' && <SchoolCard result={searchResult} index={index} getImageForResult={getImage} />}
              {result.type === 'article' && <ArticleCard result={searchResult} index={index} getImageForResult={getImage} />}
              {result.type === 'scholarship' && <ScholarshipCard result={searchResult} index={index} getImageForResult={getImage} />}
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
                    if (page === currentPage) {
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink href="#" onClick={(e) => e.preventDefault()} isActive>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    }
                    return (
                        <PaginationItem key={page}>
                            <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
                if (page === currentPage - 3 || page === currentPage + 3) {
                    return <PaginationEllipsis key={page} />;
                }
                return null;
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default ResultsList;
