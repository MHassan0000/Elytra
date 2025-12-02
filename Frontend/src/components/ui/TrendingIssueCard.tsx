import { useState } from 'react';

interface TrendingIssueCardProps {
    id: number;
    title: string;
    description: string;
    area: string;
    upvotes: number;
    status: 'pending' | 'in-progress' | 'resolved';
    userAvatar?: string;
    userName: string;
    timestamp: string;
    isUpvoted?: boolean;
}

const TrendingIssueCard = ({
    title,
    description,
    area,
    upvotes,
    status,
    userName,
    timestamp,
    isUpvoted = false,
}: TrendingIssueCardProps) => {
    const [upvoted, setUpvoted] = useState(isUpvoted);
    const [upvoteCount, setUpvoteCount] = useState(upvotes);

    const handleUpvote = () => {
        if (upvoted) {
            setUpvoteCount(upvoteCount - 1);
        } else {
            setUpvoteCount(upvoteCount + 1);
        }
        setUpvoted(!upvoted);
    };

    const statusColors = {
        pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        resolved: 'bg-green-500/20 text-green-400 border-green-500/30',
    };

    return (
        <div className="card glass-hover cursor-pointer animate-fadeIn">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                        {userName.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white">{userName}</p>
                        <p className="text-xs text-gray-400">{timestamp}</p>
                    </div>
                </div>
                <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[status]}`}
                >
                    {status.replace('-', ' ')}
                </span>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-300 mb-3 line-clamp-2">{description}</p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                    <span className="text-sm">📍</span>
                    <span className="text-sm text-gray-400">{area}</span>
                </div>
                <button
                    onClick={handleUpvote}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${upvoted
                            ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                >
                    <span className="text-lg">{upvoted ? '👍' : '👍🏻'}</span>
                    <span className="font-semibold">{upvoteCount}</span>
                </button>
            </div>
        </div>
    );
};

export default TrendingIssueCard;
