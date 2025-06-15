
import React from 'react';
import { GraduationCap, Building, Award, BookOpen } from 'lucide-react';

interface ContentTypeTabsProps {
  contentTypeFilter: string;
  onContentTypeFilterChange: (value: string) => void;
  getTabCount: (type: 'all' | 'program' | 'school' | 'scholarship' | 'article') => number;
}

const tabs = [
    { id: 'all', label: 'All Results', icon: null },
    { id: 'program', label: 'Programs', icon: GraduationCap },
    { id: 'school', label: 'Universities', icon: Building },
    { id: 'scholarship', label: 'Scholarships', icon: Award },
    { id: 'article', label: 'Articles', icon: BookOpen },
];

const ContentTypeTabs: React.FC<ContentTypeTabsProps> = ({
  contentTypeFilter,
  onContentTypeFilterChange,
  getTabCount,
}) => (
  <div className="mb-6">
    <div className="flex gap-2 border-b border-gray-200">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            contentTypeFilter === tab.id
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onContentTypeFilterChange(tab.id)}
        >
          {tab.icon && <tab.icon className="w-4 h-4 inline mr-2" />}
          {tab.label} ({getTabCount(tab.id as any)})
        </button>
      ))}
    </div>
  </div>
);

export default ContentTypeTabs;
