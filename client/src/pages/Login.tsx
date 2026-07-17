import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUserStore } from '@/lib/store';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUserStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      login({
        id: '1',
        name: 'John Doe',
        email: email,
        role: 'job_seeker',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
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
                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-muted-foreground">
                  Sign in to your JobBoard account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
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
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-indigo-600 hover:text-indigo-700">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border/40 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Don't have an account?{' '}
                  <a
                    href="/signup"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Sign up
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

            <p className="text-center text-xs text-muted-foreground mt-6">
              By signing in, you agree to our{' '}
              <a href="#" className="underline hover:text-foreground">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="underline hover:text-foreground">
                Privacy Policy
              </a>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
