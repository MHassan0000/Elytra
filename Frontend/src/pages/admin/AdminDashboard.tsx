import AdminStatsCard from '../../components/admin/AdminStatsCard';

const AdminDashboard = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                <p className="text-slate-400">Manage your city's feedback and surveys</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AdminStatsCard
                    icon="📋"
                    value={1247}
                    label="Total Issues"
                    trend={{ value: 12, isPositive: true }}
                    color="blue"
                />
                <AdminStatsCard
                    icon="⏳"
                    value={89}
                    label="Pending"
                    trend={{ value: 5, isPositive: false }}
                    color="orange"
                />
                <AdminStatsCard
                    icon="✅"
                    value={1034}
                    label="Resolved"
                    trend={{ value: 18, isPositive: true }}
                    color="green"
                />
                <AdminStatsCard
                    icon="📊"
                    value={12}
                    label="Active Surveys"
                    trend={{ value: 3, isPositive: true }}
                    color="purple"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Issues */}
                <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Recent Issues</h2>
                        <button className="text-orange-500 text-sm font-medium hover:text-orange-400">
                            Manage All →
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-slate-400 text-sm border-b border-slate-800">
                                    <th className="pb-3 font-medium">Issue</th>
                                    <th className="pb-3 font-medium">Area</th>
                                    <th className="pb-3 font-medium">Upvotes</th>
                                    <th className="pb-3 font-medium">Status</th>
                                    <th className="pb-3 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { title: 'Broken Street Light', area: 'Gulberg', upvotes: 45, status: 'pending' },
                                    { title: 'Road Repair Needed', area: 'DHA', upvotes: 127, status: 'in-progress' },
                                    { title: 'Water Leakage', area: 'Johar Town', upvotes: 34, status: 'resolved' },
                                ].map((issue, i) => (
                                    <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50">
                                        <td className="py-4 text-white font-medium">{issue.title}</td>
                                        <td className="py-4 text-slate-400">{issue.area}</td>
                                        <td className="py-4">
                                            <span className="text-blue-500 font-bold">{issue.upvotes}</span>
                                        </td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${issue.status === 'resolved' ? 'bg-green-500/20 text-green-400' :
                                                    issue.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                {issue.status}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <button className="text-orange-500 hover:text-orange-400 text-sm font-medium">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* System Overview */}
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                    <h2 className="text-xl font-bold text-white mb-6">System Overview</h2>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">Issues This Week</span>
                                <span className="text-white font-bold">124</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-3/4"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">Response Time</span>
                                <span className="text-green-400 font-bold">2.4 days</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-green-600 w-4/5"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">User Satisfaction</span>
                                <span className="text-purple-400 font-bold">94%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-600 w-[94%]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-800">
                        <h3 className="text-sm font-bold text-slate-400 mb-3">QUICK ACTIONS</h3>
                        <div className="space-y-2">
                            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 rounded-lg transition-colors text-sm">
                                Add City/Area
                            </button>
                            <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 rounded-lg transition-colors text-sm">
                                Create Survey
                            </button>
                            <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 rounded-lg transition-colors text-sm">
                                View Reports
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Activity */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Recent User Activity</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { user: 'Ahmed Khan', action: 'submitted issue', time: '5 min ago' },
                        { user: 'Sara Ali', action: 'upvoted issue', time: '12 min ago' },
                        { user: 'Usman Malik', action: 'completed survey', time: '1 hour ago' },
                    ].map((activity, i) => (
                        <div key={i} className="p-4 bg-slate-800/50 rounded-lg">
                            <p className="text-white font-medium mb-1">{activity.user}</p>
                            <p className="text-slate-400 text-sm">{activity.action}</p>
                            <p className="text-slate-500 text-xs mt-2">{activity.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
