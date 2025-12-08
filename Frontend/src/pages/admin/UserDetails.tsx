import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Calendar, FileText, AlertCircle } from 'lucide-react';
import { userService } from '../../services/userService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface UserDetails {
    id: number;
    username: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    reportCount: number;
    issues: any[];
}

const UserDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchUserDetails(parseInt(id));
        }
    }, [id]);

    const fetchUserDetails = async (userId: number) => {
        try {
            setLoading(true);
            setError(null);
            const data = await userService.getUserWithIssues(userId);
            setUser(data);
        } catch (err: any) {
            console.error('Error fetching user details:', err);
            setError(err.message || 'Failed to load user details');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { bg: string; text: string; border: string }> = {
            PENDING: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
            IN_PROGRESS: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
            RESOLVED: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
        };
        const style = statusMap[status] || statusMap.PENDING;
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text} border ${style.border}`}>
                {status.replace('_', ' ')}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <p className="text-red-400 mb-4">{error || 'User not found'}</p>
                    <button
                        onClick={() => navigate('/admin/users')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Users
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/admin/users')}
                    className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">User Details</h1>
                    <p className="text-slate-400">View user information and activity.</p>
                </div>
            </div>

            {/* User Info Card */}
            <div className="glass-card p-8">
                <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-full bg-linear-to-tr from-blue-600 to-cyan-600 flex items-center justify-center text-3xl font-bold text-white">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-2">{user.username}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="flex items-center gap-3 text-slate-300">
                                <Mail className="w-4 h-4 text-slate-500" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <Calendar className="w-4 h-4 text-slate-500" />
                                <span>Joined {formatDate(user.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-slate-500">Status:</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'ACTIVE'
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                        : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                    }`}>
                                    {user.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-slate-500">Role:</span>
                                <span className="text-white font-medium">{user.role}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <p className="text-slate-400 text-sm font-medium">Total Reports</p>
                    </div>
                    <h3 className="text-3xl font-bold text-white">{user.reportCount}</h3>
                </div>
                <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-emerald-400" />
                        <p className="text-slate-400 text-sm font-medium">Resolved</p>
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                        {user.issues.filter(i => i.status === 'RESOLVED').length}
                    </h3>
                </div>
                <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-amber-400" />
                        <p className="text-slate-400 text-sm font-medium">Pending</p>
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                        {user.issues.filter(i => i.status === 'PENDING').length}
                    </h3>
                </div>
            </div>

            {/* User Reports */}
            <div className="glass-card p-1">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white">User Reports</h2>
                </div>
                {user.issues.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/2">
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
                                <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Created</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {user.issues.map((issue) => (
                                <tr key={issue.id} className="group hover:bg-white/2 transition-colors">
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-medium text-white">{issue.title}</span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-400">{issue.category}</td>
                                    <td className="py-4 px-6">{getStatusBadge(issue.status)}</td>
                                    <td className="py-4 px-6">
                                        <span className={`text-sm font-medium ${issue.priority === 'HIGH' ? 'text-red-400' :
                                                issue.priority === 'MEDIUM' ? 'text-yellow-400' :
                                                    'text-green-400'
                                            }`}>
                                            {issue.priority}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right text-sm text-slate-500">
                                        {formatDate(issue.createdAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">This user hasn't created any reports yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;
