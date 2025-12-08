import { useState, useEffect } from 'react';
import { Search, Trash2, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { issueService } from '../../services/issueService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface Issue {
    id: number;
    title: string;
    category: string;
    priority: string;
    status: string;
    upvotes: number;
    createdAt: string;
    username: string;
    cityName?: string;
    zoneName?: string;
    areaName?: string;
}

const IssuesManagement = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

    useEffect(() => {
        fetchIssues();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchQuery, statusFilter, issues]);

    const fetchIssues = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await issueService.getAllIssues();
            setIssues(data);
        } catch (err: any) {
            console.error('Error fetching issues:', err);
            setError(err.message || 'Failed to load issues');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...issues];

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(issue => issue.status.toLowerCase().replace('_', '-') === statusFilter);
        }

        // Apply search filter
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(issue =>
                issue.title.toLowerCase().includes(query) ||
                issue.category.toLowerCase().includes(query)
            );
        }

        // Sort by upvotes in descending order (highest first)
        filtered.sort((a, b) => b.upvotes - a.upvotes);

        setFilteredIssues(filtered);
    };

    const handleStatusChange = async (issueId: number, newStatus: string) => {
        try {
            setUpdatingStatus(issueId);
            await issueService.updateIssueStatus(issueId, newStatus);
            // Update local state
            setIssues(issues.map(issue =>
                issue.id === issueId ? { ...issue, status: newStatus } : issue
            ));
        } catch (err: any) {
            console.error('Error updating issue status:', err);
            alert('Failed to update status: ' + (err.message || 'Unknown error'));
        } finally {
            setUpdatingStatus(null);
        }
    };

    const handleDeleteIssue = async (issueId: number) => {
        try {
            await issueService.deleteIssue(issueId);
            setIssues(issues.filter(i => i.id !== issueId));
            setDeleteConfirm(null);
        } catch (err: any) {
            console.error('Error deleting issue:', err);
            alert('Failed to delete issue: ' + (err.message || 'Unknown error'));
        }
    };

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { bg: string; text: string; border: string; icon: any }> = {
            PENDING: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', icon: Clock },
            IN_PROGRESS: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', icon: AlertCircle },
            RESOLVED: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', icon: CheckCircle },
        };
        const style = statusMap[status] || statusMap.PENDING;
        const Icon = style.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text} border ${style.border}`}>
                <Icon className="w-3 h-3" />
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

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={fetchIssues}
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
                    <h1 className="text-3xl font-bold text-white mb-2">Issues Management</h1>
                    <p className="text-slate-400">Track and resolve reported community issues.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-card p-2 flex items-center gap-2 flex-wrap">
                {['All', 'Pending', 'In Progress', 'Resolved'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status.toLowerCase().replace(' ', '-'))}
                        className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${statusFilter === status.toLowerCase().replace(' ', '-')
                            ? 'bg-[#151A25] text-white shadow-lg border border-white/10'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {status}
                    </button>
                ))}
                <div className="flex-1" />
                <div className="relative px-2">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search issues..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#0B0E14] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 w-64"
                    />
                </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-slate-400">
                Showing {filteredIssues.length} of {issues.length} issues
            </div>

            {/* Table */}
            <div className="glass-card p-1">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/2">
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Issue Title</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reporter</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Upvotes</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredIssues.map((issue) => (
                            <tr key={issue.id} className="group hover:bg-white/2 transition-colors">
                                <td className="py-4 px-6">
                                    <div>
                                        <span className="text-sm font-medium text-white">{issue.title}</span>
                                        {(issue.cityName || issue.zoneName || issue.areaName) && (
                                            <p className="text-xs text-slate-500 mt-1">
                                                {[issue.cityName, issue.zoneName, issue.areaName].filter(Boolean).join(' • ')}
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-slate-400">{issue.username}</td>
                                <td className="py-4 px-6 text-sm text-slate-300">{issue.category}</td>
                                <td className="py-4 px-6 text-sm text-slate-300">{issue.upvotes}</td>
                                <td className="py-4 px-6">
                                    {updatingStatus === issue.id ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-xs text-slate-400">Updating...</span>
                                        </div>
                                    ) : (
                                        <select
                                            value={issue.status}
                                            onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                                            className="bg-[#0B0E14] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500/50"
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="IN_PROGRESS">In Progress</option>
                                            <option value="RESOLVED">Resolved</option>
                                        </select>
                                    )}
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {deleteConfirm === issue.id ? (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleDeleteIssue(issue.id)}
                                                    className="px-3 py-1 bg-rose-500 text-white text-xs rounded-lg hover:bg-rose-600 transition-colors"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(null)}
                                                    className="px-3 py-1 bg-slate-600 text-white text-xs rounded-lg hover:bg-slate-700 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDeleteConfirm(issue.id)}
                                                className="p-2 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                                                title="Delete Issue"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredIssues.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-400">No issues found matching your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IssuesManagement;
