import { useState } from 'react';

const CommunityBoard = () => {
    const [filter, setFilter] = useState('all');

    const issues = [
        { id: 1, title: 'Broken Street Light on Main Boulevard', area: 'Gulberg, Block A', upvotes: 45, status: 'In Progress', user: 'Ahmed Khan', time: '2 hours ago' },
        { id: 2, title: 'Garbage Collection Not Regular', area: 'DHA, Phase 2', upvotes: 89, status: 'Pending', user: 'Sara Ali', time: '5 hours ago' },
        { id: 3, title: 'Road Repair Needed Urgently', area: 'Model Town, Block C', upvotes: 127, status: 'Pending', user: 'Usman Malik', time: '1 day ago' },
        { id: 4, title: 'Water Supply Issues', area: 'Johar Town, Block B', upvotes: 34, status: 'Resolved', user: 'Fatima Hassan', time: '2 days ago' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Community Board</h1>
                    <p className="text-slate-400">See what's happening in your neighborhood.</p>
                </div>
                <button className="btn-gradient px-6 py-3 shadow-lg shadow-violet-500/20">
                    + Submit Issue
                </button>
            </div>

            {/* Filters */}
            <div className="glass-card p-2 flex items-center gap-2">
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
                        className="bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 w-64"
                    />
                </div>
            </div>

            {/* Issues Grid */}
            <div className="grid grid-cols-1 gap-4">
                {issues.map((issue) => (
                    <div key={issue.id} className="glass-card p-6 glass-card-hover group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${issue.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            issue.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        }`}>
                                        {issue.status}
                                    </span>
                                    <span className="text-xs text-slate-500">#{issue.id}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-violet-400 transition-colors">{issue.title}</h3>
                                <p className="text-sm text-slate-400 flex items-center gap-2">
                                    <span>📍</span> {issue.area}
                                </p>
                            </div>
                            <button className="flex flex-col items-center gap-1 bg-white/5 hover:bg-violet-500/20 border border-white/5 hover:border-violet-500/30 rounded-xl p-3 transition-all group/vote">
                                <span className="text-xl group-hover/vote:-translate-y-1 transition-transform">👍</span>
                                <span className="text-sm font-bold text-white group-hover/vote:text-violet-400">{issue.upvotes}</span>
                            </button>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white">
                                    {issue.user.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-300">{issue.user}</span>
                                    <span className="text-xs text-slate-500">{issue.time}</span>
                                </div>
                            </div>
                            <button className="text-sm text-slate-400 hover:text-white transition-colors">
                                View Details →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityBoard;
