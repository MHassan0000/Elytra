const AdminDashboard = () => {
    const users = [
        { id: 1, username: 'ahmed_khan', email: 'ahmed@example.com', reports: 12, status: 'Active', joined: '2024-01-15' },
        { id: 2, username: 'sara_ali', email: 'sara@example.com', reports: 8, status: 'Active', joined: '2024-02-20' },
        { id: 3, username: 'usman_malik', email: 'usman@example.com', reports: 15, status: 'Active', joined: '2024-03-10' },
        { id: 4, username: 'fatima_hassan', email: 'fatima@example.com', reports: 5, status: 'Inactive', joined: '2024-04-05' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">All Users</h1>
                <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700">
                    + Add User
                </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Find a user..."
                    className="flex-1 max-w-md px-4 py-2 border border-slate-300 rounded text-sm"
                />
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Username
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Reports
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Joined
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                                        {user.username}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">{user.email}</td>
                                <td className="px-6 py-4 text-sm text-slate-700">{user.reports}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">{user.joined}</td>
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
                <p>Admin Mode Active</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
