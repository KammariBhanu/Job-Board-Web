import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompanyCard from '@/components/CompanyCard';
import { companies } from '@/lib/mockData';

export default function Companies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filteredCompanies = useMemo(() => {
    let result = [...companies];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (company) =>
          company.name.toLowerCase().includes(query) ||
          company.industry.toLowerCase().includes(query) ||
          company.description.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'jobs':
        result.sort((a, b) => b.openJobs - a.openJobs);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [searchQuery, sortBy]);

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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Top Companies</h1>
          <p className="text-muted-foreground mb-8">
            Explore leading companies and their open opportunities
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border/40 bg-background focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="rating">Sort by Rating</option>
              <option value="jobs">Sort by Open Jobs</option>
              <option value="reviews">Sort by Reviews</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </section>

      <div className="flex-1 container py-12">
        {filteredCompanies.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCompanies.map((company) => (
              <motion.div key={company.id} variants={itemVariants}>
                <CompanyCard company={company} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No companies found matching your search.</p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
