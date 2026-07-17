import { motion } from 'framer-motion';
import { Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import { jobs } from '@/lib/mockData';
import { useSavedJobsStore } from '@/lib/store';

export default function SavedJobs() {
  const { savedJobs, removeSavedJob } = useSavedJobsStore();
  const savedJobsList = jobs.filter((job) => savedJobs.includes(job.id));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="border-b border-border/40 bg-muted/30 py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Saved Jobs</h1>
          <p className="text-muted-foreground">
            {savedJobsList.length} job{savedJobsList.length !== 1 ? 's' : ''} saved
          </p>
        </div>
      </section>

      <div className="flex-1 container py-12">
        {savedJobsList.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6"
          >
            {savedJobsList.map((job) => (
              <motion.div key={job.id} variants={itemVariants}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-12 h-12 rounded-lg object-cover bg-muted"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                        <p className="text-muted-foreground mb-3">{job.company}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>{job.location}</span>
                          <span className="capitalize">{job.jobType.replace('-', ' ')}</span>
                          <span>${(job.salary.min / 1000).toFixed(0)}k - ${(job.salary.max / 1000).toFixed(0)}k</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/jobs/${job.id}`}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSavedJob(job.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-6">No saved jobs yet.</p>
            <Button onClick={() => window.location.href = '/jobs'}>
              Browse Jobs
            </Button>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
