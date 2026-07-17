import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUserStore } from '@/lib/store';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'job_seeker' as const,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      login({
        id: '1',
        name: formData.name,
        email: formData.email,
        role: formData.role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
      });
      setIsLoading(false);
      window.location.href = '/';
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20">
        <div className="w-full max-w-md px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8">
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                <p className="text-muted-foreground">
                  Join JobBoard and start your career journey
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    I am a
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground"
                    >
                      <option value="job_seeker">Job Seeker</option>
                      <option value="employer">Employer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="checkbox" className="rounded" required />
                  <span>
                    I agree to the{' '}
                    <a href="#" className="text-indigo-600 hover:text-indigo-700">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-indigo-600 hover:text-indigo-700">
                      Privacy Policy
                    </a>
                  </span>
                </label>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border/40 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Already have an account?{' '}
                  <a
                    href="/login"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Sign in
                  </a>
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <Button variant="outline" className="w-full">
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full">
                  Continue with GitHub
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
