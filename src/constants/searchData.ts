
import { BookOpen, GraduationCap, Award, Filter, Globe, Clock, Star, Settings, Building, Palette, Plane, Briefcase, Hammer, Scissors, Target, TrendingUp, Users, Zap, Cog, Leaf, Shirt, DollarSign, UtensilsCrossed, Heart, Newspaper, MessageCircle, Scale, Dna, Lightbulb, UserCheck, Megaphone, Microscope, Music, Sparkles, Earth, Activity, Recycle, Monitor, FileText, Hotel, Car } from 'lucide-react';
import { DegreeType, Subject, SearchImplementation, MegaSearchCategory } from '@/types/search';

export const degreeTypes: DegreeType[] = [
  {
    value: 'preparatory',
    label: 'Preparatory',
    icon: BookOpen
  }, {
    value: 'bachelors',
    label: 'Bachelors',
    icon: GraduationCap
  }, {
    value: 'post-bachelors',
    label: 'Post-Bachelors',
    icon: FileText
  }, {
    value: 'masters',
    label: 'Masters',
    icon: Target
  }, {
    value: 'postgraduate',
    label: 'Postgraduate',
    icon: Microscope
  }, {
    value: 'phd',
    label: 'PhD Studies',
    icon: Award
  }
];

export const subjects: Subject[] = [
  {
    name: 'Administration Programs',
    icon: Settings,
    category: 'Business'
  }, {
    name: 'Architecture Programs',
    icon: Building,
    category: 'Design'
  }, {
    name: 'Art Programs',
    icon: Palette,
    category: 'Creative'
  }, {
    name: 'Aviation Programs',
    icon: Plane,
    category: 'Transportation'
  }, {
    name: 'Business Programs',
    icon: Briefcase,
    category: 'Business'
  }, {
    name: 'Construction Programs',
    icon: Hammer,
    category: 'Engineering'
  }, {
    name: 'Cosmetology Programs',
    icon: Scissors,
    category: 'Personal Care'
  }, {
    name: 'Design Programs',
    icon: Target,
    category: 'Creative'
  }, {
    name: 'Economic Programs',
    icon: TrendingUp,
    category: 'Business'
  }, {
    name: 'Education Programs',
    icon: Users,
    category: 'Education'
  }, {
    name: 'Energy Programs',
    icon: Zap,
    category: 'Engineering'
  }, {
    name: 'Engineering Programs',
    icon: Cog,
    category: 'Engineering'
  }, {
    name: 'Environmental Programs',
    icon: Leaf,
    category: 'Science'
  }, {
    name: 'Fashion Programs',
    icon: Shirt,
    category: 'Creative'
  }, {
    name: 'Finance Programs',
    icon: DollarSign,
    category: 'Business'
  }, {
    name: 'Food and Beverage Programs',
    icon: UtensilsCrossed,
    category: 'Hospitality'
  }, {
    name: 'General Programs',
    icon: BookOpen,
    category: 'General'
  }, {
    name: 'Healthcare Programs',
    icon: Heart,
    category: 'Health'
  }, {
    name: 'Humanities Programs',
    icon: BookOpen,
    category: 'Humanities'
  }, {
    name: 'Journalism, Media, and Mass Communication Programs',
    icon: Newspaper,
    category: 'Media'
  }, {
    name: 'Language Programs',
    icon: MessageCircle,
    category: 'Languages'
  }, {
    name: 'Law Programs',
    icon: Scale,
    category: 'Law'
  }, {
    name: 'Life Sciences Programs',
    icon: Dna,
    category: 'Science'
  }, {
    name: 'Life Skills Programs',
    icon: Target,
    category: 'Personal Development'
  }, {
    name: 'Management Programs',
    icon: UserCheck,
    category: 'Business'
  }, {
    name: 'Marketing Programs',
    icon: Megaphone,
    category: 'Business'
  }, {
    name: 'Natural Sciences Programs',
    icon: Microscope,
    category: 'Science'
  }, {
    name: 'Performing Arts Programs',
    icon: Music,
    category: 'Creative'
  }, {
    name: 'Professional Programs',
    icon: Lightbulb,
    category: 'Professional'
  }, {
    name: 'Self-Improvement Programs',
    icon: Sparkles,
    category: 'Personal Development'
  }, {
    name: 'Social Science Programs',
    icon: Earth,
    category: 'Social Sciences'
  }, {
    name: 'Sport and Exercise Programs',
    icon: Activity,
    category: 'Sports'
  }, {
    name: 'Sustainability Programs',
    icon: Recycle,
    category: 'Environmental'
  }, {
    name: 'Technology Programs',
    icon: Monitor,
    category: 'Technology'
  }, {
    name: 'Test Preparation Programs',
    icon: FileText,
    category: 'Education'
  }, {
    name: 'Tourism and Hospitality Programs',
    icon: Hotel,
    category: 'Hospitality'
  }, {
    name: 'License and Training Programs',
    icon: GraduationCap,
    category: 'Professional'
  }, {
    name: 'Transportation and Logistics Programs',
    icon: Car,
    category: 'Transportation'
  }
];

export const popularSubjects = ['Computer Science', 'Business Administration', 'Engineering', 'Medicine', 'Psychology', 'Arts & Design', 'Data Science', 'Marketing'];
export const locations = ['United States', 'United Kingdom', 'Germany', 'Canada', 'Australia', 'Netherlands', 'Sweden', 'Switzerland'];

export const megaSearchCategories: MegaSearchCategory[] = [
  { name: 'Degrees', icon: GraduationCap, description: 'Bachelor, Master, PhD programs' },
  { name: 'Subjects', icon: BookOpen, description: 'Academic fields and disciplines' },
  { name: 'Schools', icon: Building, description: 'Universities and institutions' },
  { name: 'Scholarships', icon: Award, description: 'Financial aid and grants' },
  { name: 'Articles', icon: FileText, description: 'Study guides and resources' }
];

export const recentSearches = [
  'Engineering Degrees in Spain',
  'Free Masters Programs',
  'Erasmus Programs',
  'Dual Masters in Europe'
];

export const popularSearches = [
  'MBA in London',
  'Computer Science PhD',
  'Medicine in Germany',
  'Online Masters'
];

export const searchImplementations: SearchImplementation[] = [
  {
    id: 'structured',
    name: 'Current Implementation',
    description: 'Dropdown-based structured search'
  }, {
    id: 'freetext',
    name: 'Free Text Search',
    description: 'Google-style text input with suggestions'
  }, {
    id: 'amazon',
    name: 'Category + Search',
    description: 'Amazon-style category dropdown with search'
  }, {
    id: 'visual',
    name: 'Visual Discovery',
    description: 'Category-based visual exploration'
  }, {
    id: 'mega',
    name: 'Mega Search',
    description: 'Combined category selection with free text search'
  }
];
