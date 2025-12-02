import { useState } from 'react';

const IssuesManagement = () => {
    const [filter, setFilter] = useState('all');

    const issues = [
        { id: 1, title: 'Broken Street Light', area: 'Gulberg', category: 'Infrastructure', upvotes: 45, status: 'In Progress', date: '2024-12-01', user: 'Ahmed Khan' },
        { id: 2, title: 'Garbage Collection Issue', area: 'DHA Phase 2', category: 'Sanitation', upvotes: 89, status: 'Pending', date: '2024-12-02', user: 'Sara Ali' },
        { id: 3, title: 'Road Repair Needed', area: 'Model Town', category: 'Infrastructure', upvotes: 127, status: 'Pending', date: '2024-11-30', user: 'Usman Malik' },
        { id: 4, title: 'Water Supply Problem', area: 'Johar Town', category: 'Utilities', upvotes: 34, status: 'Resolved', date: '2024-11-28', user: 'Fatima Hassan' },
    ];

    const filteredIssues = filter === 'all' ? issues : issues.filter(i => i.status.toLowerCase().replace(' ', '-') === filter);

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
            <div className="glass-card p-2 flex items-center gap-2">
                {['All', 'Pending', 'In Progress', 'Resolved'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status.toLowerCase().replace(' ', '-'))}
                        className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${filter === status.toLowerCase().replace(' ', '-')
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
                        placeholder="Search issues..."
                        className="bg-[#0B0E14] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 w-64"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="glass-card p-1">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Issue Title</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Area</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Upvotes</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredIssues.map((issue) => (
                            <tr key={issue.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="py-4 px-6">
                                    <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors cursor-pointer">{issue.title}</span>
                                </td>
                                <td className="py-4 px-6 text-sm text-slate-400">{issue.area}</td>
                                <td className="py-4 px-6 text-sm text-slate-300">{issue.category}</td>
                                <td className="py-4 px-6 text-sm text-slate-300">{issue.upvotes}</td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${issue.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                            issue.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                        }`}>
                                        {issue.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">⋯</button>
                                        <button className="p-2 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-400 transition-colors">🗑️</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IssuesManagement;
