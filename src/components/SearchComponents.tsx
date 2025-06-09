
import React from 'react';
import { Search, ChevronDown, MapPin, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface SearchComponentProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export const SimpleSearchBar: React.FC<SearchComponentProps> = ({ 
  onSearch, 
  placeholder = "Search programs..." 
}) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-4 py-3 text-lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button 
        type="submit"
        className="absolute right-1 top-1/2 transform -translate-y-1/2"
        size="sm"
      >
        Search
      </Button>
    </form>
  );
};

export const CategoryCard: React.FC<{
  title: string;
  icon: string;
  count: string;
  color: string;
  onClick?: () => void;
}> = ({ title, icon, count, color, onClick }) => {
  return (
    <Card 
      className="cursor-pointer hover:scale-105 transition-transform search-card"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white text-2xl mb-3 mx-auto`}>
          {icon}
        </div>
        <h4 className="font-semibold text-center mb-1">{title}</h4>
        <p className="text-xs text-gray-500 text-center">{count}</p>
      </CardContent>
    </Card>
  );
};
