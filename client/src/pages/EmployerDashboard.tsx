import { motion } from 'framer-motion';
import { BarChart3, Users, Briefcase, TrendingUp, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { jobs } from '@/lib/mockData';

const EMPLOYER_JOBS = jobs.slice(0, 5);

export default function EmployerDashboard() {
  const stats = [
    { label: 'Active Jobs', value: EMPLOYER_JOBS.length, icon: Briefcase, color: 'bg-blue-600' },
    { label: 'Total Applications', value: EMPLOYER_JOBS.reduce((sum, job) => sum + job.applicants, 0), icon: Users, color: 'bg-green-600' },
    { label: 'Views', value: '12.5K', icon: TrendingUp, color: 'bg-purple-600' },
    { label: 'Conversion Rate', value: '3.2%', icon: BarChart3, color: 'bg-orange-600' },
  ];

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Employer Dashboard</h1>
              <p className="text-muted-foreground">Manage your job postings and applications</p>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Post New Job
            </Button>
          </div>
        </div>
      </section>

      <div className="flex-1 container py-12">
        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <div className={`${stat.color} p-2 rounded-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Active Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">Active Jobs</h2>
          <div className="grid grid-cols-1 gap-6">
            {EMPLOYER_JOBS.map((job) => (
              <Card key={job.id} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {job.applicants} applications
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Applications
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
