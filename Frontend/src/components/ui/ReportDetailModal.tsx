import { X, MapPin, Calendar, TrendingUp } from 'lucide-react';
import type { Issue } from '../../types/types';

interface ReportDetailModalProps {
    issue: Issue | null;
    onClose: () => void;
}

const ReportDetailModal = ({ issue, onClose }: ReportDetailModalProps) => {
    if (!issue) return null;

    const getStatusBadge = (status: string) => {
        const badges = {
            'RESOLVED': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
            'IN_PROGRESS': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
            'PENDING': 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
        };
        return badges[status as keyof typeof badges] || badges.PENDING;
    };

    const getPriorityBadge = (priority: string) => {
        const badges = {
            'HIGH': 'bg-red-500/10 text-red-400 border border-red-500/20',
            'MEDIUM': 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
            'LOW': 'bg-green-500/10 text-green-400 border border-green-500/20'
        };
        return badges[priority as keyof typeof badges] || badges.MEDIUM;
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-[#0F1419]/95 backdrop-blur-sm border-b border-white/10 p-6 flex items-start justify-between">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-2">{issue.title}</h2>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(issue.status)}`}>
                                {issue.status.replace('_', ' ')}
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(issue.priority)}`}>
                                {issue.priority} Priority
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Description */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
                        <p className="text-slate-300 leading-relaxed">{issue.description}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-card p-4">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <MapPin size={16} />
                                <span className="text-xs font-semibold uppercase tracking-wider">Category</span>
                            </div>
                            <p className="text-white font-medium">{issue.category}</p>
                        </div>

                        <div className="glass-card p-4">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <TrendingUp size={16} />
                                <span className="text-xs font-semibold uppercase tracking-wider">Upvotes</span>
                            </div>
                            <p className="text-white font-medium">{issue.upvotes}</p>
                        </div>

                        <div className="glass-card p-4">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                                <Calendar size={16} />
                                <span className="text-xs font-semibold uppercase tracking-wider">Submitted</span>
                            </div>
                            <p className="text-white font-medium">{new Date(issue.createdAt).toLocaleDateString()}</p>
                        </div>

                        {issue.resolvedAt && (
                            <div className="glass-card p-4">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <Calendar size={16} />
                                    <span className="text-xs font-semibold uppercase tracking-wider">Resolved</span>
                                </div>
                                <p className="text-emerald-400 font-medium">{new Date(issue.resolvedAt).toLocaleDateString()}</p>
                            </div>
                        )}
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="w-full btn-gradient px-6 py-3"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportDetailModal;
