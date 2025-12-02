import StatsCard from '../components/ui/StatsCard';
import TrendingIssueCard from '../components/ui/TrendingIssueCard';
import AreaSelector from '../components/ui/AreaSelector';
import QuickActionButton from '../components/ui/QuickActionButton';

const Dashboard = () => {
    const stats = [
        {
            icon: '👍',
            value: 24,
            label: 'Issues You Upvoted',
            trend: { value: 15, isPositive: true },
        },
        {
            icon: '🔥',
            value: 156,
            label: 'Trending Issues',
            trend: { value: 23, isPositive: true },
        },
        {
            icon: '📊',
            value: 3,
            label: 'Active Surveys',
            trend: { value: 0, isPositive: true },
        },
    ];

    const trendingIssues = [
        {
            id: 1,
            title: 'Broken Street Light on Main Boulevard',
            description: 'The street light near the park has been broken for over a week.',
            area: 'Gulberg, Block A',
            upvotes: 45,
            status: 'in-progress' as const,
            userName: 'Ahmed Khan',
            timestamp: '2 hours ago',
            isUpvoted: false,
        },
        {
            id: 2,
            title: 'Garbage Collection Not Regular',
            description: 'Garbage has not been collected for 3 days in our street.',
            area: 'DHA, Phase 2',
            upvotes: 89,
            status: 'pending' as const,
            userName: 'Sara Ali',
            timestamp: '5 hours ago',
            isUpvoted: true,
        },
    ];

    return (
        <div className="ml-56 mt-14 p-6 min-h-screen">
            {/* Hero Section */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-1">
                    Welcome back, <span className="gradient-text">Hassan</span>! 👋
                </h1>
                <p className="text-sm text-gray-400">
                    Here's what's happening in your city today
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        icon={stat.icon}
                        value={stat.value}
                        label={stat.label}
                        trend={stat.trend}
                    />
                ))}
            </div>

            {/* Area Selector */}
            <div className="mb-6">
                <AreaSelector />
            </div>

            {/* Trending Problems */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Trending Problems</h2>
                    <button className="btn-secondary text-sm">View All →</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {trendingIssues.map((issue) => (
                        <TrendingIssueCard key={issue.id} {...issue} />
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <QuickActionButton
                        icon="📝"
                        label="Submit Feedback"
                        to="/submit-feedback"
                        variant="primary"
                    />
                    <QuickActionButton
                        icon="👥"
                        label="View Community Board"
                        to="/community-board"
                        variant="secondary"
                    />
                    <QuickActionButton
                        icon="📊"
                        label="Participate in Survey"
                        to="/surveys"
                        variant="secondary"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
