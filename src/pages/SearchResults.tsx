import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, Globe, GraduationCap, Calendar, BookOpen, Award, Building, ChevronDown, X, Star, User, Eye, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import NoResults from '@/components/search/NoResults';
import ProgramCard from '@/components/search/cards/ProgramCard';
import SchoolCard from '@/components/search/cards/SchoolCard';
import ScholarshipCard from '@/components/search/cards/ScholarshipCard';
import ArticleCard from '@/components/search/cards/ArticleCard';
import PromotedBanner from '@/components/search/cards/PromotedBanner';
import FilterSection from '@/components/search/FilterSection';
import type { SearchResult } from "@/types/search";

const mockResults: SearchResult[] = [
  {
    id: '1',
    type: 'program',
    title: 'Master of Computer Science',
    description: 'Comprehensive program covering advanced computing concepts, algorithms, and software engineering.',
    location: 'MIT, Boston, USA',
    duration: '2 years',
    language: 'English',
    deadline: '2024-12-15',
    degreeType: 'Masters',
    fieldOfStudy: 'Computer Science',
    studyPace: 'Full-time',
    studyFormat: 'On-campus',
    tuitionFee: '$55,000/year',
    rating: 4.8,
    institution: 'Massachusetts Institute of Technology',
    isPromoted: true
  },
  {
    id: '2',
    type: 'program',
    title: 'Bachelor of Business Administration',
    description: 'Comprehensive business program with focus on leadership and entrepreneurship.',
    location: 'London, UK',
    duration: '3 years',
    language: 'English',
    deadline: '2025-01-15',
    degreeType: 'Bachelors',
    fieldOfStudy: 'Business',
    studyPace: 'Full-time',
    studyFormat: 'Hybrid',
    tuitionFee: '£25,000/year',
    rating: 4.5,
    institution: 'London Business School',
    isPromoted: true
  },
  {
    id: '3',
    type: 'program',
    title: 'Master of Data Science',
    description: 'Advanced program in data analytics, machine learning, and big data technologies.',
    location: 'Stanford, CA, USA',
    duration: '2 years',
    language: 'English',
    deadline: '2024-11-30',
    degreeType: 'Masters',
    fieldOfStudy: 'Computer Science',
    studyPace: 'Full-time',
    studyFormat: 'On-campus',
    tuitionFee: '$58,000/year',
    rating: 4.9,
    institution: 'Stanford University',
    isPromoted: true
  },
  {
    id: '4',
    type: 'program',
    title: 'Bachelor of Engineering',
    description: 'Comprehensive engineering program with specializations in multiple disciplines.',
    location: 'Toronto, Canada',
    duration: '4 years',
    language: 'English',
    deadline: '2025-02-01',
    degreeType: 'Bachelors',
    fieldOfStudy: 'Engineering',
    studyPace: 'Full-time',
    studyFormat: 'On-campus',
    tuitionFee: 'CAD 35,000/year',
    rating: 4.3,
    institution: 'University of Toronto'
  },
  {
    id: '5',
    type: 'program',
    title: 'Master of Public Health',
    description: 'Interdisciplinary program focusing on population health and disease prevention.',
    location: 'Harvard, MA, USA',
    duration: '2 years',
    language: 'English',
    deadline: '2025-01-10',
    degreeType: 'Masters',
    fieldOfStudy: 'Medicine',
    studyPace: 'Full-time',
    studyFormat: 'Hybrid',
    tuitionFee: '$52,000/year',
    rating: 4.6,
    institution: 'Harvard University'
  },
  {
    id: '6',
    type: 'program',
    title: 'Bachelor of Arts in Psychology',
    description: 'Explore human behavior and mental processes with hands-on research opportunities.',
    location: 'Oxford, UK',
    duration: '3 years',
    language: 'English',
    deadline: '2025-01-20',
    degreeType: 'Bachelors',
    fieldOfStudy: 'Arts',
    studyPace: 'Full-time',
    studyFormat: 'On-campus',
    tuitionFee: '£22,000/year',
    rating: 4.4,
    institution: 'Oxford University'
  },
  {
    id: '7',
    type: 'program',
    title: 'Master of Fine Arts',
    description: 'Creative program for aspiring artists and designers with studio-based learning.',
    location: 'New York, USA',
    duration: '2 years',
    language: 'English',
    deadline: '2024-12-01',
    degreeType: 'Masters',
    fieldOfStudy: 'Arts',
    studyPace: 'Full-time',
    studyFormat: 'On-campus',
    tuitionFee: '$48,000/year',
    rating: 4.2,
    institution: 'Parsons School of Design'
  },
  {
    id: '8',
    type: 'program',
    title: 'Bachelor of Law',
    description: 'Comprehensive legal education with focus on international and commercial law.',
    location: 'Sydney, Australia',
    duration: '3 years',
    language: 'English',
    deadline: '2025-02-15',
    degreeType: 'Bachelors',
    fieldOfStudy: 'Law',
    studyPace: 'Full-time',
    studyFormat: 'On-campus',
    tuitionFee: 'AUD 28,000/year',
    rating: 4.5,
    institution: 'University of Sydney'
  },
  {
    id: '9',
    type: 'program',
    title: 'Master of Architecture',
    description: 'Professional degree program combining design theory with practical building experience.',
    location: 'Barcelona, Spain',
    duration: '2 years',
    language: 'English',
    deadline: '2025-01-05',
    degreeType: 'Masters',
    fieldOfStudy: 'Arts',
    studyPace: 'Full-time',
    studyFormat: 'On-campus',
    tuitionFee: '€18,000/year',
    rating: 4.7,
    institution: 'ETSAB Barcelona'
  },
  {
    id: '10',
    type: 'program',
    title: 'Bachelor of Environmental Science',
    description: 'Interdisciplinary program addressing climate change and environmental challenges.',
    location: 'Vancouver, Canada',
    duration: '4 years',
    language: 'English',
    deadline: '2025-01-30',
    degreeType: 'Bachelors',
    fieldOfStudy: 'STEM',
    studyPace: 'Full-time',
    studyFormat: 'Hybrid',
    tuitionFee: 'CAD 32,000/year',
    rating: 4.3,
    institution: 'University of British Columbia'
  },
  {
    id: '11',
    type: 'program',
    title: 'Master of International Business',
    description: 'Global business program with international exchange opportunities.',
    location: 'Singapore',
    duration: '18 months',
    language: 'English',
    deadline: '2024-12-20',
    degreeType: 'Masters',
    fieldOfStudy: 'Business',
    studyPace: 'Full-time',
    studyFormat: 'On-campus',
    tuitionFee: 'SGD 45,000/year',
    rating: 4.6,
    institution: 'National University of Singapore'
  },
  {
    id: '12',
    type: 'program',
    title: 'Bachelor of Biomedical Engineering',
    description: 'Cutting-edge program combining engineering principles with medical applications.',
    location: 'Zurich, Switzerland',
    duration: '3 years',
    language: 'English',
    deadline: '2025-02-10',
    degreeType: 'Bachelors',
    fieldOfStudy: 'Engineering',
    studyPace: 'Full-time',
    studyFormat: 'On-campus',
    tuitionFee: 'CHF 1,500/year',
    rating: 4.8,
    institution: 'ETH Zurich'
  },
  {
    id: '13',
    type: 'program',
    title: 'Master of Renewable Energy',
    description: 'Specialized program in sustainable energy technologies and policy.',
    location: 'Copenhagen, Denmark',
    duration: '2 years',
    language: 'English',
    deadline: '2025-01-25',
    degreeType: 'Masters',
    fieldOfStudy: 'Engineering',
    studyPace: 'Full-time',
    studyFormat: 'Hybrid',
    tuitionFee: '€15,000/year',
    rating: 4.5,
    institution: 'Technical University of Denmark'
  },
  {
    id: '14',
    type: 'program',
    title: 'Bachelor of Digital Media',
    description: 'Creative technology program focusing on digital design and interactive media.',
    location: 'Amsterdam, Netherlands',
    duration: '3 years',
    language: 'English',
    deadline: '2025-02-05',
    degreeType: 'Bachelors',
    fieldOfStudy: 'Arts',
    studyPace: 'Full-time',
    studyFormat: 'On-campus',
    tuitionFee: '€8,500/year',
    rating: 4.4,
    institution: 'Amsterdam University of Applied Sciences'
  },
  {
    id: '15',
    type: 'program',
    title: 'Master of Cybersecurity',
    description: 'Advanced program in information security, ethical hacking, and digital forensics.',
    location: 'Tel Aviv, Israel',
    duration: '2 years',
    language: 'English',
    deadline: '2024-12-10',
    degreeType: 'Masters',
    fieldOfStudy: 'Computer Science',
    studyPace: 'Full-time',
    studyFormat: 'On-campus',
    tuitionFee: '$25,000/year',
    rating: 4.7,
    institution: 'Tel Aviv University'
  },
  {
    id: '28',
    type: 'school',
    title: 'Harvard University',
    description: 'Prestigious Ivy League university known for excellence in research, medicine, business, and law.',
    location: 'Cambridge, MA, USA',
    establishedYear: '1636',
    studentCount: '23,000+',
    acceptanceRate: '3.4%',
    ranking: '#1 Global',
    rating: 4.9,
    fieldOfStudy: 'Multi-disciplinary'
  },
  {
    id: '29',
    type: 'school',
    title: 'University of Oxford',
    description: 'World-renowned British university with over 900 years of academic excellence.',
    location: 'Oxford, UK',
    establishedYear: '1096',
    studentCount: '24,000+',
    acceptanceRate: '17.5%',
    ranking: '#2 Global',
    rating: 4.8,
    fieldOfStudy: 'Multi-disciplinary'
  },
  {
    id: '30',
    type: 'school',
    title: 'ETH Zurich',
    description: 'Leading European technical university known for engineering and technology programs.',
    location: 'Zurich, Switzerland',
    establishedYear: '1855',
    studentCount: '22,000+',
    acceptanceRate: '8%',
    ranking: '#7 Global (Engineering)',
    rating: 4.7,
    fieldOfStudy: 'Engineering & Technology'
  },
  {
    id: '31',
    type: 'school',
    title: 'University of Melbourne',
    description: 'Top-ranked Australian university with strong research focus and diverse programs.',
    location: 'Melbourne, Australia',
    establishedYear: '1853',
    studentCount: '50,000+',
    acceptanceRate: '70%',
    ranking: '#33 Global',
    rating: 4.5,
    fieldOfStudy: 'Multi-disciplinary'
  },
  {
    id: '32',
    type: 'school',
    title: 'University of Toronto',
    description: "Canada's leading research university with excellence across all disciplines.",
    location: 'Toronto, Canada',
    establishedYear: '1827',
    studentCount: '97,000+',
    acceptanceRate: '43%',
    ranking: '#25 Global',
    rating: 4.6,
    fieldOfStudy: 'Multi-disciplinary'
  },
  {
    id: '33',
    type: 'school',
    title: 'National University of Singapore',
    description: "Asia's leading global university known for innovation and research excellence.",
    location: 'Singapore',
    establishedYear: '1905',
    studentCount: '40,000+',
    acceptanceRate: '5.2%',
    ranking: '#11 Global',
    rating: 4.8,
    fieldOfStudy: 'Multi-disciplinary'
  },
  {
    id: '34',
    type: 'school',
    title: 'Sorbonne University',
    description: 'Historic French university renowned for humanities, sciences, and research.',
    location: 'Paris, France',
    establishedYear: '1150',
    studentCount: '55,000+',
    acceptanceRate: '20%',
    ranking: '#72 Global',
    rating: 4.4,
    fieldOfStudy: 'Multi-disciplinary'
  },
  {
    id: '35',
    type: 'school',
    title: 'Technical University of Munich',
    description: "Germany's top technical university focusing on engineering and natural sciences.",
    location: 'Munich, Germany',
    establishedYear: '1868',
    studentCount: '45,000+',
    acceptanceRate: '8%',
    ranking: '#50 Global',
    rating: 4.6,
    fieldOfStudy: 'Engineering & Technology'
  },
  {
    id: '36',
    type: 'school',
    title: 'University of Amsterdam',
    description: 'Netherlands\' largest university with strong international programs and research.',
    location: 'Amsterdam, Netherlands',
    establishedYear: '1632',
    studentCount: '42,000+',
    acceptanceRate: '50%',
    ranking: '#55 Global',
    rating: 4.3,
    fieldOfStudy: 'Multi-disciplinary'
  },
  {
    id: '37',
    type: 'school',
    title: 'Seoul National University',
    description: 'South Korea\'s most prestigious university with excellence in all academic fields.',
    location: 'Seoul, South Korea',
    establishedYear: '1946',
    studentCount: '28,000+',
    acceptanceRate: '20%',
    ranking: '#29 Global',
    rating: 4.7,
    fieldOfStudy: 'Multi-disciplinary'
  },
  {
    id: '16',
    type: 'scholarship',
    title: 'Merit-Based Excellence Scholarship',
    description: 'Full tuition scholarship for outstanding international students in STEM fields.',
    location: 'Stanford, USA',
    deadline: '2024-11-30',
    fieldOfStudy: 'STEM',
    tuitionFee: '$75,000 coverage',
    institution: 'Stanford University'
  },
  {
    id: '17',
    type: 'scholarship',
    title: 'Global Leaders Scholarship',
    description: 'Scholarship for students demonstrating leadership potential and academic excellence.',
    location: 'Cambridge, UK',
    deadline: '2024-12-15',
    fieldOfStudy: 'Business',
    tuitionFee: '£40,000 coverage',
    institution: 'Cambridge University'
  },
  {
    id: '18',
    type: 'scholarship',
    title: 'Diversity and Inclusion Grant',
    description: 'Supporting underrepresented students in pursuing higher education goals.',
    location: 'Toronto, Canada',
    deadline: '2025-01-10',
    fieldOfStudy: 'Arts',
    tuitionFee: 'CAD 30,000 coverage',
    institution: 'University of Toronto'
  },
  {
    id: '19',
    type: 'scholarship',
    title: 'Innovation in Technology Award',
    description: 'For students pursuing cutting-edge research in technology and engineering.',
    location: 'Munich, Germany',
    deadline: '2024-12-05',
    fieldOfStudy: 'Engineering',
    tuitionFee: '€25,000 coverage',
    institution: 'Technical University of Munich'
  },
  {
    id: '20',
    type: 'scholarship',
    title: 'Sustainable Future Scholarship',
    description: 'Supporting students working on environmental and sustainability projects.',
    location: 'Stockholm, Sweden',
    deadline: '2025-01-20',
    fieldOfStudy: 'STEM',
    tuitionFee: '€20,000 coverage',
    institution: 'Royal Institute of Technology'
  },
  {
    id: '21',
    type: 'article',
    title: 'Study a Masters in Europe: The Complete Guide',
    description: 'Everything you need to know about pursuing a Masters degree in Europe, including costs, application requirements, and the best programs available.',
    location: 'Europe',
    fieldOfStudy: 'Masters Programs'
  },
  {
    id: '22',
    type: 'article',
    title: 'Scholarship Opportunities for International Students',
    description: 'Discover the best scholarships available for international students, including merit-based, need-based, and country-specific funding options.',
    fieldOfStudy: 'Scholarships'
  },
  {
    id: '23',
    type: 'article',
    title: 'Top 10 Universities for Computer Science in 2024',
    description: 'Ranking of the best computer science programs worldwide based on research output, faculty quality, and graduate outcomes.',
    fieldOfStudy: 'Computer Science',
    location: 'Global'
  },
  {
    id: '24',
    type: 'article',
    title: 'How to Write a Winning Personal Statement',
    description: 'Expert tips and strategies for crafting compelling personal statements that stand out to admissions committees.',
    fieldOfStudy: 'Application Tips'
  },
  {
    id: '25',
    type: 'article',
    title: 'MBA vs Masters: Which Degree is Right for You?',
    description: 'Comprehensive comparison of MBA and specialized Masters programs to help you make the right career decision.',
    fieldOfStudy: 'Business',
    location: 'Global'
  },
  {
    id: '26',
    type: 'article',
    title: 'Student Life in Canada: What to Expect',
    description: 'A complete guide to living and studying in Canada, including culture, costs, and practical tips for international students.',
    fieldOfStudy: 'Student Life',
    location: 'Canada'
  },
  {
    id: '27',
    type: 'article',
    title: 'The Future of Online Learning in Higher Education',
    description: 'Exploring how digital transformation is reshaping university education and what it means for students.',
    fieldOfStudy: 'Education Technology'
  }
];

