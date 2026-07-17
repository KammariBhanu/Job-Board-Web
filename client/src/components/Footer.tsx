import { Link } from 'wouter';
import { Mail, Linkedin, Twitter, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: 'Browse Jobs', href: '/jobs' },
      { label: 'Companies', href: '/companies' },
      { label: 'Categories', href: '/categories' },
      { label: 'For Employers', href: '/employer' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '#' },
    ],
    Resources: [
      { label: 'Help Center', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Sitemap', href: '#' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  };

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JB</span>
              </div>
              <span className="font-bold text-lg">JobBoard</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The modern job board for ambitious professionals and forward-thinking companies.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border/40 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-semibold mb-2">Subscribe to our newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest job postings and career tips delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 rounded-lg border border-border/40 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} JobBoard. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:hello@jobboard.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <Mail className="h-4 w-4" />
              hello@jobboard.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
