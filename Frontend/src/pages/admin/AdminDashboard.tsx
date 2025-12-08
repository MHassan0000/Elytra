import { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { issueService } from '../../services/issueService';
import { userService } from '../../services/userService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface DashboardStats {
    totalUsers: number;
    totalReports: number;
    pendingReports: number;
    resolvedReports: number;
    inProgressReports: number;
}

interface RecentUser {
    id: number;
    username: string;
    email: string;
    reportCount: number;
    status: string;
    createdAt: string;
}

const AdminDashboard = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch statistics
            const statsData = await issueService.getAdminStats();
            setStats(statsData);

            // Fetch recent users
            const usersData = await userService.getAllUsersWithStats();
            // Sort by creation date and take the 5 most recent
            const sortedUsers = usersData
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5);
            setRecentUsers(sortedUsers);
        } catch (err: any) {
            console.error('Error fetching dashboard data:', err);
            setError(err.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={fetchDashboardData}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                    <p className="text-slate-400">System overview and management.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    {
                        title: 'Total Users',
                        value: stats?.totalUsers || 0,
                        change: '+12%',
                        color: 'from-blue-500 to-cyan-500',
                        icon: Users
                    },
                    {
                        title: 'Total Reports',
                        value: stats?.totalReports || 0,
                        change: '+8%',
                        color: 'from-violet-500 to-purple-500',
                        icon: FileText
                    },
                    {
                        title: 'Resolved',
                        value: stats?.resolvedReports || 0,
                        change: '+15%',
                        color: 'from-emerald-500 to-teal-500',
                        icon: CheckCircle
                    },
                    {
                        title: 'Pending',
                        value: stats?.pendingReports || 0,
                        change: '-5%',
                        color: 'from-amber-500 to-orange-500',
                        icon: Clock
                    },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="glass-card p-6 relative overflow-hidden">
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${stat.color} opacity-10 rounded-bl-full -mr-4 -mt-4`} />
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                                <Icon className="w-5 h-5 text-slate-500" />
                            </div>
                            <div className="flex items-end justify-between">
                                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                                <span className={`text-xs font-medium px-2 py-1 rounded-lg border flex items-center gap-1 ${stat.change.startsWith('+')
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                    }`}>
                                    <TrendingUp className="w-3 h-3" />
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Users Table */}
            <div className="glass-card p-1">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Recent Users</h2>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/2">
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Username</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reports</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {recentUsers.map((user) => (
                            <tr key={user.id} className="group hover:bg-white/2 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-cyan-600 flex items-center justify-center text-xs font-bold text-white">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{user.username}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-slate-400">{user.email}</td>
                                <td className="py-4 px-6 text-sm text-slate-300">{user.reportCount}</td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'ACTIVE'
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right text-sm text-slate-500">{formatDate(user.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
