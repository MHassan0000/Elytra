import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2, User, AlertCircle } from 'lucide-react';
import { userService } from '../../services/userService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface UserData {
    id: number;
    username: string;
    email: string;
    reportCount: number;
    status: string;
    createdAt: string;
}

const UserManagement = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserData[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        // Filter users based on search query
        if (searchQuery.trim() === '') {
            setFilteredUsers(users);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = users.filter(
                user =>
                    user.username.toLowerCase().includes(query) ||
                    user.email.toLowerCase().includes(query)
            );
            setFilteredUsers(filtered);
        }
    }, [searchQuery, users]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await userService.getAllUsersWithStats();
            setUsers(data);
            setFilteredUsers(data);
        } catch (err: any) {
            console.error('Error fetching users:', err);
            setError(err.message || 'Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            await userService.deleteUser(userId);
            // Remove user from state
            setUsers(users.filter(u => u.id !== userId));
            setDeleteConfirm(null);
        } catch (err: any) {
            console.error('Error deleting user:', err);
            alert('Failed to delete user: ' + (err.message || 'Unknown error'));
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={fetchUsers}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

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
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#0B0E14] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50 w-full"
                    />
                </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-slate-400">
                Showing {filteredUsers.length} of {users.length} users
            </div>

            {/* Table */}
            <div className="glass-card p-1">
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
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="group hover:bg-white/2 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-600 flex items-center justify-center text-xs font-bold text-white">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <span
                                            onClick={() => navigate(`/admin/users/${user.id}`)}
                                            className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors cursor-pointer"
                                        >
                                            {user.username}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-slate-400">{user.email}</td>
                                <td className="py-4 px-6 text-sm text-slate-300">{user.reportCount}</td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'ACTIVE'
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right text-sm text-slate-500">{formatDate(user.createdAt)}</td>
                                <td className="py-4 px-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => navigate(`/admin/users/${user.id}`)}
                                            className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
                                            title="View Details"
                                        >
                                            <User className="w-4 h-4" />
                                        </button>
                                        {deleteConfirm === user.id ? (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="px-3 py-1 bg-rose-500 text-white text-xs rounded-lg hover:bg-rose-600 transition-colors"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(null)}
                                                    className="px-3 py-1 bg-slate-600 text-white text-xs rounded-lg hover:bg-slate-700 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDeleteConfirm(user.id)}
                                                className="p-2 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                                                title="Delete User"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-400">No users found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagement;
