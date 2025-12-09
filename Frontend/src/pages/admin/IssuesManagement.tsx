import { useState, useEffect } from 'react';
import { Search, Trash2, AlertCircle, CheckCircle, Clock, X, MapPin, User, Calendar, ThumbsUp } from 'lucide-react';
import { issueService } from '../../services/issueService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Button3D from '../../components/ui/Button3D';

interface Issue {
    id: number;
    title: string;
    description?: string;
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
    const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
    const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

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

    const handleDeleteIssue = async () => {
        if (!deleteTarget) return;

        try {
            await issueService.deleteIssue(deleteTarget.id);
            setIssues(issues.filter(i => i.id !== deleteTarget.id));
            setDeleteTarget(null);
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
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Issues Management</h1>
                <p className="text-sm sm:text-base text-slate-400">Track and resolve reported community issues.</p>
            </div>

            {/* Filters */}
            <div className="glass-card p-2 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-2">
                <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                    {['All', 'Pending', 'In Progress', 'Resolved'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status.toLowerCase().replace(' ', '-'))}
                            className={`px-4 lg:px-6 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${statusFilter === status.toLowerCase().replace(' ', '-')
                                ? 'bg-[#151A25] text-white shadow-lg border border-white/10'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <div className="flex-1" />
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search issues..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#0B0E14] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 w-full lg:w-64"
                    />
                </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-slate-400">
                Showing {filteredIssues.length} of {issues.length} issues
            </div>

            {/* Table */}
            <div className="glass-card p-1 overflow-x-auto">
                <table className="w-full min-w-[800px]">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/2">
                            <th className="text-left py-4 px-4 lg:px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Issue Title</th>
                            <th className="text-left py-4 px-4 lg:px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reporter</th>
                            <th className="text-left py-4 px-4 lg:px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="text-left py-4 px-4 lg:px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Upvotes</th>
                            <th className="text-left py-4 px-4 lg:px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="text-right py-4 px-4 lg:px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredIssues.map((issue) => (
                            <tr
                                key={issue.id}
                                className="group hover:bg-white/2 transition-colors cursor-pointer"
                                onClick={() => setSelectedIssue(issue)}
                            >
                                <td className="py-4 px-4 lg:px-6">
                                    <div>
                                        <span className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">{issue.title}</span>
                                        {(issue.cityName || issue.zoneName || issue.areaName) && (
                                            <p className="text-xs text-slate-500 mt-1">
                                                {[issue.cityName, issue.zoneName, issue.areaName].filter(Boolean).join(' • ')}
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-4 lg:px-6 text-sm text-slate-400">{issue.username}</td>
                                <td className="py-4 px-4 lg:px-6 text-sm text-slate-300">{issue.category}</td>
                                <td className="py-4 px-4 lg:px-6 text-sm text-slate-300">{issue.upvotes}</td>
                                <td className="py-4 px-4 lg:px-6" onClick={(e) => e.stopPropagation()}>
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
                                <td className="py-4 px-4 lg:px-6 text-right" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => setDeleteTarget({ id: issue.id, title: issue.title })}
                                        className="p-2 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                                        title="Delete Issue"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
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

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteTarget !== null}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDeleteIssue}
                title="Delete Issue"
                message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
                confirmText="Delete Issue"
                cancelText="Cancel"
                variant="danger"
            />

            {/* Issue Detail Modal */}
            {selectedIssue && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="glass-card max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="sticky top-0 bg-[#151A25]/95 backdrop-blur-sm border-b border-white/5 p-6 flex items-start justify-between">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white mb-2">{selectedIssue.title}</h2>
                                <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${selectedIssue.status === 'RESOLVED'
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                        : selectedIssue.status === 'IN_PROGRESS'
                                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        }`}>
                                        {selectedIssue.status.replace('_', ' ')}
                                    </span>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${selectedIssue.priority === 'HIGH'
                                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                        : selectedIssue.priority === 'MEDIUM'
                                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                        }`}>
                                        {selectedIssue.priority} Priority
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedIssue(null)}
                                className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Description */}
                            {selectedIssue.description && (
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Description</h3>
                                    <p className="text-slate-300 leading-relaxed">{selectedIssue.description}</p>
                                </div>
                            )}

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Category */}
                                <div className="glass-card p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                                            <AlertCircle className="w-5 h-5 text-violet-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Category</p>
                                            <p className="text-sm font-medium text-white">{selectedIssue.category}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                {(selectedIssue.cityName || selectedIssue.zoneName || selectedIssue.areaName) && (
                                    <div className="glass-card p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                                <MapPin className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">Location</p>
                                                <p className="text-sm font-medium text-white">
                                                    {[selectedIssue.cityName, selectedIssue.zoneName, selectedIssue.areaName]
                                                        .filter(Boolean)
                                                        .join(' > ')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Reporter */}
                                <div className="glass-card p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                                            <User className="w-5 h-5 text-pink-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Reported By</p>
                                            <p className="text-sm font-medium text-white">{selectedIssue.username}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="glass-card p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Submitted</p>
                                            <p className="text-sm font-medium text-white">
                                                {new Date(selectedIssue.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Upvotes */}
                                <div className="glass-card p-4 md:col-span-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                            <ThumbsUp className="w-5 h-5 text-amber-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Community Support</p>
                                            <p className="text-sm font-medium text-white">{selectedIssue.upvotes} upvotes</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="border-t border-white/5 pt-6">
                                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Actions</h3>
                                <div className="flex flex-wrap gap-3">
                                    {selectedIssue.status !== 'PENDING' && (
                                        <Button3D
                                            onClick={() => {
                                                handleStatusChange(selectedIssue.id, 'PENDING');
                                                setSelectedIssue({ ...selectedIssue, status: 'PENDING' });
                                            }}
                                            variant="white"
                                            size="md"
                                        >
                                            <Clock className="w-4 h-4 ml-2" />
                                            Mark as Pending
                                        </Button3D>
                                    )}
                                    {selectedIssue.status !== 'IN_PROGRESS' && (
                                        <Button3D
                                            onClick={() => {
                                                handleStatusChange(selectedIssue.id, 'IN_PROGRESS');
                                                setSelectedIssue({ ...selectedIssue, status: 'IN_PROGRESS' });
                                            }}
                                            variant="blue"
                                            size="md"
                                        >
                                            <AlertCircle className="w-4 h-4 mr-2" />
                                            In Progress
                                        </Button3D>
                                    )}
                                    {selectedIssue.status !== 'RESOLVED' && (
                                        <Button3D
                                            onClick={() => {
                                                handleStatusChange(selectedIssue.id, 'RESOLVED');
                                                setSelectedIssue({ ...selectedIssue, status: 'RESOLVED' });
                                            }}
                                            variant="green"
                                            size="md"
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Resolve
                                        </Button3D>
                                    )}
                                    <Button3D
                                        onClick={() => {
                                            setDeleteTarget({ id: selectedIssue.id, title: selectedIssue.title });
                                            setSelectedIssue(null);
                                        }}
                                        variant="red"
                                        size="md"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button3D>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IssuesManagement;
