const UserManagement = () => {
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
                    <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
                    <p className="text-slate-400">Manage registered users and permissions.</p>
                </div>
            </div>

            {/* Search */}
            <div className="glass-card p-2 flex items-center gap-2">
                <div className="relative flex-1 px-2">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        className="bg-[#0B0E14] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50 w-full"
                    />
                </div>
                <button className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    Filters
                </button>
                <button className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    Export
                </button>
            </div>

            {/* Table */}
            <div className="glass-card p-1">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
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
                            <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-600 flex items-center justify-center text-xs font-bold text-white">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors cursor-pointer">{user.username}</span>
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

export default UserManagement;
