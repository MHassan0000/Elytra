import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { issueService } from '../services/issueService';
import type { Issue } from '../types/types';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const MyReports = () => {
    const navigate = useNavigate();
    const { userId } = useUser();
    const [reports, setReports] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await issueService.getIssuesByUserId(userId);
                setReports(data);
            } catch (err) {
                console.error('Error fetching reports:', err);
                setError('Failed to load reports');
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [userId]);

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

    const stats = {
        total: reports.length,
        inProgress: reports.filter(r => r.status === 'IN_PROGRESS').length,
        resolved: reports.filter(r => r.status === 'RESOLVED').length,
        pending: reports.filter(r => r.status === 'PENDING').length,
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            'RESOLVED': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
            'IN_PROGRESS': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
            'PENDING': 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
        };
        return badges[status as keyof typeof badges] || badges.PENDING;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const handleShare = (issueId: number) => {
        const url = `${window.location.origin}/community-board?issue=${issueId}`;
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Reports</h1>
                    <p className="text-slate-400">Track and manage your submitted issues.</p>
                </div>
                <button
                    onClick={() => navigate('/submit-feedback')}
                    className="btn-gradient px-6 py-3 shadow-lg shadow-violet-500/20"
                >
                    + New Report
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-2xl">📝</div>
                    <div>
                        <p className="text-slate-400 text-sm">Total Reports</p>
                        <p className="text-2xl font-bold text-white">{stats.total}</p>
                    </div>
                </div>
                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl">⏳</div>
                    <div>
                        <p className="text-slate-400 text-sm">Pending</p>
                        <p className="text-2xl font-bold text-amber-400">{stats.pending}</p>
                    </div>
                </div>
                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">🔄</div>
                    <div>
                        <p className="text-slate-400 text-sm">In Progress</p>
                        <p className="text-2xl font-bold text-blue-400">{stats.inProgress}</p>
                    </div>
                </div>
                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-2xl">✅</div>
                    <div>
                        <p className="text-slate-400 text-sm">Resolved</p>
                        <p className="text-2xl font-bold text-emerald-400">{stats.resolved}</p>
                    </div>
                </div>
            </div>

            {/* Reports List */}
            {reports.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-xl font-bold text-white mb-2">No Reports Yet</h3>
                    <p className="text-slate-400 mb-6">Start by submitting your first issue report</p>
                    <button
                        onClick={() => navigate('/submit-feedback')}
                        className="btn-gradient px-8 py-3"
                    >
                        Submit Your First Report
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {reports.map((report) => (
                        <div key={report.id} className="glass-card p-6 glass-card-hover">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">{report.title}</h3>
                                    <p className="text-sm text-slate-400">📍 {report.category}</p>
                                </div>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(report.status)}`}>
                                    {report.status.replace('_', ' ')}
                                </span>
                            </div>

                            <p className="text-sm text-slate-300 mb-4 line-clamp-2">{report.description}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-white/5 mb-4">
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Submitted</p>
                                    <p className="text-sm text-slate-300">{formatDate(report.createdAt)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Upvotes</p>
                                    <p className="text-sm text-slate-300">{report.upvotes}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Priority</p>
                                    <p className="text-sm text-slate-300">{report.priority}</p>
                                </div>
                                {report.resolvedAt && (
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Resolved</p>
                                        <p className="text-sm text-emerald-400">{formatDate(report.resolvedAt)}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => navigate(`/community-board?issue=${report.id}`)}
                                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors"
                                >
                                    View Details
                                </button>
                                <button
                                    onClick={() => handleShare(report.id)}
                                    className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                                >
                                    Share
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyReports;
