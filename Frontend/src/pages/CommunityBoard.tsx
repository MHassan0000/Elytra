import { useState } from 'react';
import TrendingIssueCard from '../components/ui/TrendingIssueCard';

const CommunityBoard = () => {
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('upvotes');

    const issues = [
        {
            id: 1,
            title: 'Broken Street Light on Main Boulevard',
            description: 'The street light near the park has been broken for over a week, making the area unsafe at night.',
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
            description: 'Garbage has not been collected for 3 days in our street. This is causing health hazards.',
            area: 'DHA, Phase 2',
            upvotes: 89,
            status: 'pending' as const,
            userName: 'Sara Ali',
            timestamp: '5 hours ago',
            isUpvoted: true,
        },
        {
            id: 3,
            title: 'Road Repair Needed Urgently',
            description: 'Large potholes on the main road are causing accidents and vehicle damage.',
            area: 'Model Town, Block C',
            upvotes: 127,
            status: 'pending' as const,
            userName: 'Usman Malik',
            timestamp: '1 day ago',
            isUpvoted: false,
        },
        {
            id: 4,
            title: 'Water Supply Issues',
            description: 'Inconsistent water supply in the morning hours. Need immediate attention.',
            area: 'Johar Town, Block B',
            upvotes: 34,
            status: 'resolved' as const,
            userName: 'Fatima Hassan',
            timestamp: '2 days ago',
            isUpvoted: false,
        },
        {
            id: 5,
            title: 'Park Maintenance Required',
            description: 'The community park needs cleaning and maintenance. Playground equipment is damaged.',
            area: 'Gulberg, Block C',
            upvotes: 56,
            status: 'pending' as const,
            userName: 'Ali Raza',
            timestamp: '3 days ago',
            isUpvoted: false,
        },
        {
            id: 6,
            title: 'Traffic Signal Not Working',
            description: 'Traffic signal at the main intersection has been malfunctioning for days.',
            area: 'DHA, Phase 1',
            upvotes: 78,
            status: 'in-progress' as const,
            userName: 'Ayesha Khan',
            timestamp: '4 days ago',
            isUpvoted: true,
        },
    ];

    return (
        <div className="ml-56 mt-14 p-6 min-h-screen">
            {/* Header */}
            <div className="mb-8 animate-fadeIn">
                <h1 className="text-4xl font-bold text-white mb-2">
                    Community Feedback Board 👥
                </h1>
                <p className="text-lg text-gray-400">
                    View and upvote issues reported by your community
                </p>
            </div>

            {/* Filters and Sort */}
            <div className="card mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Filter by Status
                        </label>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full max-w-xs"
                        >
                            <option value="all">All Issues</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Sort By
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full max-w-xs"
                        >
                            <option value="upvotes">Most Upvoted</option>
                            <option value="recent">Most Recent</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button className="btn-secondary">
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="card text-center">
                    <p className="text-3xl font-bold text-white mb-1">156</p>
                    <p className="text-sm text-gray-400">Total Issues</p>
                </div>
                <div className="card text-center">
                    <p className="text-3xl font-bold text-yellow-400 mb-1">89</p>
                    <p className="text-sm text-gray-400">Pending</p>
                </div>
                <div className="card text-center">
                    <p className="text-3xl font-bold text-blue-400 mb-1">45</p>
                    <p className="text-sm text-gray-400">In Progress</p>
                </div>
                <div className="card text-center">
                    <p className="text-3xl font-bold text-green-400 mb-1">22</p>
                    <p className="text-sm text-gray-400">Resolved</p>
                </div>
            </div>

            {/* Issues Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {issues.map((issue) => (
                    <TrendingIssueCard key={issue.id} {...issue} />
                ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
                <button className="btn-secondary px-8">
                    Load More Issues
                </button>
            </div>
        </div>
    );
};

export default CommunityBoard;
