import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import {
  Bookmark,
  Share2,
  MapPin,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import { jobs } from '@/lib/mockData';
import { useSavedJobsStore, useAppliedJobsStore } from '@/lib/store';

export default function JobDetail() {
  const [, params] = useLocation();
  const jobId = (params as any)?.id || '';
  const job = jobs.find((j) => j.id === jobId);
  const { isSaved, addSavedJob, removeSavedJob } = useSavedJobsStore();
  const { addApplication } = useAppliedJobsStore();
  const [applied, setApplied] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Job not found</h1>
          <p className="text-muted-foreground mb-6">The job you are looking for does not exist.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const saved = isSaved(job.id);
  const relatedJobs = jobs
    .filter((j) => j.company === job.company && j.id !== job.id)
    .slice(0, 3);

  const handleSaveToggle = () => {
    if (saved) {
      removeSavedJob(job.id);
    } else {
      addSavedJob(job.id);
    }
  };

  const handleApply = () => {
    addApplication({
      jobId: job.id,
      appliedDate: new Date().toISOString(),
      status: 'applied',
    });
    setApplied(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="border-b border-border/40 bg-muted/30">
        <div className="container py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Button>
        </div>
      </div>

      <div className="flex-1 container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-16 h-16 rounded-lg object-cover bg-muted"
                  />
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                    <p className="text-lg text-muted-foreground mb-3">{job.company}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.easyApply && (
                        <Badge className="bg-indigo-600 text-white">Easy Apply</Badge>
                      )}
                      {job.verified && (
                        <Badge className="bg-green-600 text-white">Verified</Badge>
                      )}
                      {job.featured && (
                        <Badge className="bg-yellow-600 text-white">Featured</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleSaveToggle}
                    className={saved ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-full' : 'rounded-full'}
                  >
                    <Bookmark
                      className="h-5 w-5"
                      fill={saved ? 'currentColor' : 'none'}
                    />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/40">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Salary</p>
                  <p className="font-semibold text-indigo-600">
                    {formatSalary(job.salary.min, job.salary.max)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="font-semibold flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Experience</p>
                  <p className="font-semibold capitalize">{job.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Work Mode</p>
                  <p className="font-semibold capitalize">{job.workMode}</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">About the Role</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">{job.description}</p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Responsibilities</h3>
                <ul className="space-y-3">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                <ul className="space-y-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Benefits and Perks</h3>
                <div className="grid grid-cols-2 gap-3">
                  {job.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 mb-6 sticky top-24">
              {applied ? (
                <div className="text-center py-4">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <p className="font-semibold mb-2">Application Sent!</p>
                  <p className="text-sm text-muted-foreground">We will notify you when the company reviews your application.</p>
                </div>
              ) : (
                <>
                  <Button
                    onClick={handleApply}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mb-3"
                    size="lg"
                  >
                    Apply Now
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    {job.applicants} people have applied
                  </p>
                </>
              )}
            </Card>

            <Card className="p-6 mb-6">
              <h3 className="font-semibold mb-4">Job Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">Posted</p>
                  <p className="text-sm font-medium">{formatDate(job.postedDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">Deadline</p>
                  <p className="text-sm font-medium">{formatDate(job.deadline)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">Job Type</p>
                  <p className="text-sm font-medium capitalize">{job.jobType.replace('-', ' ')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-1">Applicants</p>
                  <p className="text-sm font-medium">{job.applicants}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">About Company</h3>
              <div className="text-center mb-4">
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  className="w-12 h-12 rounded-lg mx-auto mb-3 object-cover bg-muted"
                />
                <h4 className="font-semibold">{job.company}</h4>
              </div>
              <Button variant="outline" className="w-full" size="sm">
                View Company Profile
              </Button>
            </Card>
          </motion.div>
        </div>

        {relatedJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-6">More Jobs from {job.company}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedJobs.map((relatedJob) => (
                <JobCard key={relatedJob.id} job={relatedJob} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
