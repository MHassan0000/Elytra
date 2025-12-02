import StatsCard from '../components/ui/StatsCard';

const Dashboard = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-slate-400">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Trending Issues"
                    value="156"
                    icon="🔥"
                    trend={{ value: 23, isPositive: true }}
                />
                <StatsCard
                    title="Active Surveys"
                    value="3"
                    icon="📊"
                    trend={{ value: 0, isPositive: true }}
                />
                <StatsCard
                    title="My Reports"
                    value="12"
                    icon="📋"
                    trend={{ value: 8, isPositive: false }}
                />
                <StatsCard
                    title="Resolved"
                    value="89"
                    icon="✅"
                    trend={{ value: 15, isPositive: true }}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Trending Problems */}
                <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Trending Problems</h2>
                        <button className="text-blue-500 text-sm font-medium hover:text-blue-400">
                            View All →
                        </button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { title: 'Broken Street Light on Main Boulevard', area: 'Gulberg, Block A', upvotes: 45, status: 'In Progress' },
                            { title: 'Garbage Collection Not Regular', area: 'DHA, Phase 2', upvotes: 89, status: 'Pending' },
                            { title: 'Water Supply Issues', area: 'Johar Town', upvotes: 34, status: 'Resolved' },
                        ].map((issue, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                                <div className="flex-1">
                                    <h3 className="text-white font-medium mb-1">{issue.title}</h3>
                                    <p className="text-slate-400 text-sm">📍 {issue.area}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 text-blue-500">
                                        <span>👍</span>
                                        <span className="font-bold">{issue.upvotes}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${issue.status === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                                            issue.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                                                'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                        {issue.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
                    <div className="space-y-3">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                            <span>📝</span>
                            Submit Feedback
                        </button>
                        <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                            <span>👥</span>
                            Community Board
                        </button>
                        <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                            <span>📊</span>
                            Participate in Survey
                        </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-800">
                        <h3 className="text-sm font-bold text-slate-400 mb-3">AREA SELECTOR</h3>
                        <select className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
                            <option>Select Zone</option>
                            <option>Zone A</option>
                            <option>Zone B</option>
                        </select>
                        <select className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600">
                            <option>Select Area</option>
                            <option>Area 1</option>
                            <option>Area 2</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                <div className="space-y-4">
                    {[
                        { user: 'Ahmed Khan', action: 'submitted a new issue', time: '5 min ago', icon: '📋' },
                        { user: 'Sara Ali', action: 'upvoted an issue', time: '12 min ago', icon: '👍' },
                        { user: 'Usman Malik', action: 'completed a survey', time: '1 hour ago', icon: '✅' },
                    ].map((activity, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-xl">
                                {activity.icon}
                            </div>
                            <div className="flex-1">
                                <p className="text-white">
                                    <span className="font-medium">{activity.user}</span>
                                    <span className="text-slate-400"> {activity.action}</span>
                                </p>
                                <p className="text-slate-500 text-sm">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
