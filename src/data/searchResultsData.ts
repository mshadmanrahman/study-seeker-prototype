import type { SearchResult } from "@/types/search";

export const mockResults: SearchResult[] = [
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

export const PET_IMAGES = [
  // Cats (More cats as requested!)
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80", // Tabby Cat
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=400&q=80", // Three kittens
  "https://images.unsplash.com/photo-1592194991823-67916219b674?auto=format&fit=crop&w=400&q=80", // Gray Cat
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=400&q=80", // Cat in a box
  "https://images.unsplash.com/photo-1533738363-b7f9a261e36c?auto=format&fit=crop&w=400&q=80", // Cat with sunglasses
  "https://images.unsplash.com/photo-1561948955-570b270e9de1?auto=format&fit=crop&w=400&q=80", // White and gray cat
  "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80", // Cat in a field
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&q=80", // Cat with yellow eyes
  "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=400&q=80", // Cat winking
  "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=400&q=80", // Cat with butterfly
  
  // Persian Cats
  "https://images.unsplash.com/photo-1583795128727-6ec3642408d8?auto=format&fit=crop&w=400&q=80", // White Persian Cat
  "https://images.unsplash.com/photo-1555474693-9c84e11e48ac?auto=format&fit=crop&w=400&q=80", // Fluffy Persian Cat
  
  // Siberian Cats
  "https://images.unsplash.com/photo-1615789591457-74a63395c990?auto=format&fit=crop&w=400&q=80", // Siberian Cat on a bed
  "https://images.unsplash.com/photo-1628226469931-50937a345b1c?auto=format&fit=crop&w=400&q=80", // Siberian Cat closeup
  
  // Ragdoll Blue Mitted Cats
  "https://images.unsplash.com/photo-1623912940228-e4f4a4788349?auto=format&fit=crop&w=400&q=80", // Ragdoll with blue eyes
  "https://images.unsplash.com/photo-1615383995253-62529c3628e8?auto=format&fit=crop&w=400&q=80", // Ragdoll cat lying down

  // Dogs
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80", // Happy dog with a ball
  "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&w=400&q=80", // Dog with glasses
  "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80", // Golden Retriever puppy
  "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=400&q=80", // Dog running on a field
  "https://images.unsplash.com/photo-1583337130417-2346040878f3?auto=format&fit=crop&w=400&q=80", // Corgi
  "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=400&q=80", // Pug
  "https://images.unsplash.com/photo-1597633425046-08ebb79440d1?auto=format&fit=crop&w=400&q=80", // French Bulldog

  // German Pinschers
  "/lovable-uploads/7b031b6e-0c51-445d-bb2e-86dabb789f23.png", // User's German Pinscher
  "https://images.unsplash.com/photo-1620959296548-1d2153a16490?auto=format&fit=crop&w=400&q=80", // German Pinscher sitting
  "https://images.unsplash.com/photo-1547228834-0a32d1527891?auto=format&fit=crop&w=400&q=80", // German Pinscher portrait
];

// Helper to get a unique, non-repeated pet image for each card per page
export const getNonRepeatingImageForPage = (() => {
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
