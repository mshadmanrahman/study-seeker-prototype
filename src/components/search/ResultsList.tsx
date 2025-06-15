
import React from 'react';
import type { SearchResult } from '@/types/search';
import NoResults from '@/components/search/NoResults';
import ProgramCard from '@/components/search/cards/ProgramCard';
import SchoolCard from '@/components/search/cards/SchoolCard';
import ScholarshipCard from '@/components/search/cards/ScholarshipCard';
import ArticleCard from '@/components/search/cards/ArticleCard';
import PromotedBanner from '@/components/search/cards/PromotedBanner';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const imageUrls = [
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1574158622682-e40e6984100d?q=80&w=2080&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=2070&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1494256997604-768d1f6089b3?q=80&w=2070&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1935&auto=format&fit=crop', // cat with glasses
  'https://images.unsplash.com/photo-1595194423377-d5f03a11a8b4?q=80&w=1974&auto=format&fit=crop', // Persian cat
  'https://images.unsplash.com/photo-1615789591457-74a63395c990?q=80&w=2000&auto=format&fit=crop', // Siberian cat
  'https://images.unsplash.com/photo-1611259283935-7d58dfe37f26?q=80&w=1974&auto=format&fit=crop', // Ragdoll blue mitted
  'https://images.unsplash.com/photo-1511044568934-09b02a7a3939?q=80&w=1935&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1561948955-570b270e7c36?q=80&w=1802&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1931&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1936&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?q=80&w=1936&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=2070&auto=format&fit=crop', // dog
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop', // dog
  'https://images.unsplash.com/photo-1629139433193-c44a7153d865?q=80&w=1974&auto=format&fit=crop', // German Pinscher
  'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=1974&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1592194991823-23ae48734346?q=80&w=1974&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?q=80&w=1974&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1570824104453-5039a27c4e5f?q=80&w=1974&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1974&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?q=80&w=2070&auto=format&fit=crop', // dog
  'https://images.unsplash.com/photo-1583337130417-2346a5be24c1?q=80&w=2070&auto=format&fit=crop', // dog
  'https://images.unsplash.com/photo-1601912999464-9d92497f3b58?q=80&w=1974&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1513245543132-31f50741b26b?q=80&w=1974&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1532386236308-07f48c0344b5?q=80&w=1974&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1962&auto=format&fit=crop', // dog
  'https://images.unsplash.com/photo-1587766023326-e1350a4eb18c?q=80&w=1974&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1974&auto=format&fit=crop', // cat with butterfly
  'https://images.unsplash.com/photo-1508346083049-14b7b3119639?q=80&w=1974&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1549221980-82b19f0a3692?q=80&w=1974&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1547970193-da9f7e45543e?q=80&w=1974&auto=format&fit=crop', // cat
  'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=1976&auto=format&fit=crop', // dog
  'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1935&auto=format&fit=crop', // dog
  'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1974&auto=format&fit=crop' // cat
];

const usedImageIndexes = new Set<number>();
const pageImageMap: { [page: number]: { [index: number]: string } } = {};

export const getNonRepeatingImageForPage = (results: any[], resultIndex: number, page: number) => {
  if (!pageImageMap[page]) {
    pageImageMap[page] = {};
  }

  if (pageImageMap[page][resultIndex]) {
    return pageImageMap[page][resultIndex];
  }

  let imageIndex;
  do {
    imageIndex = Math.floor(Math.random() * imageUrls.length);
  } while (usedImageIndexes.has(imageIndex) && usedImageIndexes.size < imageUrls.length);
  
  if (usedImageIndexes.size >= imageUrls.length) {
    usedImageIndexes.clear();
  }

  usedImageIndexes.add(imageIndex);
  const imageUrl = imageUrls[imageIndex];
  pageImageMap[page][resultIndex] = imageUrl;

  return imageUrl;
};


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
