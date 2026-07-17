// Mock data for Job Board application
// This file contains realistic sample data for all features

export interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  companyLogo: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  workMode: 'onsite' | 'hybrid' | 'remote';
  jobType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  experience: 'fresher' | 'junior' | 'mid' | 'senior' | 'lead';
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  skills: string[];
  category: string;
  postedDate: string;
  applicants: number;
  featured: boolean;
  easyApply: boolean;
  verified: boolean;
  deadline: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  banner: string;
  description: string;
  website: string;
  industry: string;
  employees: string;
  headquarters: string;
  founded: number;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  rating: number;
  reviews: number;
  openJobs: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  jobCount: number;
  description: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

// Companies Data
export const companies: Company[] = [
  {
    id: 'google',
    name: 'Google',
    logo: 'https://www.google.com/favicon.ico',
    banner: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=1200&h=400&fit=crop',
    description: 'Google is an American multinational technology company that specializes in Internet-related services and products.',
    website: 'google.com',
    industry: 'Technology',
    employees: '190,000+',
    headquarters: 'Mountain View, CA',
    founded: 1998,
    socialLinks: {
      linkedin: 'https://linkedin.com/company/google',
      twitter: 'https://twitter.com/google',
      github: 'https://github.com/google',
    },
    rating: 4.8,
    reviews: 12450,
    openJobs: 342,
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: 'https://www.microsoft.com/favicon.ico',
    banner: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=400&fit=crop',
    description: 'Microsoft is a technology corporation that develops, manufactures, licenses, supports and sells software, computers, and related services.',
    website: 'microsoft.com',
    industry: 'Technology',
    employees: '220,000+',
    headquarters: 'Redmond, WA',
    founded: 1975,
    socialLinks: {
      linkedin: 'https://linkedin.com/company/microsoft',
      twitter: 'https://twitter.com/microsoft',
      github: 'https://github.com/microsoft',
    },
    rating: 4.6,
    reviews: 10230,
    openJobs: 287,
  },
  {
    id: 'apple',
    name: 'Apple',
    logo: 'https://www.apple.com/favicon.ico',
    banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop',
    description: 'Apple is an American technology company that designs, manufactures, and markets smartphones, personal computers, and software.',
    website: 'apple.com',
    industry: 'Technology',
    employees: '161,000+',
    headquarters: 'Cupertino, CA',
    founded: 1976,
    socialLinks: {
      linkedin: 'https://linkedin.com/company/apple',
      twitter: 'https://twitter.com/apple',
    },
    rating: 4.7,
    reviews: 9870,
    openJobs: 198,
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: 'https://www.amazon.com/favicon.ico',
    banner: 'https://images.unsplash.com/photo-1599667006779-c0a0e5f1f0d0?w=1200&h=400&fit=crop',
    description: 'Amazon is an American e-commerce and cloud computing company that focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    website: 'amazon.com',
    industry: 'Technology & E-commerce',
    employees: '1,500,000+',
    headquarters: 'Seattle, WA',
    founded: 1994,
    socialLinks: {
      linkedin: 'https://linkedin.com/company/amazon',
      twitter: 'https://twitter.com/amazon',
    },
    rating: 4.2,
    reviews: 15600,
    openJobs: 512,
  },
  {
    id: 'meta',
    name: 'Meta',
    logo: 'https://www.meta.com/favicon.ico',
    banner: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=1200&h=400&fit=crop',
    description: 'Meta is a technology company that builds products that help people connect, find communities and grow businesses.',
    website: 'meta.com',
    industry: 'Technology',
    employees: '67,000+',
    headquarters: 'Menlo Park, CA',
    founded: 2004,
    socialLinks: {
      linkedin: 'https://linkedin.com/company/meta',
      twitter: 'https://twitter.com/meta',
    },
    rating: 4.3,
    reviews: 8920,
    openJobs: 234,
  },
];

// Categories Data
export const categories: Category[] = [
  { id: 'engineering', name: 'Engineering', icon: '⚙️', jobCount: 1250, description: 'Software, DevOps, QA roles' },
  { id: 'design', name: 'Design', icon: '🎨', jobCount: 340, description: 'UX/UI, Product, Graphic Design' },
  { id: 'product', name: 'Product', icon: '📦', jobCount: 280, description: 'Product Manager, Product Owner' },
  { id: 'marketing', name: 'Marketing', icon: '📢', jobCount: 520, description: 'Digital, Content, Growth Marketing' },
  { id: 'sales', name: 'Sales', icon: '💼', jobCount: 680, description: 'Account Executive, Sales Development' },
  { id: 'data', name: 'Data', icon: '📊', jobCount: 420, description: 'Data Science, Analytics, BI' },
  { id: 'hr', name: 'HR & Recruiting', icon: '👥', jobCount: 190, description: 'Talent Acquisition, HR Manager' },
  { id: 'finance', name: 'Finance', icon: '💰', jobCount: 310, description: 'Accounting, Finance, Controller' },
];

// Jobs Data
const jobTitles = [
  'Senior Software Engineer',
  'Full Stack Developer',
  'Frontend Engineer',
  'Backend Engineer',
  'DevOps Engineer',
  'Product Manager',
  'UX/UI Designer',
  'Data Scientist',
  'Machine Learning Engineer',
  'Cloud Architect',
  'Security Engineer',
  'QA Engineer',
  'Technical Lead',
  'Engineering Manager',
  'Solutions Architect',
];

