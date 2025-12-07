import { useState, useEffect } from 'react';
import { Filter, TrendingUp, Trash2 } from 'lucide-react';
import { issueService } from '../services/issueService';
import { voteService } from '../services/voteService';
import type { Issue } from '../types/types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import VoteButtons from '../components/ui/VoteButtons';
import ReportDetailModal from '../components/ui/ReportDetailModal';
import DeleteConfirmModal from '../components/ui/DeleteConfirmModal';
import { useUser } from '../context/UserContext';

const CommunityBoard = () => {
    const { userId } = useUser();
    const [filter, setFilter] = useState<'all' | 'PENDING' | 'IN_PROGRESS' | 'RESOLVED'>('all');
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [issueToDelete, setIssueToDelete] = useState<number | null>(null);

    useEffect(() => {
        fetchIssues();
    }, [filter]);

    const fetchIssues = async () => {
        try {
            setLoading(true);
            setError(null);

            let issuesData: Issue[];
            if (filter === 'all') {
                issuesData = await issueService.getIssuesSortedByUpvotes();
            } else {
                issuesData = await issueService.getIssuesByStatus(filter);
            }

            setIssues(issuesData);
        } catch (err) {
            console.error('Error fetching issues:', err);
            setError('Failed to load community issues');
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async (issueId: number, voteType: 'up' | 'down' | null) => {
        try {
            if (voteType === null) {
                await voteService.removeVote(issueId, userId);
            } else if (voteType === 'up') {
                await voteService.upvote(issueId, userId);
            } else {
                await voteService.downvote(issueId, userId);
            }
            // Refresh issues to get updated vote counts
            await fetchIssues();
        } catch (error) {
            console.error('Vote failed:', error);
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

    const handleDeleteClick = (issueId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setIssueToDelete(issueId);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!issueToDelete) return;

        try {
            await issueService.deleteIssue(issueToDelete);
            // Refresh issues list
            await fetchIssues();
            setIssueToDelete(null);
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-400 text-lg mb-4">{error}</p>
                    <button
                        onClick={fetchIssues}
                        className="btn-gradient px-6 py-3"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <TrendingUp className="text-violet-400" size={32} />
                        Community Board
                    </h1>
                    <p className="text-slate-400">See what's trending in your community</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
                <Filter size={18} className="text-slate-400" />
                <div className="flex gap-2">
                    {['all', 'PENDING', 'IN_PROGRESS', 'RESOLVED'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === status
                                ? 'bg-violet-500 text-white'
                                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {status === 'all' ? 'All' : status.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Issues List */}
            <div className="space-y-4">
                {issues.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <p className="text-slate-400 text-lg">No issues found</p>
                    </div>
                ) : (
                    issues.map((issue) => (
                        <div
                            key={issue.id}
                            className="glass-card p-6 flex gap-4 cursor-pointer glass-card-hover relative"
                            onClick={() => setSelectedIssue(issue)}
                        >
                            {/* Delete Button - Only visible to owner */}
                            {issue.userId === userId && (
                                <button
                                    onClick={(e) => handleDeleteClick(issue.id, e)}
                                    className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all group"
                                    title="Delete report"
                                >
                                    <Trash2 className="text-red-400 group-hover:text-red-300" size={18} />
                                </button>
                            )}

                            {/* Vote Buttons */}
                            <div onClick={(e) => e.stopPropagation()}>
                                <VoteButtons
                                    issueId={issue.id}
                                    initialVotes={issue.upvotes || 0}
                                    userVote={issue.hasUserUpvoted ? 'up' : null}
                                    onVote={handleVote}
                                />
                            </div>

                            {/* Issue Content */}
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-2">
                                    {issue.title}
                                </h3>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                    {issue.description}
                                </p>

                                {/* Meta Info */}
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span className={`px-2 py-1 rounded-full ${getStatusBadge(issue.status)}`}>
                                        {issue.status.replace('_', ' ')}
                                    </span>
                                    <span>{issue.category}</span>
                                    <span>•</span>
                                    <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Report Detail Modal */}
            <ReportDetailModal
                issue={selectedIssue}
                onClose={() => setSelectedIssue(null)}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setIssueToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="Delete Report?"
                message="Are you sure you want to delete this report? This action cannot be undone and will permanently remove the report from the community board."
            />
        </div>
    );
};

export default CommunityBoard;
