import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { jobs } from '@/lib/mockData';
import { useAppliedJobsStore } from '@/lib/store';

export default function AppliedJobs() {
  const { applications } = useAppliedJobsStore();
  const appliedJobsList = jobs.filter((job) =>
    applications.some((app) => app.jobId === job.id)
  );

  const getApplicationStatus = (jobId: string) => {
    return applications.find((app) => app.jobId === jobId)?.status || 'applied';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge className="bg-green-600 text-white">Accepted</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600 text-white">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-600 text-white">Under Review</Badge>;
    }
  };

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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Applied Jobs</h1>
          <p className="text-muted-foreground">
            {appliedJobsList.length} application{appliedJobsList.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      <div className="flex-1 container py-12">
        {appliedJobsList.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6"
          >
            {appliedJobsList.map((job) => {
              const status = getApplicationStatus(job.id);
              return (
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
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold">{job.title}</h3>
                            {getStatusIcon(status)}
                          </div>
                          <p className="text-muted-foreground mb-3">{job.company}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                            <span>{job.location}</span>
                            <span className="capitalize">{job.jobType.replace('-', ' ')}</span>
                            <span>${(job.salary.min / 1000).toFixed(0)}k - ${(job.salary.max / 1000).toFixed(0)}k</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(status)}
                            <span className="text-xs text-muted-foreground">
                              Applied {new Date(applications.find((app) => app.jobId === job.id)?.appliedDate || '').toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = `/jobs/${job.id}`}
                        >
                          View Job
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-6">No applications yet.</p>
            <Button onClick={() => window.location.href = '/jobs'}>
              Start Applying
            </Button>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
