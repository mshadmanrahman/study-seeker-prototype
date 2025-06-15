
import { LucideIcon } from 'lucide-react';

export interface DegreeType {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface Subject {
  name: string;
  icon: LucideIcon;
  category: string;
}

export interface SearchImplementation {
  id: string;
  name: string;
  description: string;
}

export interface MegaSearchCategory {
  name: string;
  icon: LucideIcon;
  description: string;
}

// Moved from SearchResults.tsx:
export interface SearchResult {
  id: string;
  type: 'program' | 'article' | 'scholarship' | 'school';
  title: string;
  description: string;
  location?: string;
  duration?: string;
  language?: string;
  deadline?: string;
  degreeType?: string;
  fieldOfStudy?: string;
  studyPace?: string;
  studyFormat?: string;
  tuitionFee?: string;
  rating?: number;
  image?: string;
  institution?: string;
  isPromoted?: boolean;
  establishedYear?: string;
  studentCount?: string;
  acceptanceRate?: string;
  ranking?: string;
}
