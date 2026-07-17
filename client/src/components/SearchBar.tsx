import { useState, useEffect } from 'react';
import { Search, Mic, X, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useJobsStore, useSearchHistoryStore } from '@/lib/store';
import { jobs } from '@/lib/mockData';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  showSuggestions?: boolean;
}

export default function SearchBar({
  onSearch,
  placeholder = 'Search jobs by title, company, or skills...',
  showSuggestions = true,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { setSearchQuery } = useJobsStore();
  const { addSearch, getRecentSearches } = useSearchHistoryStore();

  const recentSearches = getRecentSearches(5);

  // Generate suggestions based on query
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const queryLower = query.toLowerCase();
    const jobTitles = Array.from(new Set(jobs.map((j) => j.title)));
    const companies = Array.from(new Set(jobs.map((j) => j.company)));
    const skills = Array.from(new Set(jobs.flatMap((j) => j.skills)));

    const allSuggestions = [
      ...jobTitles.filter((t) => t.toLowerCase().includes(queryLower)),
      ...companies.filter((c) => c.toLowerCase().includes(queryLower)),
      ...skills.filter((s) => s.toLowerCase().includes(queryLower)),
    ].slice(0, 8);

    setSuggestions(allSuggestions);
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
    addSearch(searchQuery);
    if (onSearch) onSearch(searchQuery);
    setIsOpen(false);
    setQuery('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-3 rounded-lg border border-border/40 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border/40 rounded-lg shadow-lg z-50">
          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="border-b border-border/40">
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  Recent Searches
                </p>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleSearch(search)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div>
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  Suggestions
                </p>
              </div>
              <div className="space-y-1">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Search className="h-4 w-4 text-muted-foreground" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending */}
          {!query && suggestions.length === 0 && (
            <div>
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  Trending
                </p>
              </div>
              <div className="space-y-1">
                {['Senior Software Engineer', 'Product Manager', 'UX Designer', 'Data Scientist'].map(
                  (trend) => (
                    <button
                      key={trend}
                      onClick={() => handleSearch(trend)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      {trend}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Empty State */}
          {query && suggestions.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
