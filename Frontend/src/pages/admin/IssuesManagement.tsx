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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">Issues Management</h1>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search issues..."
                    className="flex-1 max-w-md px-4 py-2 border border-slate-300 rounded text-sm"
                />
                <div className="flex gap-2">
                    {['all', 'pending', 'in-progress', 'resolved'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 text-sm font-medium rounded ${filter === status
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Issue Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Area</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Upvotes</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {filteredIssues.map((issue) => (
                            <tr key={issue.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-sm font-medium text-blue-600 hover:underline cursor-pointer">{issue.title}</td>
                                <td className="px-6 py-4 text-sm text-slate-700">{issue.area}</td>
                                <td className="px-6 py-4 text-sm text-slate-700">{issue.category}</td>
                                <td className="px-6 py-4 text-sm text-slate-700">{issue.upvotes}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${issue.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                            issue.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {issue.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="text-slate-600 hover:text-slate-900">⋯</button>
                                        <button className="text-red-600 hover:text-red-700">🗑️</button>
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
