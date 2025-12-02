const MyReports = () => {
    const reports = [
        {
            id: 1,
            title: 'Street Light Repair Request',
            area: 'Gulberg, Block A',
            status: 'resolved',
            upvotes: 12,
            submittedDate: '2024-11-15',
            resolvedDate: '2024-11-20',
        },
        {
            id: 2,
            title: 'Pothole on Main Road',
            area: 'DHA, Phase 2',
            status: 'in-progress',
            upvotes: 23,
            submittedDate: '2024-11-25',
        },
        {
            id: 3,
            title: 'Garbage Collection Issue',
            area: 'Model Town, Block C',
            status: 'pending',
            upvotes: 8,
            submittedDate: '2024-11-28',
        },
    ];

    const statusColors: Record<string, string> = {
        pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        resolved: 'bg-green-500/20 text-green-400 border-green-500/30',
    };

    return (
        <div className="ml-56 mt-14 p-6 min-h-screen">
            {/* Header */}
            <div className="mb-8 animate-fadeIn">
                <h1 className="text-4xl font-bold text-white mb-2">
                    My Reports 📋
                </h1>
                <p className="text-lg text-gray-400">
                    Track the status of your submitted feedback
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">📝</span>
                        <div>
                            <p className="text-3xl font-bold text-white">3</p>
                            <p className="text-sm text-gray-400">Total Reports</p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">⏳</span>
                        <div>
                            <p className="text-3xl font-bold text-blue-400">1</p>
                            <p className="text-sm text-gray-400">In Progress</p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">✅</span>
                        <div>
                            <p className="text-3xl font-bold text-green-400">1</p>
                            <p className="text-sm text-gray-400">Resolved</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
                {reports.map((report) => (
                    <div key={report.id} className="card glass-hover">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {report.title}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <span className="flex items-center gap-1">
                                        📍 {report.area}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        📅 {new Date(report.submittedDate).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        👍 {report.upvotes} upvotes
                                    </span>
                                </div>
                            </div>
                            <span
                                className={`text-xs font-semibold px-4 py-2 rounded-full border ${statusColors[report.status]
                                    }`}
                            >
                                {report.status.replace('-', ' ')}
                            </span>
                        </div>

                        {report.resolvedDate && (
                            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                                <p className="text-sm text-green-300">
                                    ✅ Resolved on {new Date(report.resolvedDate).toLocaleDateString()}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                            <button className="btn-secondary text-sm flex-1">
                                View Details
                            </button>
                            <button className="btn-secondary text-sm px-6">
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
