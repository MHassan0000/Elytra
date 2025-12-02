import { useState } from 'react';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import ActionButton from '../../components/admin/ActionButton';

const SurveyManagement = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const surveys = [
        {
            id: 1,
            title: 'City Infrastructure Satisfaction Survey',
            areas: 'All Areas',
            responses: 1234,
            status: 'active',
            created: '2024-11-15',
            endDate: '2024-12-31',
        },
        {
            id: 2,
            title: 'Public Transport Feedback',
            areas: 'Lahore, Karachi',
            responses: 567,
            status: 'active',
            created: '2024-11-20',
            endDate: '2024-12-15',
        },
        {
            id: 3,
            title: 'Water Supply Quality Assessment',
            areas: 'Islamabad',
            responses: 892,
            status: 'closed',
            created: '2024-10-01',
            endDate: '2024-11-30',
        },
    ];

    const columns = [
        {
            key: 'title',
            label: 'Survey Title',
            sortable: true,
            render: (value: string) => (
                <span className="font-medium text-white">{value}</span>
            ),
        },
        {
            key: 'areas',
            label: 'Assigned Areas',
            sortable: true,
        },
        {
            key: 'responses',
            label: 'Responses',
            sortable: true,
            render: (value: number) => (
                <span className="font-semibold text-blue-400">{value}</span>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (value: string) => <StatusBadge status={value as any} />,
        },
        {
            key: 'created',
            label: 'Created',
            sortable: true,
        },
        {
            key: 'endDate',
            label: 'End Date',
            sortable: true,
        },
    ];

    return (
        <div className="ml-56 mt-14 p-6 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-1">Survey Management</h1>
                <p className="text-sm text-gray-400">
                    Create and manage city surveys
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="card p-4">
                    <p className="text-sm text-gray-400 mb-1">Total Surveys</p>
                    <p className="text-2xl font-bold text-white">{surveys.length}</p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-gray-400 mb-1">Active</p>
                    <p className="text-2xl font-bold text-green-400">
                        {surveys.filter(s => s.status === 'active').length}
                    </p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-gray-400 mb-1">Total Responses</p>
                    <p className="text-2xl font-bold text-blue-400">
                        {surveys.reduce((sum, s) => sum + s.responses, 0)}
                    </p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-gray-400 mb-1">Avg Response Rate</p>
                    <p className="text-2xl font-bold text-purple-400">68%</p>
                </div>
            </div>

            {/* Actions */}
            <div className="mb-6">
                <ActionButton
                    icon="➕"
                    label="Create New Survey"
                    onClick={() => setShowCreateForm(!showCreateForm)}
                />
            </div>

            {/* Create Survey Form */}
            {showCreateForm && (
                <div
                    className="rounded-xl p-6 mb-6"
                    style={{
                        background: 'rgba(26, 31, 58, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <h2 className="text-xl font-bold text-white mb-4">Create New Survey</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Survey Title
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                                placeholder="Enter survey title..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Assign to Areas
                            </label>
                            <select className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white">
                                <option>All Areas</option>
                                <option>Lahore</option>
                                <option>Karachi</option>
                                <option>Islamabad</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                End Date
                            </label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                            />
                        </div>
                        <div className="flex gap-3">
                            <ActionButton icon="✓" label="Create Survey" onClick={() => setShowCreateForm(false)} />
                            <ActionButton
                                icon="✕"
                                label="Cancel"
                                onClick={() => setShowCreateForm(false)}
                                variant="secondary"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Surveys Table */}
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
                    data={surveys}
                    actions={(row) => (
                        <>
                            <button className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
                                View Responses
                            </button>
                            <button className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10 text-white rounded transition-colors">
                                Edit
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

export default SurveyManagement;
