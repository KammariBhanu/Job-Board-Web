import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Filter,
  X,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import { jobs, categories } from '@/lib/mockData';
import { useJobsStore } from '@/lib/store';

export default function Jobs() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const {
    filters,
    sortBy,
    currentPage,
    setSearchQuery,
    setLocationFilter,
    setExperienceFilter,
    setJobTypeFilter,
    setWorkModeFilter,
    setSalaryFilter,
    setCategoryFilter,
    setEasyApplyFilter,
    setSortBy,
    setCurrentPage,
    resetFilters,
  } = useJobsStore();

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    // Location
    if (filters.location.length > 0) {
      result = result.filter((job) =>
        filters.location.some((loc) =>
          job.location.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }

    // Experience
    if (filters.experience.length > 0) {
      result = result.filter((job) => filters.experience.includes(job.experience));
    }

    // Job Type
    if (filters.jobType.length > 0) {
      result = result.filter((job) => filters.jobType.includes(job.jobType));
    }

    // Work Mode
    if (filters.workMode.length > 0) {
      result = result.filter((job) => filters.workMode.includes(job.workMode));
    }

    // Salary
    result = result.filter(
      (job) =>
        job.salary.min >= filters.salary.min && job.salary.max <= filters.salary.max
    );

    // Category
    if (filters.category.length > 0) {
      result = result.filter((job) => filters.category.includes(job.category));
    }

    // Easy Apply
    if (filters.easyApply) {
      result = result.filter((job) => job.easyApply);
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        );
        break;
      case 'oldest':
        result.sort(
          (a, b) =>
            new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
        );
        break;
      case 'salary-high':
        result.sort((a, b) => b.salary.max - a.salary.max);
        break;
      case 'relevant':
        result.sort((a, b) => b.applicants - a.applicants);
        break;
    }

    return result;
  }, [filters, sortBy]);

  // Pagination
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeFiltersCount =
    (filters.location.length > 0 ? 1 : 0) +
    (filters.experience.length > 0 ? 1 : 0) +
    (filters.jobType.length > 0 ? 1 : 0) +
    (filters.workMode.length > 0 ? 1 : 0) +
    (filters.category.length > 0 ? 1 : 0) +
    (filters.easyApply ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Page Header */}
      <section className="border-b border-border/40 bg-muted/30 py-8">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Jobs</h1>
          <p className="text-muted-foreground mb-6">
            Showing {filteredJobs.length} jobs
          </p>
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-1 container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div
            className={`lg:col-span-1 ${
              mobileFiltersOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <Card className="p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-xs"
                  >
                    Reset
                  </Button>
                )}
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <Label className="text-sm font-semibold mb-3 block">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy as any}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="salary-high">Highest Salary</SelectItem>
                    <SelectItem value="relevant">Most Relevant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Experience Level */}
              <div className="mb-6 pb-6 border-b border-border/40">
                <Label className="text-sm font-semibold mb-3 block">Experience</Label>
                <div className="space-y-2">
                  {['fresher', 'junior', 'mid', 'senior', 'lead'].map((exp) => (
                    <div key={exp} className="flex items-center gap-2">
                      <Checkbox
                        id={`exp-${exp}`}
                        checked={filters.experience.includes(exp)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setExperienceFilter([...filters.experience, exp]);
                          } else {
                            setExperienceFilter(
                              filters.experience.filter((e) => e !== exp)
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor={`exp-${exp}`}
                        className="text-sm font-normal cursor-pointer capitalize"
                      >
                        {exp}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Job Type */}
              <div className="mb-6 pb-6 border-b border-border/40">
                <Label className="text-sm font-semibold mb-3 block">Job Type</Label>
                <div className="space-y-2">
                  {['full-time', 'part-time', 'contract', 'freelance', 'internship'].map(
                    (type) => (
                      <div key={type} className="flex items-center gap-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={filters.jobType.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setJobTypeFilter([...filters.jobType, type]);
                            } else {
                              setJobTypeFilter(
                                filters.jobType.filter((t) => t !== type)
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={`type-${type}`}
                          className="text-sm font-normal cursor-pointer capitalize"
                        >
                          {type.replace('-', ' ')}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Work Mode */}
              <div className="mb-6 pb-6 border-b border-border/40">
                <Label className="text-sm font-semibold mb-3 block">Work Mode</Label>
                <div className="space-y-2">
                  {['remote', 'hybrid', 'onsite'].map((mode) => (
                    <div key={mode} className="flex items-center gap-2">
                      <Checkbox
                        id={`mode-${mode}`}
                        checked={filters.workMode.includes(mode)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setWorkModeFilter([...filters.workMode, mode]);
                          } else {
                            setWorkModeFilter(
                              filters.workMode.filter((m) => m !== mode)
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor={`mode-${mode}`}
                        className="text-sm font-normal cursor-pointer capitalize"
                      >
                        {mode}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-6 pb-6 border-b border-border/40">
                <Label className="text-sm font-semibold mb-3 block flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Salary Range
                </Label>
                <div className="space-y-4">
                  <Slider
                    min={0}
                    max={500000}
                    step={10000}
                    value={[filters.salary.min, filters.salary.max]}
                    onValueChange={(value) =>
                      setSalaryFilter(value[0], value[1])
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${(filters.salary.min / 1000).toFixed(0)}k</span>
                    <span>${(filters.salary.max / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>

              {/* Easy Apply */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="easy-apply"
                  checked={filters.easyApply}
                  onCheckedChange={setEasyApplyFilter as any}
                />
                <Label
                  htmlFor="easy-apply"
                  className="text-sm font-normal cursor-pointer"
                >
                  Easy Apply Only
                </Label>
              </div>
            </Card>
          </div>

          {/* Jobs Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="w-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Results */}
            {paginatedJobs.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 gap-6 mb-8"
                >
                  {paginatedJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <JobCard job={job} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">No jobs found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
