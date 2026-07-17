
import { Star, MapPin, Users, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Company } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group rounded-xl border border-border/40 bg-card overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-lg border-indigo-200 dark:border-indigo-900/50' : 'shadow-sm'
      }`}
    >
      {/* Banner */}
      <div className="h-24 bg-gradient-to-r from-indigo-500 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={company.logo}
            alt={company.name}
            className="w-12 h-12 rounded-lg object-cover bg-muted"
          />
          <div>
            <h3 className="font-semibold text-lg text-foreground">{company.name}</h3>
            <p className="text-sm text-muted-foreground">{company.industry}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {company.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-border/40">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{company.employees}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{company.headquarters}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{company.rating}</span>
            <span className="text-xs text-muted-foreground">({company.reviews})</span>
          </div>
          <div className="text-sm font-medium text-indigo-600">
            {company.openJobs} open jobs
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 transition-all"
            onClick={() => window.location.href = `/companies/${company.id}`}
          >
            View Profile
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
          >
            View Jobs
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
