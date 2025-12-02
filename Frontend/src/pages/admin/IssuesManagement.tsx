import { useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import ActionButton from '../../components/admin/ActionButton';

const IssuesManagement = () => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const issues = [
        {
            id: 1,
            title: 'Broken Street Light on Main Boulevard',
            area: 'Gulberg, Block A',
            category: 'Infrastructure',
            upvotes: 45,
            status: 'in-progress',
            date: '2024-12-01',
            user: 'Ahmed Khan',
        },
        {
            id: 2,
            title: 'Garbage Collection Not Regular',
            area: 'DHA, Phase 2',
            category: 'Sanitation',
            upvotes: 89,
            status: 'pending',
            date: '2024-12-02',
            user: 'Sara Ali',
        },
        {
            id: 3,
            title: 'Road Repair Needed Urgently',
            area: 'Model Town, Block C',
            category: 'Infrastructure',
            upvotes: 127,
            status: 'pending',
            date: '2024-11-30',
            user: 'Usman Malik',
        },
        {
            id: 4,
            title: 'Water Supply Issues',
            area: 'Johar Town, Block B',
            category: 'Utilities',
            upvotes: 34,
            status: 'resolved',
            date: '2024-11-28',
            user: 'Fatima Hassan',
        },
    ];

    const columns = [
        {
            key: 'title',
            label: 'Issue Title',
            sortable: true,
            render: (value: string) => (
                <span className="font-medium text-white">{value}</span>
            ),
        },
        {
            key: 'area',
            label: 'Area',
            sortable: true,
        },
        {
            key: 'category',
            label: 'Category',
            sortable: true,
        },
        {
            key: 'upvotes',
            label: 'Upvotes',
            sortable: true,
            render: (value: number) => (
                <span className="flex items-center gap-1">
                    <span>👍</span>
                    <span className="font-semibold text-blue-400">{value}</span>
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (value: string) => <StatusBadge status={value as any} />,
        },
        {
            key: 'date',
            label: 'Date',
            sortable: true,
        },
        {
            key: 'user',
            label: 'Reported By',
            sortable: true,
        },
    ];

    const filteredIssues = issues.filter((issue) => {
        const matchesFilter = filter === 'all' || issue.status === filter;
        const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            issue.area.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="ml-56 mt-14 p-6 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-1">Issues Management</h1>
                <p className="text-sm text-gray-400">
                    Manage and moderate user-reported issues
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="card p-4">
                    <p className="text-sm text-gray-400 mb-1">Total Issues</p>
                    <p className="text-2xl font-bold text-white">{issues.length}</p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-gray-400 mb-1">Pending</p>
                    <p className="text-2xl font-bold text-yellow-400">
                        {issues.filter(i => i.status === 'pending').length}
                    </p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-gray-400 mb-1">In Progress</p>
                    <p className="text-2xl font-bold text-blue-400">
                        {issues.filter(i => i.status === 'in-progress').length}
                    </p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-gray-400 mb-1">Resolved</p>
                    <p className="text-2xl font-bold text-green-400">
                        {issues.filter(i => i.status === 'resolved').length}
                    </p>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="mb-6 flex flex-wrap gap-4 items-center">
                <div className="flex gap-2">
                    {['all', 'pending', 'in-progress', 'resolved'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Search issues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 max-w-md px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400"
                />
            </div>

            {/* Issues Table */}
            <div
                className="rounded-xl overflow-hidden"
                style={{
                    background: 'rgba(26, 31, 58, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <DataTable
                    columns={columns}
                    data={filteredIssues}
                    actions={(row) => (
                        <>
                            <button className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
                                Update Status
                            </button>
                            <button className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10 text-white rounded transition-colors">
                                View Details
                            </button>
                            <button className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
                                Delete
                            </button>
                        </>
                    )}
                />
            </div>
        </div>
    );
};

export default IssuesManagement;
