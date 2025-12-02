import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';

const UserManagement = () => {
    const users = [
        {
            id: 1,
            username: 'ahmed_khan',
            email: 'ahmed@example.com',
            reports: 12,
            joinDate: '2024-01-15',
            status: 'active',
        },
        {
            id: 2,
            username: 'sara_ali',
            email: 'sara@example.com',
            reports: 8,
            joinDate: '2024-02-20',
            status: 'active',
        },
        {
            id: 3,
            username: 'usman_malik',
            email: 'usman@example.com',
            reports: 15,
            joinDate: '2024-03-10',
            status: 'active',
        },
        {
            id: 4,
            username: 'fatima_hassan',
            email: 'fatima@example.com',
            reports: 5,
            joinDate: '2024-04-05',
            status: 'inactive',
        },
    ];

    const columns = [
        {
            key: 'username',
            label: 'Username',
            sortable: true,
            render: (value: string) => (
                <span className="font-medium text-white">{value}</span>
            ),
        },
        {
            key: 'email',
            label: 'Email',
            sortable: true,
        },
        {
            key: 'reports',
            label: 'Reports Submitted',
            sortable: true,
            render: (value: number) => (
                <span className="font-semibold text-blue-400">{value}</span>
            ),
        },
        {
            key: 'joinDate',
            label: 'Join Date',
            sortable: true,
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (value: string) => <StatusBadge status={value as any} />,
        },
    ];

    return (
        <div className="ml-56 mt-14 p-6 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-1">User Management</h1>
                <p className="text-sm text-gray-400">
                    Manage registered users and their activities
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="card p-4">
                    <p className="text-sm text-gray-400 mb-1">Total Users</p>
                    <p className="text-2xl font-bold text-white">{users.length}</p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-gray-400 mb-1">Active Users</p>
                    <p className="text-2xl font-bold text-green-400">
                        {users.filter(u => u.status === 'active').length}
                    </p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-gray-400 mb-1">New This Month</p>
                    <p className="text-2xl font-bold text-blue-400">24</p>
                </div>
                <div className="card p-4">
                    <p className="text-sm text-gray-400 mb-1">Avg Reports/User</p>
                    <p className="text-2xl font-bold text-purple-400">
                        {(users.reduce((sum, u) => sum + u.reports, 0) / users.length).toFixed(1)}
                    </p>
                </div>
            </div>

            {/* Users Table */}
            <div
                className="rounded-xl overflow-hidden"
                style={{
                    background: 'rgba(26, 31, 58, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <DataTable
                    columns={columns}
                    data={users}
                    actions={(row) => (
                        <>
                            <button className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
                                View Profile
                            </button>
                            <button className="px-3 py-1 text-xs bg-yellow-600 hover:bg-yellow-700 text-white rounded transition-colors">
                                {row.status === 'active' ? 'Block' : 'Unblock'}
                            </button>
                            <button className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
                                Deactivate
                            </button>
                        </>
                    )}
                />
            </div>
        </div>
    );
};

export default UserManagement;
