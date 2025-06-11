
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
