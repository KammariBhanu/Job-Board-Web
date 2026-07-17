import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import { categories, jobs } from '@/lib/mockData';

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryJobs = useMemo(() => {
    if (!selectedCategory) return [];
    return jobs.filter((job) => job.category === selectedCategory).slice(0, 6);
  }, [selectedCategory]);

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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Job Categories</h1>
          <p className="text-muted-foreground">
            Browse jobs by category and find your perfect role
          </p>
        </div>
      </section>

      <div className="flex-1 container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 sticky top-24">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                <Button
                  variant={selectedCategory === null ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="mr-2">{category.icon}</span>
                    <span className="flex-1 text-left">{category.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {category.jobCount}
                    </span>
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            {selectedCategory === null ? (
              <>
                <h2 className="text-2xl font-bold mb-8">All Categories</h2>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {categories.map((category) => (
                    <motion.div key={category.id} variants={itemVariants}>
                      <Card
                        className="p-8 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                          {category.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {category.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-indigo-600">
                            {category.jobCount} jobs
                          </span>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-indigo-600 transition-colors" />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {categories.find((c) => c.id === selectedCategory)?.name}
                    </h2>
                    <p className="text-muted-foreground">
                      {categories.find((c) => c.id === selectedCategory)?.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Back to Categories
                  </Button>
                </div>

                {categoryJobs.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-6"
                  >
                    {categoryJobs.map((job) => (
                      <motion.div key={job.id} variants={itemVariants}>
                        <JobCard job={job} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground">No jobs found in this category.</p>
                  </Card>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
