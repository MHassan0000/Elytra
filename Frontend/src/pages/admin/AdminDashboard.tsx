const AdminDashboard = () => {
    const users = [
        { id: 1, username: 'ahmed_khan', email: 'ahmed@example.com', reports: 12, status: 'Active', joined: '2024-01-15' },
        { id: 2, username: 'sara_ali', email: 'sara@example.com', reports: 8, status: 'Active', joined: '2024-02-20' },
        { id: 3, username: 'usman_malik', email: 'usman@example.com', reports: 15, status: 'Active', joined: '2024-03-10' },
        { id: 4, username: 'fatima_hassan', email: 'fatima@example.com', reports: 5, status: 'Inactive', joined: '2024-04-05' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                    <p className="text-slate-400">System overview and management.</p>
                </div>
                <button className="btn-gradient px-6 py-3 shadow-lg shadow-blue-500/20 bg-linear-to-r from-blue-600 to-cyan-600">
                    + Add User
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { title: 'Total Users', value: '1,234', change: '+12%', color: 'from-blue-500 to-cyan-500' },
                    { title: 'Active Issues', value: '56', change: '-5%', color: 'from-violet-500 to-purple-500' },
                    { title: 'Resolved', value: '892', change: '+8%', color: 'from-emerald-500 to-teal-500' },
                    { title: 'Pending', value: '23', change: '+2%', color: 'from-amber-500 to-orange-500' },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${stat.color} opacity-10 rounded-bl-full -mr-4 -mt-4`} />
                        <p className="text-slate-400 text-sm font-medium mb-2">{stat.title}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                            <span className={`text-xs font-medium px-2 py-1 rounded-lg border ${stat.change.startsWith('+')
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Users Table */}
            <div className="glass-card p-1">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Recent Users</h2>
                    <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/2">
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Username</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reports</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                            <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map((user) => (
                            <tr key={user.id} className="group hover:bg-white/2 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-cyan-600 flex items-center justify-center text-xs font-bold text-white">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{user.username}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-slate-400">{user.email}</td>
                                <td className="py-4 px-6 text-sm text-slate-300">{user.reports}</td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right text-sm text-slate-500">{user.joined}</td>
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

export default AdminDashboard;
