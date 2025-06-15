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

interface SearchResult {
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

const mockResults: SearchResult[] = [
  // Programs (15 total)
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
  // Universities/Schools (10 total)
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
  // Scholarships (5 total)
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
  // Articles (7 total)
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

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>(mockResults);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(mockResults);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentTypeFilter, setContentTypeFilter] = useState<string>('all'); // New state for content type filter
  const resultsPerPage = 37; // 15 programs + 10 schools + 5 scholarships + 7 articles

  // Filter states
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

  // Apply filters and search query
  useEffect(() => {
    let filtered = results.filter(result => {
      // Apply search query filter - if query exists, filter by title, description, institution
      if (searchQuery && searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = 
          result.title.toLowerCase().includes(query) ||
          result.description.toLowerCase().includes(query) ||
          (result.institution && result.institution.toLowerCase().includes(query)) ||
          (result.fieldOfStudy && result.fieldOfStudy.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }
      
      // Apply content type filter first
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

    // Apply sorting
    if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'deadline') {
      filtered.sort((a, b) => {
        if (!a.deadline || !b.deadline) return 0;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    }
    setFilteredResults(filtered);
    setCurrentPage(1); // Reset to first page when filters change
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

  // Create mixed content for each page with special positioning
  const createMixedPageResults = () => {
    const programs = filteredResults.filter(r => r.type === 'program');
    const schools = filteredResults.filter(r => r.type === 'school');
    const scholarships = filteredResults.filter(r => r.type === 'scholarship');
    const articles = filteredResults.filter(r => r.type === 'article');
    
    const itemsPerPage = 37;
    const startIndex = (currentPage - 1) * itemsPerPage;
    
    // Calculate pagination for each type
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
    
    // First 3 positions: promoted programs
    const promotedPrograms = pagePrograms.filter(p => p.isPromoted).slice(0, 3);
    const regularPrograms = pagePrograms.filter(p => !p.isPromoted);
    const remainingPromoted = pagePrograms.filter(p => p.isPromoted).slice(3);
    
    // Add first 3 promoted programs
    promotedPrograms.forEach(program => mixedResults.push(program));
    
    // Mix the remaining content (regular programs + all promoted after first 3 + schools + scholarships + articles)
    const remainingContent = [
      ...regularPrograms,
      ...remainingPromoted,
      ...pageSchools,
      ...pageScholarships,
      ...pageArticles
    ];
    
    // Shuffle remaining content
    const shuffledContent = remainingContent.sort(() => Math.random() - 0.5);
    
    // Add shuffled content, inserting banner at position 6 (index 5)
    shuffledContent.forEach((item, index) => {
      if (mixedResults.length === 5 && currentPage === 1) {
        // Insert banner at position 6 on first page
        mixedResults.push({ id: 'banner', type: 'banner' });
      }
      mixedResults.push(item);
    });
    
    return mixedResults;
  };

  const currentResults = createMixedPageResults();
  
  // Calculate total pages based on content type filter
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

  // FilterSection component
  const FilterSection = ({
    title,
    options,
    selected,
    onSelectionChange
  }: {
    title: string;
    options: string[];
    selected: string[];
    onSelectionChange: (values: string[]) => void;
  }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className="mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          {title}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${title}-${option}`}
                  checked={selected.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onSelectionChange([...selected, option]);
                    } else {
                      onSelectionChange(selected.filter((item) => item !== option));
                    }
                  }}
                />
                <label
                  htmlFor={`${title}-${option}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Array of diverse campus images
  const campusImages = [
    'photo-1487958449943-2429e8be8625', // white concrete building
    'photo-1486312338219-ce68d2c6f44d', // person using MacBook Pro - replaced broken ID
    'photo-1605810230434-7631ac76ec81', // group around video screens
    'photo-1581092795360-fd1ca04f0952', // man in office chair
    'photo-1526374965328-7f61d4dc18c5', // Matrix movie still
    'photo-1531297484001-80022131f5a1', // laptop on surface
    'photo-1500375592092-40eb2168fd21', // ocean wave
    'photo-1504893524553-b855bce32c67', // river and rocks
    'photo-1506744038136-46273834b3fb', // water surrounded by trees
    'photo-1501854140801-50d01698950b', // mountains aerial view
    'photo-1615729947596-a598e5de0ab3', // grass and rocky mountain
    'photo-1721322800607-8c38375eef04', // living room
    'photo-1523712999610-f77fbcfc3843', // forest with sunbeam
    'photo-1500673922987-e212871fec22', // yellow lights between trees
    'photo-1472396961693-142e6e269027'  // deer and mountain
  ];

  const articleImages = [
    'photo-1481627834876-b7833e8f5570', // lines of code
    'photo-1461749280684-dccba630e2f6', // Java programming
    'photo-1488590528505-98d2b5aba04b', // gray laptop
    'photo-1518770660439-4636190af475', // circuit board
    'photo-1498050108023-c5249f4df085', // MacBook with code
    'photo-1581091226825-a6a2a5aee158', // person with light bulb
    'photo-1649972904349-6e44c42644a7', // woman with laptop on bed
    'photo-1581091226825-a6a2a5aee158'  // woman with laptop
  ];

  const scholarshipImages = [
    'photo-1523050854058-8df90110c9f1', // graduation caps
    'photo-1517022812141-23620dba5c23', // sheep running
    'photo-1582562124811-c09040d0a901', // cat on textile
    'photo-1618160702438-9b02ab6515c9', // fruit on plate
    'photo-1466721591366-2d5fba72006d'  // antelope and zebra
  ];

  const universityImages = [
    'photo-1607237138185-eedd9c632b0b', // university building
    'photo-1562774053-701939374585', // university campus
    'photo-1541339907198-e08756dedf3f', // university library
    'photo-1580537659466-0a9bfa916a54', // university hall
    'photo-1523050854058-8df90110c9f1', // graduation caps
    'photo-1571019613454-1cb2f99b2d8b', // university courtyard
    'photo-1523240795612-9a054b0db644', // university entrance
    'photo-1498243691581-b145c3f54a5a', // university building facade
    'photo-1507003211169-0a1dd7228f2d', // university campus aerial
    'photo-1519452634265-7b1fbfd1aa1e'  // university at sunset
  ];

  const getImageForResult = (result: SearchResult, index: number) => {
    if (result.type === 'program') {
      return `https://images.unsplash.com/${campusImages[index % campusImages.length]}?w=400&h=400&fit=crop`;
    } else if (result.type === 'article') {
      return `https://images.unsplash.com/${articleImages[index % articleImages.length]}?w=200&h=200&fit=crop`;
    } else if (result.type === 'scholarship') {
      return `https://images.unsplash.com/${scholarshipImages[index % scholarshipImages.length]}?w=200&h=200&fit=crop`;
    } else if (result.type === 'school') {
      return `https://images.unsplash.com/${universityImages[index % universityImages.length]}?w=400&h=400&fit=crop`;
    }
    return 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop';
  };

  const ProgramCard = ({ result, index }: { result: SearchResult; index: number }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative">
      {result.isPromoted && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gray-300 text-gray-600 text-xs">Promoted</Badge>
        </div>
      )}
      <div className="flex">
        {/* Left side - Campus image */}
        <div className="w-48 flex-shrink-0 relative">
          <img src={getImageForResult(result, index)} alt={`${result.institution} campus`} className="w-full h-full object-cover" />
          {/* Institution logo overlay */}
          <div className="absolute bottom-3 left-3">
            <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        {/* Right side - Program details */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start h-full">
            <div className="flex-1">
              {/* Institution name */}
              <p className="text-sm text-gray-600 mb-1">{result.institution}</p>
              
              {/* Program title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {result.title}
              </h3>
              
              {/* Location */}
              <p className="text-sm text-gray-600 mb-4">{result.location}</p>
              
              {/* Program details */}
              <div className="flex flex-wrap gap-4 mb-4">
                {result.degreeType && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    {result.degreeType}
                  </div>
                )}
                {result.duration && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {result.duration}
                  </div>
                )}
                {result.studyFormat && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {result.studyFormat}
                  </div>
                )}
                {result.language && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    {result.language}
                  </div>
                )}
              </div>
              
              {/* Description */}
              <p className="text-sm text-gray-700 line-clamp-2">
                {result.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const SchoolCard = ({ result, index }: { result: SearchResult; index: number }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex">
        {/* Left side - University image */}
        <div className="w-48 flex-shrink-0 relative">
          <img src={getImageForResult(result, index)} alt={`${result.title} campus`} className="w-full h-full object-cover" />
          {/* University logo overlay */}
          <div className="absolute bottom-3 left-3">
            <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        {/* Right side - University details */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start h-full">
            <div className="flex-1">
              {/* University title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {result.title}
              </h3>
              
              {/* Location */}
              <p className="text-sm text-gray-600 mb-4">{result.location}</p>
              
              {/* University details */}
              <div className="flex flex-wrap gap-4 mb-4">
                {result.establishedYear && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Est. {result.establishedYear}
                  </div>
                )}
                {result.studentCount && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    {result.studentCount} students
                  </div>
                )}
                {result.acceptanceRate && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Award className="w-4 h-4" />
                    {result.acceptanceRate} acceptance
                  </div>
                )}
                {result.ranking && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Star className="w-4 h-4" />
                    {result.ranking}
                  </div>
                )}
              </div>
              
