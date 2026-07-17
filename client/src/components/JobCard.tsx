import { useState } from 'react';
import { Link } from 'wouter';
import { Bookmark, Share2, MapPin, Briefcase, Clock, Users, Badge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge as BadgeUI } from '@/components/ui/badge';
import { Job } from '@/lib/mockData';
import { useSavedJobsStore } from '@/lib/store';
import { motion } from 'framer-motion';

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

export default function JobCard({ job, featured = false }: JobCardProps) {
  const { isSaved, addSavedJob, removeSavedJob } = useSavedJobsStore();
  const saved = isSaved(job.id);
  const [isHovered, setIsHovered] = useState(false);

  const handleSaveToggle = () => {
    if (saved) {
      removeSavedJob(job.id);
    } else {
      addSavedJob(job.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}m ago`;
  };

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-xl border border-border/40 bg-card p-6 transition-all duration-300 ${
        isHovered ? 'shadow-lg border-indigo-200 dark:border-indigo-900/50' : 'shadow-sm'
      } ${featured ? 'ring-2 ring-indigo-600/20' : ''}`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4">
          <BadgeUI className="bg-indigo-600 text-white">Featured</BadgeUI>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-10 h-10 rounded-lg object-cover bg-muted"
            />
            <div>
              <a href={`/jobs/${job.id}`} className="font-semibold text-lg text-foreground hover:text-indigo-600 transition-colors cursor-pointer">
              {job.title}
            </a>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSaveToggle}
            className={`rounded-full transition-colors ${
              saved ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950' : ''
            }`}
          >
            <Bookmark
              className="h-5 w-5"
              fill={saved ? 'currentColor' : 'none'}
            />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.easyApply && (
          <BadgeUI variant="secondary" className="text-xs">
            Easy Apply
          </BadgeUI>
        )}
        {job.verified && (
          <BadgeUI variant="secondary" className="text-xs">
            ✓ Verified
          </BadgeUI>
        )}
        <BadgeUI variant="outline" className="text-xs">
          {job.jobType.replace('-', ' ')}
        </BadgeUI>
        <BadgeUI variant="outline" className="text-xs">
          {job.workMode}
        </BadgeUI>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-border/40">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{job.experience}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-indigo-600">
            {formatSalary(job.salary.min, job.salary.max)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{formatDate(job.postedDate)}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill, index) => (
            <BadgeUI key={`${skill}-${index}`} variant="outline" className="text-xs">
              {skill}
            </BadgeUI>
          ))}
          {job.skills.length > 3 && (
            <BadgeUI variant="outline" className="text-xs">
              +{job.skills.length - 3}
            </BadgeUI>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{job.applicants} applicants</span>
        </div>
        <Button
          size="sm"
          onClick={() => window.location.href = `/jobs/${job.id}`}
          className={`transition-all ${
            isHovered
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-indigo-600/80 hover:bg-indigo-600'
          }`}
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
}
