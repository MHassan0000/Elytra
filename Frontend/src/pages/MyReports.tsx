const MyReports = () => {
    const reports = [
        { id: 1, title: 'Street Light Repair Request', area: 'Gulberg, Block A', status: 'Resolved', upvotes: 12, submitted: '2024-11-15', resolved: '2024-11-20' },
        { id: 2, title: 'Pothole on Main Road', area: 'DHA, Phase 2', status: 'In Progress', upvotes: 23, submitted: '2024-11-25' },
        { id: 3, title: 'Garbage Collection Issue', area: 'Model Town, Block C', status: 'Pending', upvotes: 8, submitted: '2024-11-28' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">My Reports</h1>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <p className="text-sm text-slate-600 mb-1">Total Reports</p>
                    <p className="text-3xl font-semibold text-slate-900">3</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <p className="text-sm text-slate-600 mb-1">In Progress</p>
                    <p className="text-3xl font-semibold text-blue-600">1</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <p className="text-sm text-slate-600 mb-1">Resolved</p>
                    <p className="text-3xl font-semibold text-green-600">1</p>
                </div>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
                {reports.map((report) => (
                    <div key={report.id} className="bg-white border border-slate-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="text-base font-medium text-slate-900 mb-1">{report.title}</h3>
                                <p className="text-sm text-slate-600">📍 {report.area}</p>
                            </div>
                            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded ${report.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                    report.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                        'bg-yellow-100 text-yellow-700'
                                }`}>
                                {report.status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                            <div className="flex items-center gap-4">
                                <span>📅 Submitted: {report.submitted}</span>
                                {report.resolved && <span>✅ Resolved: {report.resolved}</span>}
                            </div>
                            <span>👍 {report.upvotes} upvotes</span>
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-slate-200">
                            <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700">
                                View Details
                            </button>
                            <button className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-50">
                                Share
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReports;
