import { useState } from 'react';

const SurveyManagement = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const surveys = [
        { id: 1, title: 'City Infrastructure Satisfaction Survey', areas: 'All Areas', responses: 1234, status: 'Active', created: '2024-11-15', endDate: '2024-12-31' },
        { id: 2, title: 'Public Transport Feedback', areas: 'Lahore, Karachi', responses: 567, status: 'Active', created: '2024-11-20', endDate: '2024-12-15' },
        { id: 3, title: 'Water Supply Quality Assessment', areas: 'Islamabad', responses: 892, status: 'Closed', created: '2024-10-01', endDate: '2024-11-30' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">Survey Management</h1>
                <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700"
                >
                    + Create Survey
                </button>
            </div>

            {/* Create Form */}
            {showCreateForm && (
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Create New Survey</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Survey Title</label>
                            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded text-sm" placeholder="Enter survey title..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Assign to Areas</label>
                            <select className="w-full px-3 py-2 border border-slate-300 rounded text-sm">
                                <option>All Areas</option>
                                <option>Lahore</option>
                                <option>Karachi</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                            <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded text-sm" />
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700">Create</button>
                            <button onClick={() => setShowCreateForm(false)} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-50">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Survey Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Areas</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Responses</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">End Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {surveys.map((survey) => (
                            <tr key={survey.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-sm font-medium text-blue-600 hover:underline cursor-pointer">{survey.title}</td>
                                <td className="px-6 py-4 text-sm text-slate-700">{survey.areas}</td>
                                <td className="px-6 py-4 text-sm text-slate-700">{survey.responses}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${survey.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                                        }`}>
                                        {survey.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">{survey.endDate}</td>
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

export default SurveyManagement;
