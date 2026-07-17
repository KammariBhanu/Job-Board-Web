import { create } from 'zustand';
import { Job } from './mockData';

// User Store
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'job_seeker' | 'employer' | 'admin';
  profile?: {
    bio: string;
    resume: string;
    skills: string[];
    experience: string;
    education: string;
  };
}

interface UserStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (profile: Partial<User>) => void;
}

export const useUserStore = create<UserStore>((set: any) => ({
  user: null,
  isLoggedIn: false,
  login: (user: User) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  updateProfile: (profile: Partial<User>) =>
    set((state: any) => ({
      user: state.user ? { ...state.user, ...profile } : null,
    })),
}));

// Jobs Store
interface JobFilter {
  searchQuery: string;
  location: string[];
  experience: string[];
  jobType: string[];
  workMode: string[];
  salary: {
    min: number;
    max: number;
  };
  skills: string[];
  category: string[];
  company: string[];
  easyApply: boolean;
  remote: boolean;
  hybrid: boolean;
  onsite: boolean;
  datePosted: string;
}

interface JobsStore {
  filters: JobFilter;
  sortBy: 'newest' | 'oldest' | 'salary-high' | 'relevant';
  currentPage: number;
  setSearchQuery: (query: string) => void;
  setLocationFilter: (locations: string[]) => void;
  setExperienceFilter: (experience: string[]) => void;
  setJobTypeFilter: (types: string[]) => void;
  setWorkModeFilter: (modes: string[]) => void;
  setSalaryFilter: (min: number, max: number) => void;
  setSkillsFilter: (skills: string[]) => void;
  setCategoryFilter: (categories: string[]) => void;
  setCompanyFilter: (companies: string[]) => void;
  setEasyApplyFilter: (value: boolean) => void;
  setWorkModeToggle: (mode: 'remote' | 'hybrid' | 'onsite', value: boolean) => void;
  setDatePostedFilter: (date: string) => void;
  setSortBy: (sort: 'newest' | 'oldest' | 'salary-high' | 'relevant') => void;
  setCurrentPage: (page: number) => void;
  resetFilters: () => void;
}

const defaultFilters: JobFilter = {
  searchQuery: '',
  location: [],
  experience: [],
  jobType: [],
  workMode: [],
  salary: { min: 0, max: 500000 },
  skills: [],
  category: [],
  company: [],
  easyApply: false,
  remote: false,
  hybrid: false,
  onsite: false,
  datePosted: 'all',
};