const PET_IMAGES = [
  // Cats (23)
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1592194991823-67916219b674?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1533738363-b7f9a261e36c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1561948955-570b270e9de1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1509522138144-09c3ba3f5244?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1548546738-8509cb246ed3?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1488740304459-45c4277e7d3d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1516371294522-221f2154e5a9?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1511044568934-09c3ba3f5244?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1494256997604-768d1f6089b3?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1513245543132-31f507416b26?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1570425622143-4f597a7ab1a4?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1574231164645-d6f0e85535a2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1588806536343-a6a3b984577b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=400&q=80",
  // Dogs (15)
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1537151671928-5b1c6c18a3b6?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1601911739343-433890a5749f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=400&q=80",
  "/lovable-uploads/7b031b6e-0c51-445d-bb2e-86dabb789f23.png" // User's German Pinscher
];

// Helper to get a unique, non-repeated pet image for each card per page
const getNonRepeatingImageForPage = (() => {
  const pageImageCache = new Map<string, string[]>();

  return (resultsOnPage: SearchResult[], index: number, page: number) => {
    // Create a key for the current results on the given page
    const pageKey = resultsOnPage.map(r => r.id).join('-') + `-page${page}`;
    
    // Shuffle and cache images only if we haven't seen this page key before
    if (!pageImageCache.has(pageKey)) {
      const shuffled = PET_IMAGES.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      pageImageCache.set(pageKey, shuffled);
    }

    const shuffledImages = pageImageCache.get(pageKey)!;
    // Cycle through images; with enough images, this prevents repeats on a single page
    return shuffledImages[index % shuffledImages.length];
  };
})();

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>(mockResults);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(mockResults);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentTypeFilter, setContentTypeFilter] = useState<string>('all');
  const resultsPerPage = 37;

  const [selectedDegreeTypes, setSelectedDegreeTypes] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedPaces, setSelectedPaces] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('relevance');

  const degreeTypes = ['Bachelors', 'Masters', 'PhD', 'Certificate', 'Diploma'];
  const fieldsOfStudy = ['Computer Science', 'Business', 'Engineering', 'Medicine', 'Arts', 'Law', 'STEM'];
  const locations = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Netherlands'];
  const durations = ['1 year', '2 years', '3 years', '4 years', '5+ years'];
  const studyPaces = ['Full-time', 'Part-time', 'Flexible'];
  const languages = ['English', 'German', 'French', 'Spanish', 'Dutch'];
  const studyFormats = ['On-campus', 'Online', 'Hybrid'];

  useEffect(() => {
    let filtered = results.filter(result => {
      if (searchQuery && searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = 
          result.title.toLowerCase().includes(query) ||
          result.description.toLowerCase().includes(query) ||
          (result.institution && result.institution.toLowerCase().includes(query)) ||
          (result.fieldOfStudy && result.fieldOfStudy.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }
      
      if (contentTypeFilter !== 'all' && result.type !== contentTypeFilter) return false;
      
      if (selectedDegreeTypes.length > 0 && result.degreeType && !selectedDegreeTypes.includes(result.degreeType)) return false;
      if (selectedFields.length > 0 && result.fieldOfStudy && !selectedFields.includes(result.fieldOfStudy)) return false;
      if (selectedLocations.length > 0 && result.location && !selectedLocations.some(loc => result.location?.includes(loc))) return false;
      if (selectedDurations.length > 0 && result.duration && !selectedDurations.includes(result.duration)) return false;
      if (selectedPaces.length > 0 && result.studyPace && !selectedPaces.includes(result.studyPace)) return false;
      if (selectedLanguages.length > 0 && result.language && !selectedLanguages.includes(result.language)) return false;
      if (selectedFormats.length > 0 && result.studyFormat && !selectedFormats.includes(result.studyFormat)) return false;
      return true;
    });

    if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'deadline') {
      filtered.sort((a, b) => {
        if (!a.deadline || !b.deadline) return 0;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    }
    setFilteredResults(filtered);
    setCurrentPage(1);
  }, [results, selectedDegreeTypes, selectedFields, selectedLocations, selectedDurations, selectedPaces, selectedLanguages, selectedFormats, sortBy, contentTypeFilter, searchQuery]);

  const clearAllFilters = () => {
    setSelectedDegreeTypes([]);
    setSelectedFields([]);
    setSelectedLocations([]);
    setSelectedDurations([]);
    setSelectedPaces([]);
    setSelectedLanguages([]);
    setSelectedFormats([]);
    setContentTypeFilter('all');
  };

  const handleNewSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  const getActiveFiltersCount = () => {
    return selectedDegreeTypes.length + selectedFields.length + selectedLocations.length + selectedDurations.length + selectedPaces.length + selectedLanguages.length + selectedFormats.length;
  };

  const createMixedPageResults = () => {
    const programs = filteredResults.filter(r => r.type === 'program');
    const schools = filteredResults.filter(r => r.type === 'school');
    const scholarships = filteredResults.filter(r => r.type === 'scholarship');
    const articles = filteredResults.filter(r => r.type === 'article');
    
    const itemsPerPage = 37;
    const startIndex = (currentPage - 1) * itemsPerPage;
    
    const programsPerPage = 15;
    const schoolsPerPage = 10;
    const scholarshipsPerPage = 5;
    const articlesPerPage = 7;
    
    const programStart = Math.floor((currentPage - 1) * programsPerPage);
    const schoolStart = Math.floor((currentPage - 1) * schoolsPerPage);
    const scholarshipStart = Math.floor((currentPage - 1) * scholarshipsPerPage);
    const articleStart = Math.floor((currentPage - 1) * articlesPerPage);
    
    const pagePrograms = programs.slice(programStart, programStart + programsPerPage);
    const pageSchools = schools.slice(schoolStart, schoolStart + schoolsPerPage);
    const pageScholarships = scholarships.slice(scholarshipStart, scholarshipStart + scholarshipsPerPage);
    const pageArticles = articles.slice(articleStart, articleStart + articlesPerPage);
    
    const mixedResults: (SearchResult | { id: string; type: 'banner' })[] = [];
    
    const promotedPrograms = pagePrograms.filter(p => p.isPromoted).slice(0, 3);
    const regularPrograms = pagePrograms.filter(p => !p.isPromoted);
    const remainingPromoted = pagePrograms.filter(p => p.isPromoted).slice(3);
    
    promotedPrograms.forEach(program => mixedResults.push(program));
    
    const remainingContent = [
      ...regularPrograms,
      ...remainingPromoted,
      ...pageSchools,
      ...pageScholarships,
      ...pageArticles
    ];
    
    const shuffledContent = remainingContent.sort(() => Math.random() - 0.5);
    
    shuffledContent.forEach((item, index) => {
      if (mixedResults.length === 5 && currentPage === 1) {
        mixedResults.push({ id: 'banner', type: 'banner' });
      }
      mixedResults.push(item);
    });
    
    return mixedResults;
  };

  const currentResults = createMixedPageResults();

  // For determining which results to show pet images for on this page:
  const visibleResults = currentResults.filter(r => typeof r === 'object' && (r as any).type !== 'banner');

  const getTotalPages = () => {
    if (contentTypeFilter === 'program') {
      return Math.ceil(filteredResults.filter(r => r.type === 'program').length / 15);
    } else if (contentTypeFilter === 'school') {
      return Math.ceil(filteredResults.filter(r => r.type === 'school').length / 10);
    } else if (contentTypeFilter === 'scholarship') {
      return Math.ceil(filteredResults.filter(r => r.type === 'scholarship').length / 5);
    } else if (contentTypeFilter === 'article') {
      return Math.ceil(filteredResults.filter(r => r.type === 'article').length / 7);
    } else {
      return Math.max(
        Math.ceil(filteredResults.filter(r => r.type === 'program').length / 15),
        Math.ceil(filteredResults.filter(r => r.type === 'school').length / 10),
        Math.ceil(filteredResults.filter(r => r.type === 'scholarship').length / 5),
        Math.ceil(filteredResults.filter(r => r.type === 'article').length / 7),
        1
      );
    }
  };

  const totalPages = getTotalPages();

  const getResultTypeIcon = (type: string) => {
    switch (type) {
      case 'program':
        return <GraduationCap className="w-4 h-4" />;
      case 'scholarship':
        return <Award className="w-4 h-4" />;
      case 'article':
        return <BookOpen className="w-4 h-4" />;
      case 'school':
        return <Building className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-80 flex-shrink-0`}>
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <X className="w-4 h-4" />
                </Button>
                {getActiveFiltersCount() > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-blue-600">
                    Clear all
                  </Button>
                )}
              </div>

              <FilterSection
                title="Degree Type"
                options={degreeTypes}
                selected={selectedDegreeTypes}
                onSelectionChange={setSelectedDegreeTypes}
              />

              <FilterSection
                title="Field of Study"
                options={fieldsOfStudy}
                selected={selectedFields}
                onSelectionChange={setSelectedFields}
              />

              <FilterSection
                title="Location"
                options={locations}
                selected={selectedLocations}
                onSelectionChange={setSelectedLocations}
              />

              <FilterSection
                title="Duration"
                options={durations}
                selected={selectedDurations}
                onSelectionChange={setSelectedDurations}
              />

              <FilterSection
                title="Study Pace"
                options={studyPaces}
                selected={selectedPaces}
                onSelectionChange={setSelectedPaces}
              />

              <FilterSection
                title="Language"
                options={languages}
                selected={selectedLanguages}
                onSelectionChange={setSelectedLanguages}
              />

              <FilterSection
                title="Study Format"
                options={studyFormats}
                selected={selectedFormats}
                onSelectionChange={setSelectedFormats}
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Search Results
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {filteredResults.length} results found
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
                </Button>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="deadline">Application Deadline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <div className="flex gap-2 border-b border-gray-200">
                <button
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    contentTypeFilter === 'all'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setContentTypeFilter('all')}
                >
                  All Results ({results.filter(result => {
                    if (searchQuery && searchQuery.trim()) {
                      const query = searchQuery.toLowerCase().trim();
                      const matchesSearch = 
                        result.title.toLowerCase().includes(query) ||
                        result.description.toLowerCase().includes(query) ||
                        (result.institution && result.institution.toLowerCase().includes(query)) ||
                        (result.fieldOfStudy && result.fieldOfStudy.toLowerCase().includes(query));
                      
                      if (!matchesSearch) return false;
                    }
                    
                    if (selectedDegreeTypes.length > 0 && result.degreeType && !selectedDegreeTypes.includes(result.degreeType)) return false;
                    if (selectedFields.length > 0 && result.fieldOfStudy && !selectedFields.includes(result.fieldOfStudy)) return false;
                    if (selectedLocations.length > 0 && result.location && !selectedLocations.some(loc => result.location?.includes(loc))) return false;
                    if (selectedDurations.length > 0 && result.duration && !selectedDurations.includes(result.duration)) return false;
                    if (selectedPaces.length > 0 && result.studyPace && !selectedPaces.includes(result.studyPace)) return false;
                    if (selectedLanguages.length > 0 && result.language && !selectedLanguages.includes(result.language)) return false;
                    if (selectedFormats.length > 0 && result.studyFormat && !selectedFormats.includes(result.studyFormat)) return false;
                    return true;
                  }).length})
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    contentTypeFilter === 'program'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setContentTypeFilter('program')}
                >
                  <GraduationCap className="w-4 h-4 inline mr-2" />
                  Programs ({results.filter(result => {
                    if (result.type !== 'program') return false;
                    
                    if (searchQuery && searchQuery.trim()) {
                      const query = searchQuery.toLowerCase().trim();
                      const matchesSearch = 
                        result.title.toLowerCase().includes(query) ||
                        result.description.toLowerCase().includes(query) ||
                        (result.institution && result.institution.toLowerCase().includes(query)) ||
                        (result.fieldOfStudy && result.fieldOfStudy.toLowerCase().includes(query));
                      
                      if (!matchesSearch) return false;
                    }
                    
                    if (selectedDegreeTypes.length > 0 && result.degreeType && !selectedDegreeTypes.includes(result.degreeType)) return false;
                    if (selectedFields.length > 0 && result.fieldOfStudy && !selectedFields.includes(result.fieldOfStudy)) return false;
                    if (selectedLocations.length > 0 && result.location && !selectedLocations.some(loc => result.location?.includes(loc))) return false;
                    if (selectedDurations.length > 0 && result.duration && !selectedDurations.includes(result.duration)) return false;
                    if (selectedPaces.length > 0 && result.studyPace && !selectedPaces.includes(result.studyPace)) return false;
                    if (selectedLanguages.length > 0 && result.language && !selectedLanguages.includes(result.language)) return false;
                    if (selectedFormats.length > 0 && result.studyFormat && !selectedFormats.includes(result.studyFormat)) return false;
                    return true;
                  }).length})
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    contentTypeFilter === 'school'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setContentTypeFilter('school')}
                >
                  <Building className="w-4 h-4 inline mr-2" />
                  Universities ({results.filter(result => {
                    if (result.type !== 'school') return false;
                    
                    if (searchQuery && searchQuery.trim()) {
                      const query = searchQuery.toLowerCase().trim();
                      const matchesSearch = 
                        result.title.toLowerCase().includes(query) ||
                        result.description.toLowerCase().includes(query) ||
                        (result.institution && result.institution.toLowerCase().includes(query)) ||
                        (result.fieldOfStudy && result.fieldOfStudy.toLowerCase().includes(query));
                      
                      if (!matchesSearch) return false;
                    }
                    
                    if (selectedDegreeTypes.length > 0 && result.degreeType && !selectedDegreeTypes.includes(result.degreeType)) return false;
                    if (selectedFields.length > 0 && result.fieldOfStudy && !selectedFields.includes(result.fieldOfStudy)) return false;
                    if (selectedLocations.length > 0 && result.location && !selectedLocations.some(loc => result.location?.includes(loc))) return false;
                    if (selectedDurations.length > 0 && result.duration && !selectedDurations.includes(result.duration)) return false;
                    if (selectedPaces.length > 0 && result.studyPace && !selectedPaces.includes(result.studyPace)) return false;
                    if (selectedLanguages.length > 0 && result.language && !selectedLanguages.includes(result.language)) return false;
                    if (selectedFormats.length > 0 && result.studyFormat && !selectedFormats.includes(result.studyFormat)) return false;
                    return true;
                  }).length})
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    contentTypeFilter === 'scholarship'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setContentTypeFilter('scholarship')}
                >
                  <Award className="w-4 h-4 inline mr-2" />
                  Scholarships ({results.filter(result => {
                    if (result.type !== 'scholarship') return false;
                    
                    if (searchQuery && searchQuery.trim()) {
                      const query = searchQuery.toLowerCase().trim();
                      const matchesSearch = 
                        result.title.toLowerCase().includes(query) ||
                        result.description.toLowerCase().includes(query) ||
                        (result.institution && result.institution.toLowerCase().includes(query)) ||
                        (result.fieldOfStudy && result.fieldOfStudy.toLowerCase().includes(query));
                      
                      if (!matchesSearch) return false;
                    }
                    
                    if (selectedDegreeTypes.length > 0 && result.degreeType && !selectedDegreeTypes.includes(result.degreeType)) return false;
                    if (selectedFields.length > 0 && result.fieldOfStudy && !selectedFields.includes(result.fieldOfStudy)) return false;
                    if (selectedLocations.length > 0 && result.location && !selectedLocations.some(loc => result.location?.includes(loc))) return false;
                    if (selectedDurations.length > 0 && result.duration && !selectedDurations.includes(result.duration)) return false;
                    if (selectedPaces.length > 0 && result.studyPace && !selectedPaces.includes(result.studyPace)) return false;
                    if (selectedLanguages.length > 0 && result.language && !selectedLanguages.includes(result.language)) return false;
                    if (selectedFormats.length > 0 && result.studyFormat && !selectedFormats.includes(result.studyFormat)) return false;
                    return true;
                  }).length})
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    contentTypeFilter === 'article'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setContentTypeFilter('article')}
                >
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Articles ({results.filter(result => {
                    if (result.type !== 'article') return false;
                    
                    if (searchQuery && searchQuery.trim()) {
                      const query = searchQuery.toLowerCase().trim();
                      const matchesSearch = 
                        result.title.toLowerCase().includes(query) ||
                        result.description.toLowerCase().includes(query) ||
                        (result.institution && result.institution.toLowerCase().includes(query)) ||
                        (result.fieldOfStudy && result.fieldOfStudy.toLowerCase().includes(query));
                      
                      if (!matchesSearch) return false;
                    }
                    
                    if (selectedDegreeTypes.length > 0 && result.degreeType && !selectedDegreeTypes.includes(result.degreeType)) return false;
                    if (selectedFields.length > 0 && result.fieldOfStudy && !selectedFields.includes(result.fieldOfStudy)) return false;
                    if (selectedLocations.length > 0 && result.location && !selectedLocations.some(loc => result.location?.includes(loc))) return false;
                    if (selectedDurations.length > 0 && result.duration && !selectedDurations.includes(result.duration)) return false;
                    if (selectedPaces.length > 0 && result.studyPace && !selectedPaces.includes(result.studyPace)) return false;
                    if (selectedLanguages.length > 0 && result.language && !selectedLanguages.includes(result.language)) return false;
                    if (selectedFormats.length > 0 && result.studyFormat && !selectedFormats.includes(result.studyFormat)) return false;
                    return true;
                  }).length})
                </button>
              </div>
            </div>

            {getActiveFiltersCount() > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedDegreeTypes.map((type) => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      {type}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDegreeTypes(selectedDegreeTypes.filter((t) => t !== type))} />
                    </Badge>
                  ))}
                  {selectedFields.map((field) => (
                    <Badge key={field} variant="secondary" className="flex items-center gap-1">
                      {field}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedFields(selectedFields.filter((f) => f !== field))} />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {filteredResults.length === 0 ? (
              <NoResults
                searchQuery={searchQuery}
                onNewSearch={handleNewSearch}
                onClearFilters={clearAllFilters}
                hasActiveFilters={getActiveFiltersCount() > 0}
              />
            ) : (
              <>
                <div className="space-y-6">
                  {currentResults.map((result, index) => {
                    if (result.type === 'banner') {
                      return <div key={result.id}><PromotedBanner /></div>;
                    }

                    // Find the index of the current result within the *visible* results array
                    // to ensure we get a unique image index that accounts for the banner.
                    const visibleResultIndex = visibleResults.findIndex(
                      (r) => (r as SearchResult).id === (result as SearchResult).id
                    );
                    
                    // Fallback to the original index if not found, though it shouldn't happen for non-banner items.
                    const imageIndex = visibleResultIndex !== -1 ? visibleResultIndex : index;

                    const getImage = () => getNonRepeatingImageForPage(
                      visibleResults as SearchResult[],
                      imageIndex,
                      currentPage
                    );

                    return (
                      <div key={result.id}>
                        {result.type === 'program' ? (
                          <ProgramCard result={result as SearchResult} index={index} getImageForResult={getImage} />
                        ) : result.type === 'school' ? (
                          <SchoolCard result={result as SearchResult} index={index} getImageForResult={getImage} />
                        ) : result.type === 'article' ? (
                          <ArticleCard result={result as SearchResult} index={index} getImageForResult={getImage} />
                        ) : result.type === 'scholarship' ? (
                          <ScholarshipCard result={result as SearchResult} index={index} getImageForResult={getImage} />
                        ) : null}
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
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(page);
                                  }}
                                  isActive={currentPage === page}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
