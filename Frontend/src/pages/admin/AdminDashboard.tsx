import AdminStatsCard from '../../components/admin/AdminStatsCard';
import ActionButton from '../../components/admin/ActionButton';
import StatusBadge from '../../components/admin/StatusBadge';

const AdminDashboard = () => {
    const stats = [
        {
            icon: '📋',
            value: 1247,
            label: 'Total Issues Submitted',
            trend: { value: 12, isPositive: true },
            color: 'blue' as const,
        },
        {
            icon: '⏳',
            value: 89,
            label: 'Issues Pending Review',
            trend: { value: 5, isPositive: false },
            color: 'orange' as const,
        },
        {
            icon: '✅',
            value: 1034,
            label: 'Issues Resolved',
            trend: { value: 18, isPositive: true },
            color: 'green' as const,
        },
        {
            icon: '📊',
            value: 12,
            label: 'Active Surveys',
            trend: { value: 3, isPositive: true },
            color: 'purple' as const,
        },
        {
            icon: '👥',
            value: 5432,
            label: 'Total Registered Users',
            trend: { value: 8, isPositive: true },
            color: 'blue' as const,
        },
        {
            icon: '🏙️',
            value: 24,
            label: 'Cities Managed',
            trend: { value: 0, isPositive: true },
            color: 'orange' as const,
        },
    ];

    const recentIssues = [
        {
            id: 1,
            title: 'Broken Street Light on Main Boulevard',
            area: 'Gulberg, Block A',
            status: 'pending' as const,
            upvotes: 45,
            time: '2 hours ago',
        },
        {
            id: 2,
            title: 'Garbage Collection Not Regular',
            area: 'DHA, Phase 2',
            status: 'in-progress' as const,
            upvotes: 89,
            time: '5 hours ago',
        },
        {
            id: 3,
            title: 'Water Supply Issues',
            area: 'Johar Town, Block B',
            status: 'resolved' as const,
            upvotes: 34,
            time: '1 day ago',
        },
    ];

    return (
        <div className="ml-56 mt-14 p-6 min-h-screen">
            {/* Hero Section */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-1">
                    Welcome back, <span className="gradient-text">Admin</span>! 👋
                </h1>
                <p className="text-sm text-gray-400">
                    Here's an overview of the Elytra system
                </p>
            </div>

            {/* Quick Actions */}
            <div className="mb-6 flex flex-wrap gap-3">
                <ActionButton icon="🏙️" label="Add City / Area" to="/admin/city-areas" />
                <ActionButton icon="📝" label="Create Survey" to="/admin/surveys" variant="secondary" />
                <ActionButton icon="📋" label="View Pending Issues" to="/admin/issues" variant="secondary" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {stats.map((stat, index) => (
                    <AdminStatsCard
                        key={index}
                        icon={stat.icon}
                        value={stat.value}
                        label={stat.label}
                        trend={stat.trend}
                        color={stat.color}
                    />
                ))}
            </div>

            {/* Recent Issues */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Recent Issues</h2>
                    <ActionButton icon="→" label="View All" to="/admin/issues" variant="secondary" size="sm" />
                </div>
                <div
                    className="rounded-xl p-5"
                    style={{
                        background: 'rgba(26, 31, 58, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <div className="space-y-3">
                        {recentIssues.map((issue) => (
                            <div
                                key={issue.id}
                                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-white mb-1">{issue.title}</h3>
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                        <span>📍 {issue.area}</span>
                                        <span>👍 {issue.upvotes}</span>
                                        <span>🕒 {issue.time}</span>
                                    </div>
                                </div>
                                <StatusBadge status={issue.status} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* System Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Recent User Activity */}
                <div
                    className="rounded-xl p-5"
                    style={{
                        background: 'rgba(26, 31, 58, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <h3 className="text-lg font-bold text-white mb-4">Recent User Activity</h3>
                    <div className="space-y-3">
                        {[
                            { user: 'Ahmed Khan', action: 'submitted a new issue', time: '5 min ago' },
                            { user: 'Sara Ali', action: 'upvoted an issue', time: '12 min ago' },
                            { user: 'Usman Malik', action: 'completed a survey', time: '1 hour ago' },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div>
                                    <span className="text-white font-medium">{activity.user}</span>
                                    <span className="text-gray-400"> {activity.action}</span>
                                </div>
                                <span className="text-xs text-gray-500">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Stats */}
                <div
                    className="rounded-xl p-5"
                    style={{
                        background: 'rgba(26, 31, 58, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <h3 className="text-lg font-bold text-white mb-4">System Overview</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Issues This Week</span>
                            <span className="text-lg font-bold text-white">124</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Avg Response Time</span>
                            <span className="text-lg font-bold text-green-400">2.4 days</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">User Satisfaction</span>
                            <span className="text-lg font-bold text-blue-400">94%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
