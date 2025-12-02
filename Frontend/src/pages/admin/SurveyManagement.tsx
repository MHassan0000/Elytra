import { useState } from 'react';

const SurveyManagement = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const surveys = [
        { id: 1, title: 'City Infrastructure Satisfaction Survey', areas: 'All Areas', responses: 1234, status: 'Active', created: '2024-11-15', endDate: '2024-12-31' },
        { id: 2, title: 'Public Transport Feedback', areas: 'Lahore, Karachi', responses: 567, status: 'Active', created: '2024-11-20', endDate: '2024-12-15' },
        { id: 3, title: 'Water Supply Quality Assessment', areas: 'Islamabad', responses: 892, status: 'Closed', created: '2024-10-01', endDate: '2024-11-30' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Survey Management</h1>
                    <p className="text-slate-400">Create and manage community surveys.</p>
                </div>
                <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="btn-gradient px-6 py-3 shadow-lg shadow-blue-500/20 bg-linear-to-r from-blue-600 to-cyan-600"
                >
                    + Create Survey
                </button>
            </div>

            {/* Create Form */}
            {showCreateForm && (
                <div className="glass-card p-8 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h2 className="text-xl font-bold text-white mb-6">Create New Survey</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Survey Title</label>
                            <input type="text" className="input-dark w-full" placeholder="Enter survey title..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Assign to Areas</label>
                            <select className="input-dark w-full">
                                <option>All Areas</option>
                                <option>Lahore</option>
                                <option>Karachi</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">End Date</label>
                            <input type="date" className="input-dark w-full" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="btn-gradient px-8 py-2.5 bg-linear-to-r from-blue-600 to-cyan-600">Create</button>
                        <button onClick={() => setShowCreateForm(false)} className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all">Cancel</button>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="glass-card p-1">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/2">
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Survey Title</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Areas</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Responses</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">End Date</th>
                            <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {surveys.map((survey) => (
                            <tr key={survey.id} className="group hover:bg-white/2 transition-colors">
                                <td className="py-4 px-6">
                                    <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors cursor-pointer">{survey.title}</span>
                                </td>
                                <td className="py-4 px-6 text-sm text-slate-400">{survey.areas}</td>
                                <td className="py-4 px-6 text-sm text-slate-300">{survey.responses}</td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${survey.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                        }`}>
                                        {survey.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right text-sm text-slate-500">{survey.endDate}</td>
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

export default SurveyManagement;
