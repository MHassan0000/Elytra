import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { issueService } from '../services/issueService';
import { upvoteService } from '../services/upvoteService';
import type { Issue } from '../types/types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useToast } from '../components/ui/Toast';

interface IssueWithUpvoteStatus extends Issue {
    hasUpvoted: boolean;
}

const CommunityBoard = () => {
    const navigate = useNavigate();
    const { userId } = useUser();
    const { showToast, ToastContainer } = useToast();
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [issues, setIssues] = useState<IssueWithUpvoteStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchIssues();
    }, [userId]);

    const fetchIssues = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch issues sorted by upvotes
            const issuesData = await issueService.getIssuesSortedByUpvotes();

            // Check upvote status for each issue
            const issuesWithStatus = await Promise.all(
                issuesData.map(async (issue) => {
                    try {
                        const hasUpvoted = await upvoteService.checkUpvote(userId, issue.id);
                        return { ...issue, hasUpvoted };
                    } catch {
                        return { ...issue, hasUpvoted: false };
                    }
                })
            );

            setIssues(issuesWithStatus);
        } catch (err) {
            console.error('Error fetching issues:', err);
            setError('Failed to load community issues');
        } finally {
            setLoading(false);
        }
    };

    const handleUpvote = async (issueId: number) => {
        const issue = issues.find(i => i.id === issueId);
        if (!issue) return;

        try {
            if (issue.hasUpvoted) {
                // Remove upvote
                await upvoteService.removeUpvote(userId, issueId);
                setIssues(issues.map(i =>
                    i.id === issueId
                        ? { ...i, upvotes: i.upvotes - 1, hasUpvoted: false }
                        : i
                ));
                showToast('Upvote removed', 'info');
            } else {
                // Add upvote
                await upvoteService.addUpvote(userId, issueId);
                setIssues(issues.map(i =>
                    i.id === issueId
                        ? { ...i, upvotes: i.upvotes + 1, hasUpvoted: true }
                        : i
                ));
                showToast('Upvoted successfully!', 'success');
            }
        } catch (err: unknown) {
            console.error('Error toggling upvote:', err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to update upvote';
            showToast(errorMessage, 'error');
        }
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            'RESOLVED': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
            'IN_PROGRESS': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
            'PENDING': 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
        };
        return badges[status as keyof typeof badges] || badges.PENDING;
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInDays === 1) return '1d ago';
        return `${diffInDays}d ago`;
    };

    // Filter issues based on status and search query
    const filteredIssues = issues.filter(issue => {
        const matchesFilter = filter === 'all' || issue.status.toLowerCase() === filter.replace(' ', '_');
        const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            issue.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-400 text-lg mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn-gradient px-6 py-3"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <ToastContainer />
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Community Board</h1>
                        <p className="text-slate-400">See what's happening in your neighborhood.</p>
                    </div>
                    <button
                        onClick={() => navigate('/submit-feedback')}
                        className="btn-gradient px-6 py-3 shadow-lg shadow-violet-500/20"
                    >
                        + Submit Issue
                    </button>
                </div>

                {/* Filters */}
                <div className="glass-card p-2 flex items-center gap-2 flex-wrap">
                    {['All', 'Pending', 'In Progress', 'Resolved'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status.toLowerCase())}
                            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${filter === status.toLowerCase()
                                    ? 'bg-[#151A25] text-white shadow-lg border border-white/10'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                    <div className="flex-1" />
                    <div className="relative px-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 w-64"
                        />
                    </div>
                </div>

                {/* Issues Grid */}
                {filteredIssues.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-white mb-2">No Issues Found</h3>
                        <p className="text-slate-400 mb-6">
                            {searchQuery ? 'Try a different search term' : 'No issues match your filters'}
                        </p>
                        {filter !== 'all' && (
                            <button
                                onClick={() => setFilter('all')}
                                className="btn-gradient px-6 py-3"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredIssues.map((issue) => (
                            <div key={issue.id} className="glass-card p-6 glass-card-hover group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(issue.status)}`}>
                                                {issue.status.replace('_', ' ')}
                                            </span>
                                            <span className="text-xs text-slate-500">#{issue.id}</span>
                                            <span className="text-xs text-slate-500">•</span>
                                            <span className="text-xs text-slate-500">{issue.category}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-violet-400 transition-colors">
                                            {issue.title}
                                        </h3>
                                        <p className="text-sm text-slate-400 mb-2 line-clamp-2">
                                            {issue.description}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {formatTimeAgo(issue.createdAt)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleUpvote(issue.id)}
                                        className={`flex flex-col items-center gap-1 rounded-xl p-3 transition-all ${issue.hasUpvoted
                                                ? 'bg-violet-500/20 border-violet-500/30 text-violet-400'
                                                : 'bg-white/5 hover:bg-violet-500/20 border-white/5 hover:border-violet-500/30 text-white'
                                            } border group/vote`}
                                    >
                                        <span className="text-xl group-hover/vote:-translate-y-1 transition-transform">
                                            {issue.hasUpvoted ? '👍' : '👍'}
                                        </span>
                                        <span className={`text-sm font-bold ${issue.hasUpvoted ? 'text-violet-400' : 'text-white group-hover/vote:text-violet-400'}`}>
                                            {issue.upvotes}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default CommunityBoard;