              {/* Description */}
              <p className="text-sm text-gray-700 line-clamp-2">
                {result.description}
              </p>
              
              {/* Rating */}
              {result.rating && (
                <div className="flex items-center gap-1 mt-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{result.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

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
          
          {/* Article title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {result.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-3">
            {result.description}
          </p>
          
          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mb-3">
            {result.fieldOfStudy && (
              <Badge variant="secondary" className="text-xs">
                {result.fieldOfStudy}
              </Badge>
            )}
            {result.location && (
              <Badge variant="secondary" className="text-xs">
                {result.location}
              </Badge>
            )}
          </div>
          
          {/* Metadata footer */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>5 min read</span>
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
          {/* Scholarship icon overlay */}
          <div className="absolute bottom-1 right-1">
            <div className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
              <Award className="w-3 h-3 text-yellow-600" />
            </div>
          </div>
        </div>
        
        {/* Right side - Scholarship content */}
        <div className="flex-1 min-w-0 p-4">
          {/* Publication date */}
          <p className="text-xs text-gray-500 mb-2">Dec 2024</p>
          
          {/* Scholarship title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {result.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-1 leading-relaxed mb-3">
            {result.description}
          </p>
          
          {/* Metadata footer */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {result.fieldOfStudy && (
              <div className="flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                <span>{result.fieldOfStudy}</span>
              </div>
            )}
            {result.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{result.location}</span>
              </div>
            )}
            {result.deadline && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Deadline: {new Date(result.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  const PromotedBanner = () => (
    <Card className="overflow-hidden bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200">
      <div className="flex items-center p-6">
        <div className="flex-shrink-0 mr-6">
          <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-pink-600" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Best programs for you
          </h3>
          <p className="text-gray-600">
            Answer a few questions and we'll match you with programs!
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button className="bg-pink-600 hover:bg-pink-700 text-white">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use shared Header component */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
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

          {/* Results Area */}
          <div className="flex-1">
            {/* Results Header */}
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

            {/* Content Type Filter Tabs */}
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

            {/* Active Filters */}
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

            {/* Results or No Results */}
            {filteredResults.length === 0 ? (
              <NoResults
                searchQuery={searchQuery}
                onNewSearch={handleNewSearch}
                onClearFilters={clearAllFilters}
                hasActiveFilters={getActiveFiltersCount() > 0}
              />
            ) : (
              <>
                {/* Results */}
                <div className="space-y-6">
                  {currentResults.map((result, index) => (
                    <div key={result.id}>
                      {result.type === 'banner' ? (
                        <PromotedBanner />
                      ) : result.type === 'program' ? (
                        <ProgramCard result={result as SearchResult} index={index} />
                      ) : result.type === 'school' ? (
                        <SchoolCard result={result as SearchResult} index={index} />
                      ) : result.type === 'article' ? (
                        <ArticleCard result={result as SearchResult} index={index} />
                      ) : result.type === 'scholarship' ? (
                        <ScholarshipCard result={result as SearchResult} index={index} />
                      ) : null}
                    </div>
                  ))}
                </div>

                {/* Pagination */}
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
