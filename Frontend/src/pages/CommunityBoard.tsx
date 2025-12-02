const CommunityBoard = () => {
    const issues = [
        { id: 1, title: 'Broken Street Light on Main Boulevard', area: 'Gulberg, Block A', upvotes: 45, status: 'In Progress', user: 'Ahmed Khan', time: '2 hours ago' },
        { id: 2, title: 'Garbage Collection Not Regular', area: 'DHA, Phase 2', upvotes: 89, status: 'Pending', user: 'Sara Ali', time: '5 hours ago' },
        { id: 3, title: 'Road Repair Needed Urgently', area: 'Model Town, Block C', upvotes: 127, status: 'Pending', user: 'Usman Malik', time: '1 day ago' },
        { id: 4, title: 'Water Supply Issues', area: 'Johar Town, Block B', upvotes: 34, status: 'Resolved', user: 'Fatima Hassan', time: '2 days ago' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">Community Board</h1>
                <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700">
                    + Submit Issue
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search issues..."
                    className="flex-1 max-w-md px-4 py-2 border border-slate-300 rounded text-sm"
                />
                <select className="px-4 py-2 border border-slate-300 rounded text-sm">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                </select>
            </div>

            {/* Issues Grid */}
            <div className="grid grid-cols-1 gap-4">
                {issues.map((issue) => (
                    <div key={issue.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="text-base font-medium text-slate-900 mb-1">{issue.title}</h3>
                                <p className="text-sm text-slate-600">📍 {issue.area}</p>
                            </div>
                            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded ${issue.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                    issue.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                        'bg-yellow-100 text-yellow-700'
                                }`}>
                                {issue.status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-600">
                            <div className="flex items-center gap-4">
                                <span>👤 {issue.user}</span>
                                <span>🕒 {issue.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1 px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">
                                    <span>👍</span>
                                    <span className="font-medium">{issue.upvotes}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityBoard;
