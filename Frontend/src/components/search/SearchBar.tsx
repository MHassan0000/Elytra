import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { issueService } from '../../services/issueService';
import { useUser } from '../../context/UserContext';
import type { Issue } from '../../types/types';

interface SearchResultsProps {
    results: Issue[];
    onSelect: (issue: Issue) => void;
    onClose: () => void;
}

const SearchResults = ({ results, onSelect, onClose }: SearchResultsProps) => {
    if (results.length === 0) {
        return (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#151A25] border border-white/10 rounded-xl shadow-xl p-4 z-50">
                <p className="text-slate-400 text-sm text-center">No results found</p>
            </div>
        );
    }

    return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#151A25] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto">
            {results.map((issue) => (
                <button
                    key={issue.id}
                    onClick={() => onSelect(issue)}
                    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                >
                    <p className="text-sm font-medium text-white truncate">{issue.title}</p>
                    <p className="text-xs text-slate-400 truncate mt-1">{issue.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${issue.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-400' :
                                issue.status === 'IN_PROGRESS' ? 'bg-blue-500/10 text-blue-400' :
                                    'bg-amber-500/10 text-amber-400'
                            }`}>
                            {issue.status.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-slate-500">{issue.category}</span>
                    </div>
                </button>
            ))}
        </div>
    );
};

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Issue[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const { userId } = useUser();
    const navigate = useNavigate();
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const searchIssues = async () => {
            if (!query.trim()) {
                setResults([]);
                setShowResults(false);
                return;
            }

            try {
                setLoading(true);
                const allIssues = await issueService.getIssuesByUserId(userId);
                const filtered = allIssues.filter(issue =>
                    issue.title.toLowerCase().includes(query.toLowerCase()) ||
                    issue.description.toLowerCase().includes(query.toLowerCase())
                );
                setResults(filtered);
                setShowResults(true);
            } catch (error) {
                console.error('Search failed:', error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(searchIssues, 300);
        return () => clearTimeout(debounce);
    }, [query, userId]);

    const handleSelect = (issue: Issue) => {
        setShowResults(false);
        setQuery('');
        navigate(`/my-reports`); // Navigate to reports page
    };

    const handleClear = () => {
        setQuery('');
        setResults([]);
        setShowResults(false);
    };

    return (
        <div ref={searchRef} className="relative flex-1 max-w-xl">
            <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your issues..."
                className="w-full bg-[#151A25] border border-white/5 rounded-xl pl-11 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder-slate-500"
            />
            {query && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            )}
            {loading && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            {showResults && <SearchResults results={results} onSelect={handleSelect} onClose={() => setShowResults(false)} />}
        </div>
    );
};

export default SearchBar;
