const Dashboard = () => {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">Mark</span> 👋
                    </h1>
                    <p className="text-slate-400">Here's what's happening in your community today.</p>
                </div>
                <button className="btn-gradient px-6 py-3 shadow-lg shadow-violet-500/20">
                    + New Report
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Total Reports', value: '12', change: '+2', color: 'from-violet-500 to-purple-500' },
                    { title: 'In Progress', value: '4', change: '+1', color: 'from-blue-500 to-cyan-500' },
                    { title: 'Resolved', value: '8', change: '+5', color: 'from-emerald-500 to-teal-500' },
                    { title: 'Community Rank', value: '#42', change: 'Top 5%', color: 'from-pink-500 to-rose-500' },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
                        <p className="text-slate-400 text-sm font-medium mb-2">{stat.title}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                            <span className="text-xs font-medium bg-white/5 text-white px-2 py-1 rounded-lg border border-white/5">
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity - Takes up 2 columns */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                        <button className="text-sm text-violet-400 hover:text-violet-300">View All</button>
                    </div>

                    <div className="glass-card p-1">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Issue</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Area</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { name: 'Broken Street Light', area: 'Gulberg', status: 'Pending', date: '2h ago' },
                                    { name: 'Garbage Collection', area: 'DHA Phase 2', status: 'In Progress', date: '5h ago' },
                                    { name: 'Water Supply', area: 'Johar Town', status: 'Resolved', date: '1d ago' },
                                    { name: 'Road Repair', area: 'Model Town', status: 'Pending', date: '2d ago' },
                                ].map((item, i) => (
                                    <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 px-6">
                                            <span className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">{item.name}</span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-400">{item.area}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    item.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right text-sm text-slate-500">{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Side Widgets */}
                <div className="space-y-6">
                    {/* Satisfaction Card */}
                    <div className="glass-card p-6 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent" />
                        <h3 className="text-lg font-bold text-white mb-6 relative z-10">Community Impact</h3>
                        <div className="relative w-40 h-40 mx-auto mb-6">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="#1e293b" strokeWidth="12" fill="transparent" />
                                <circle cx="80" cy="80" r="70" stroke="#8b5cf6" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="66" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-white">85%</span>
                                <span className="text-xs text-slate-400">Satisfaction</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400">Your reports have helped improve the community score by 5% this month.</p>
                    </div>

                    {/* Quick Actions */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 transition-all flex items-center gap-3 group">
                                <span className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">📍</span>
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white">Report Issue</span>
                            </button>
                            <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-pink-500/30 transition-all flex items-center gap-3 group">
                                <span className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">📝</span>
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white">Take Survey</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