export const useJobsStore = create<JobsStore>((set: any) => ({
  filters: defaultFilters,
  sortBy: 'newest',
  currentPage: 1,
  setSearchQuery: (query: string) =>
    set((state: any) => ({
      filters: { ...state.filters, searchQuery: query },
      currentPage: 1,
    })),
  setLocationFilter: (locations: string[]) =>
    set((state: any) => ({
      filters: { ...state.filters, location: locations },
      currentPage: 1,
    })),
  setExperienceFilter: (experience: string[]) =>
    set((state: any) => ({
      filters: { ...state.filters, experience },
      currentPage: 1,
    })),
  setJobTypeFilter: (types: string[]) =>
    set((state: any) => ({
      filters: { ...state.filters, jobType: types },
      currentPage: 1,
    })),
  setWorkModeFilter: (modes: string[]) =>
    set((state: any) => ({
      filters: { ...state.filters, workMode: modes },
      currentPage: 1,
    })),
  setSalaryFilter: (min: number, max: number) =>
    set((state: any) => ({
      filters: { ...state.filters, salary: { min, max } },
      currentPage: 1,
    })),
  setSkillsFilter: (skills: string[]) =>
    set((state: any) => ({
      filters: { ...state.filters, skills },
      currentPage: 1,
    })),
  setCategoryFilter: (categories: string[]) =>
    set((state: any) => ({
      filters: { ...state.filters, category: categories },
      currentPage: 1,
    })),
  setCompanyFilter: (companies: string[]) =>
    set((state: any) => ({
      filters: { ...state.filters, company: companies },
      currentPage: 1,
    })),
  setEasyApplyFilter: (value: boolean) =>
    set((state: any) => ({
      filters: { ...state.filters, easyApply: value },
      currentPage: 1,
    })),
  setWorkModeToggle: (mode: 'remote' | 'hybrid' | 'onsite', value: boolean) =>
    set((state: any) => ({
      filters: { ...state.filters, [mode]: value },
      currentPage: 1,
    })),
  setDatePostedFilter: (date: string) =>
    set((state: any) => ({
      filters: { ...state.filters, datePosted: date },
      currentPage: 1,
    })),
  setSortBy: (sort: 'newest' | 'oldest' | 'salary-high' | 'relevant') =>
    set({ sortBy: sort }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  resetFilters: () =>
    set({
      filters: defaultFilters,
      sortBy: 'newest',
      currentPage: 1,
    }),
}));

// Saved Jobs Store
interface SavedJobsStore {
  savedJobs: string[];
  addSavedJob: (jobId: string) => void;
  removeSavedJob: (jobId: string) => void;
  isSaved: (jobId: string) => boolean;
  clearSavedJobs: () => void;
}

export const useSavedJobsStore = create<SavedJobsStore>((set: any, get: any) => ({
  savedJobs: [],
  addSavedJob: (jobId: string) =>
    set((state: any) => ({
      savedJobs: Array.from(new Set([...state.savedJobs, jobId])),
    })),
  removeSavedJob: (jobId: string) =>
    set((state: any) => ({
      savedJobs: state.savedJobs.filter((id: string) => id !== jobId),
    })),
  isSaved: (jobId: string) => get().savedJobs.includes(jobId),
  clearSavedJobs: () => set({ savedJobs: [] }),
}));

// Applied Jobs Store
interface ApplicationStatus {
  jobId: string;
  appliedDate: string;
  status: 'applied' | 'reviewing' | 'interview' | 'offer' | 'rejected';
  notes?: string;
}

interface AppliedJobsStore {
  applications: ApplicationStatus[];
  addApplication: (application: ApplicationStatus) => void;
  updateApplicationStatus: (jobId: string, status: ApplicationStatus['status']) => void;
  getApplications: () => ApplicationStatus[];
  getApplicationStatus: (jobId: string) => ApplicationStatus | undefined;
}

export const useAppliedJobsStore = create<AppliedJobsStore>((set: any, get: any) => ({
  applications: [],
  addApplication: (application: ApplicationStatus) =>
    set((state: any) => ({
      applications: [
        ...state.applications.filter((a: any) => a.jobId !== application.jobId),
        application,
      ],
    })),
  updateApplicationStatus: (jobId: string, status: ApplicationStatus['status']) =>
    set((state: any) => ({
      applications: state.applications.map((app: any) =>
        (app as any).jobId === jobId ? { ...app, status } : app
      ),
    })),
  getApplications: () => get().applications,
  getApplicationStatus: (jobId: string) =>
    get().applications.find((app: any) => app.jobId === jobId),
}));

// Search History Store
interface SearchHistoryStore {
  searches: string[];
  addSearch: (query: string) => void;
  removeSearch: (query: string) => void;
  clearSearchHistory: () => void;
  getRecentSearches: (limit?: number) => string[];
}

export const useSearchHistoryStore = create<SearchHistoryStore>((set: any, get: any): SearchHistoryStore => ({
  searches: [],
  addSearch: (query: string) =>
    set((state: any): any => ({
      searches: [query, ...state.searches.filter((s: string) => s !== query)].slice(0, 20),
    })),
  removeSearch: (query: string) =>
    set((state: any): any => ({
      searches: state.searches.filter((s: string) => s !== query),
    })),
  clearSearchHistory: () => set({ searches: [] }),
  getRecentSearches: (limit: number = 10) => get().searches.slice(0, limit),
}));

// Dashboard Store
interface DashboardStats {
  totalViews: number;
  totalApplications: number;
  averageSalary: number;
  topSkills: string[];
}

interface DashboardStore {
  stats: DashboardStats;
  updateStats: (stats: Partial<DashboardStats>) => void;
}

export const useDashboardStore = create<DashboardStore>((set: any) => ({
  stats: {
    totalViews: 0,
    totalApplications: 0,
    averageSalary: 0,
    topSkills: [],
  },
  updateStats: (stats: Partial<DashboardStats>) =>
    set((state: any) => ({
      stats: { ...state.stats, ...stats },
    })),
}));

// Notification Store
interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: number;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set: any) => ({
  notifications: [],
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) =>
    set((state: any): any => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
        },
      ],
    })),
  removeNotification: (id: string) =>
    set((state: any) => ({
      notifications: state.notifications.filter((n: any) => n.id !== id),
    })),
  clearNotifications: () => set((): any => ({ notifications: [] })),
}));
