import { motion } from 'framer-motion';
import { BarChart3, Users, Briefcase, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { jobs, companies } from '@/lib/mockData';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Jobs', value: jobs.length, icon: Briefcase, color: 'bg-blue-600' },
    { label: 'Active Users', value: '2.4K', icon: Users, color: 'bg-green-600' },
    { label: 'Companies', value: companies.length, icon: TrendingUp, color: 'bg-purple-600' },
    { label: 'Applications', value: '15.2K', icon: BarChart3, color: 'bg-orange-600' },
  ];

  const recentActivities = [
    { type: 'job', title: 'New job posted', description: 'Senior Developer at Google', time: '2 hours ago', status: 'pending' },
    { type: 'user', title: 'New user registered', description: 'john.doe@example.com', time: '5 hours ago', status: 'approved' },
    { type: 'job', title: 'Job flagged', description: 'Inappropriate content in Product Manager role', time: '1 day ago', status: 'flagged' },
    { type: 'company', title: 'Company verified', description: 'Apple Inc. verified', time: '2 days ago', status: 'approved' },
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600 text-white">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600 text-white">Pending</Badge>;
      case 'flagged':
        return <Badge className="bg-red-600 text-white">Flagged</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'flagged':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="border-b border-border/40 bg-muted/30 py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor platform activity and manage content</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl font-bold mb-6">Recent Activities</h2>
            <Card className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b border-border/40 last:border-b-0 last:pb-0">
                    <div className="mt-1">
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                    <div>
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <Card className="p-6">
              <div className="space-y-3">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white justify-start">
                  Review Flagged Content
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Verify Companies
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  System Settings
                </Button>
              </div>
            </Card>

            {/* System Health */}
            <Card className="p-6 mt-6">
              <h3 className="font-semibold mb-4">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Server Status</span>
                  <Badge className="bg-green-600 text-white">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Database</span>
                  <Badge className="bg-green-600 text-white">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">API Response</span>
                  <Badge className="bg-green-600 text-white">Optimal</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="text-sm font-semibold">99.9%</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
