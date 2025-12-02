const MyReports = () => {
    const reports = [
        { id: 1, title: 'Street Light Repair Request', area: 'Gulberg, Block A', status: 'Resolved', upvotes: 12, submitted: '2024-11-15', resolved: '2024-11-20' },
        { id: 2, title: 'Pothole on Main Road', area: 'DHA, Phase 2', status: 'In Progress', upvotes: 23, submitted: '2024-11-25' },
        { id: 3, title: 'Garbage Collection Issue', area: 'Model Town, Block C', status: 'Pending', upvotes: 8, submitted: '2024-11-28' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Reports</h1>
                    <p className="text-slate-400">Track and manage your submitted issues.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-2xl">📝</div>
                    <div>
                        <p className="text-slate-400 text-sm">Total Reports</p>
                        <p className="text-2xl font-bold text-white">3</p>
                    </div>
                </div>
                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">⏳</div>
                    <div>
                        <p className="text-slate-400 text-sm">In Progress</p>
                        <p className="text-2xl font-bold text-blue-400">1</p>
                    </div>
                </div>
                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-2xl">✅</div>
                    <div>
                        <p className="text-slate-400 text-sm">Resolved</p>
                        <p className="text-2xl font-bold text-emerald-400">1</p>
                    </div>
                </div>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
                {reports.map((report) => (
                    <div key={report.id} className="glass-card p-6 glass-card-hover">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">{report.title}</h3>
                                <p className="text-sm text-slate-400">📍 {report.area}</p>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${report.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                    report.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                }`}>
                                {report.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-white/5 mb-4">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Submitted</p>
                                <p className="text-sm text-slate-300">{report.submitted}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Upvotes</p>
                                <p className="text-sm text-slate-300">{report.upvotes}</p>
                            </div>
                            {report.resolved && (
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Resolved</p>
                                    <p className="text-sm text-emerald-400">{report.resolved}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors">
                                View Details
                            </button>
                            <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm font-medium text-slate-400 hover:text-white transition-colors">
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
