import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, Moon, Sun, Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useUserStore } from '@/lib/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUserStore();

  const navItems = [
    { label: 'Jobs', href: '/jobs' },
    { label: 'Companies', href: '/companies' },
    { label: 'Categories', href: '/categories' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">JB</span>
            </div>
            <span>JobBoard</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {item.label}
              </a>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>

          {/* User Menu or Auth Buttons */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <a className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/saved">
                    <a className="flex items-center gap-2 cursor-pointer">
                      <span>Saved Jobs</span>
                    </a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/applied">
                    <a className="flex items-center gap-2 cursor-pointer">
                      <span>Applied Jobs</span>
                    </a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <a className="flex items-center gap-2 cursor-pointer">
                      <span>Settings</span>
                    </a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <a>
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </a>
              </Link>
              <Link href="/signup">
                <a>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    Sign Up
                  </Button>
                </a>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border/40 bg-background">
          <div className="container py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
