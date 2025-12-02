const Dashboard = () => {
    const issues = [
        { id: 1, name: 'Broken Street Light', area: 'Gulberg', status: 'Pending', upvotes: 45, date: '2024-12-01' },
        { id: 2, name: 'Garbage Collection Issue', area: 'DHA Phase 2', status: 'In Progress', upvotes: 89, date: '2024-12-02' },
        { id: 3, name: 'Water Supply Problem', area: 'Johar Town', status: 'Resolved', upvotes: 34, date: '2024-11-28' },
        { id: 4, name: 'Road Repair Needed', area: 'Model Town', status: 'Pending', upvotes: 127, date: '2024-11-30' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">All Issues</h1>
                <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700">
                    + New Issue
                </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Find an issue..."
                    className="flex-1 max-w-md px-4 py-2 border border-slate-300 rounded text-sm"
                />
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Issue Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Area
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Upvotes
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {issues.map((issue) => (
                            <tr key={issue.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                                        {issue.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">{issue.area}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${issue.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                            issue.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {issue.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">{issue.upvotes}</td>
                                <td className="px-6 py-4 text-sm text-slate-700">{issue.date}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="text-slate-600 hover:text-slate-900">
                                            <span className="text-lg">⋯</span>
                                        </button>
                                        <button className="text-red-600 hover:text-red-700">
                                            <span className="text-lg">🗑️</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-between text-sm text-slate-600">
                <p>System Status: <span className="text-emerald-600 font-medium">All Good</span></p>
                <p>Last Login: {new Date().toLocaleString()}</p>
            </div>
        </div>
    );
};

export default Dashboard;
