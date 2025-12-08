import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { issueService } from '../services/issueService';
import type { Issue, IssueStats } from '../types/types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button3D from '../components/ui/Button3D';

const Dashboard = () => {
    const navigate = useNavigate();
    const { currentUser, userId } = useUser();
    const [stats, setStats] = useState<IssueStats | null>(null);
    const [recentIssues, setRecentIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [statsData, issuesData] = await Promise.all([
                    issueService.getUserIssueStats(userId),
                    issueService.getIssuesByUserId(userId)
                ]);

                setStats(statsData);
                setRecentIssues(issuesData.slice(0, 4));
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
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

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome back, <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-pink-400">{currentUser?.username || 'User'}</span>
                    </h1>
                    <p className="text-slate-400">Here's what's happening in your community today.</p>
                </div>
                <Button3D
                    onClick={() => navigate('/submit-feedback')}
                    variant="primary"
                    size="lg"
                >
                    <div className="flex items-center gap-2">
                        <Plus size={15} />
                        New Report
                    </div>
                </Button3D>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Total Reports', value: stats?.total || 0, change: `+${stats?.total || 0}`, color: 'from-violet-500 to-purple-500' },
                    { title: 'In Progress', value: stats?.inProgress || 0, change: `${stats?.inProgress || 0}`, color: 'from-blue-500 to-cyan-500' },
                    { title: 'Resolved', value: stats?.resolved || 0, change: `${stats?.resolved || 0}`, color: 'from-emerald-500 to-teal-500' },
                    { title: 'Pending', value: stats?.pending || 0, change: `${stats?.pending || 0}`, color: 'from-pink-500 to-rose-500' },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${stat.color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
                        <p className="text-slate-400 text-sm font-medium mb-2">{stat.title}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                            <span className="text-xs font-medium bg-white/5 text-white px-2 py-1 rounded-lg border border-white/5">
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                        <button
                            onClick={() => navigate('/my-reports')}
                            className="text-sm text-violet-400 hover:text-violet-300"
                        >
                            View All
                        </button>
                    </div>

                    <div className="glass-card p-1">
                        {recentIssues.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-slate-400 mb-4">No issues reported yet</p>
                                <button
                                    onClick={() => navigate('/submit-feedback')}
                                    className="btn-gradient px-6 py-3"
                                >
                                    Submit Your First Report
                                </button>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Issue</th>
                                        <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                        <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {recentIssues.map((issue) => (
                                        <tr key={issue.id} className="group hover:bg-white/2 transition-colors">
                                            <td className="py-4 px-6">
                                                <span className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">{issue.title}</span>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-slate-400">{issue.category}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(issue.status)}`}>
                                                    {issue.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right text-sm text-slate-500">{formatTimeAgo(issue.createdAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Side Widgets */}
                <div className="space-y-6">
                    {/* Community Impact */}
                    <div className="glass-card p-6 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-b from-violet-500/5 to-transparent" />
                        <h3 className="text-lg font-bold text-white mb-6 relative z-10">Community Impact</h3>
                        <div className="relative w-40 h-40 mx-auto mb-6">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="#1e293b" strokeWidth="12" fill="transparent" />
                                <circle cx="80" cy="80" r="70" stroke="#8b5cf6" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset={stats ? (440 - (stats.resolved / (stats.total || 1)) * 440).toString() : "66"} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-white">
                                    {stats ? Math.round((stats.resolved / (stats.total || 1)) * 100) : 0}%
                                </span>
                                <span className="text-xs text-slate-400">Resolved</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400">Your reports are helping improve the community.</p>
                    </div>

                    {/* Quick Actions */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/submit-feedback')}
                                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 transition-all flex items-center gap-3 group"
                            >
                                <span className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">📍</span>
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white">Report Issue</span>
                            </button>
                            <button
                                onClick={() => navigate('/community-board')}
                                className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-pink-500/30 transition-all flex items-center gap-3 group"
                            >
                                <span className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">👥</span>
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white">Community Board</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