const skills = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'Go', 'Rust',
  'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB',
  'REST API', 'GraphQL', 'Git', 'CI/CD', 'Agile', 'Scrum',
];

const benefits = [
  'Health Insurance',
  '401(k) Matching',
  'Remote Work',
  'Flexible Hours',
  'Professional Development',
  'Stock Options',
  'Unlimited PTO',
  'Gym Membership',
  'Free Snacks',
  'Home Office Setup',
  'Conference Attendance',
  'Parental Leave',
];

const responsibilities = [
  'Design and implement scalable solutions',
  'Collaborate with cross-functional teams',
  'Write clean, maintainable code',
  'Participate in code reviews',
  'Mentor junior developers',
  'Optimize application performance',
  'Contribute to technical documentation',
  'Participate in architecture discussions',
];

const requirements = [
  '5+ years of experience',
  'Strong problem-solving skills',
  'Experience with modern frameworks',
  'Excellent communication skills',
  'Experience with cloud platforms',
  'Knowledge of database design',
  'Familiarity with CI/CD pipelines',
  'Experience with microservices',
];

function generateJobs(): Job[] {
  const jobs: Job[] = [];
  const locations = [
    'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Boston, MA',
    'Remote', 'Los Angeles, CA', 'Chicago, IL', 'Denver, CO', 'Portland, OR',
  ];
  const workModes: Array<'onsite' | 'hybrid' | 'remote'> = ['onsite', 'hybrid', 'remote'];
  const jobTypes: Array<'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship'> = ['full-time', 'part-time', 'contract'];
  const experiences: Array<'fresher' | 'junior' | 'mid' | 'senior' | 'lead'> = ['junior', 'mid', 'senior', 'lead'];

  for (let i = 0; i < 150; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const workMode = workModes[Math.floor(Math.random() * workModes.length)];
    const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    const experience = experiences[Math.floor(Math.random() * experiences.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];

    const minSalary = 80000 + Math.random() * 100000;
    const maxSalary = minSalary + 20000 + Math.random() * 50000;

    const jobSkills = [];
    for (let j = 0; j < 3 + Math.floor(Math.random() * 4); j++) {
      jobSkills.push(skills[Math.floor(Math.random() * skills.length)]);
    }

    const jobBenefits = [];
    for (let j = 0; j < 3 + Math.floor(Math.random() * 5); j++) {
      jobBenefits.push(benefits[Math.floor(Math.random() * benefits.length)]);
    }

    const postedDaysAgo = Math.floor(Math.random() * 30);
    const postedDate = new Date();
    postedDate.setDate(postedDate.getDate() - postedDaysAgo);

    jobs.push({
      id: `job-${i + 1}`,
      title: jobTitle,
      company: company.name,
      companyId: company.id,
      companyLogo: company.logo,
      salary: {
        min: Math.floor(minSalary),
        max: Math.floor(maxSalary),
        currency: 'USD',
      },
      location,
      workMode,
      jobType,
      experience,
      description: `We are looking for a talented ${jobTitle} to join our growing team. This is an exciting opportunity to work on cutting-edge technology and make a real impact.`,
      responsibilities,
      requirements,
      benefits: jobBenefits,
      skills: jobSkills,
      category: category.id,
      postedDate: postedDate.toISOString(),
      applicants: Math.floor(Math.random() * 500) + 10,
      featured: Math.random() > 0.85,
      easyApply: Math.random() > 0.3,
      verified: Math.random() > 0.2,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return jobs;
}

export const jobs = generateJobs();

// Testimonials Data
export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    author: 'Sarah Chen',
    role: 'Senior Product Manager',
    company: 'TechCorp',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    content: 'Found my dream job within 2 weeks. The job board is intuitive and the job quality is exceptional. Highly recommended!',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    author: 'Marcus Johnson',
    role: 'Hiring Manager',
    company: 'StartupXYZ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    content: 'As a hiring manager, this platform has been a game-changer. We filled 5 positions in record time with top-quality candidates.',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    author: 'Emily Rodriguez',
    role: 'Full Stack Developer',
    company: 'Digital Agency',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    content: 'The filter options are amazing. I was able to narrow down exactly what I was looking for. Great experience overall!',
    rating: 5,
  },
  {
    id: 'testimonial-4',
    author: 'David Park',
    role: 'CTO',
    company: 'Innovation Labs',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    content: 'Professional, clean interface. We\'ve been using JobBoard for recruiting and the results speak for themselves.',
    rating: 4,
  },
];

// Statistics for Landing Page
export const statistics = [
  { label: 'Active Jobs', value: '50,000+' },
  { label: 'Companies', value: '10,000+' },
  { label: 'Successful Hires', value: '250,000+' },
  { label: 'Job Categories', value: '50+' },
];

// Featured Companies for Landing Page
export const featuredCompanies = companies.slice(0, 5);

// Top Categories for Landing Page
export const topCategories = categories.slice(0, 8);

// Trending Jobs (most applied)
export const trendingJobs = jobs
  .sort((a, b) => b.applicants - a.applicants)
  .slice(0, 10);

// Featured Jobs
export const featuredJobs = jobs
  .filter(job => job.featured)
  .slice(0, 6);
