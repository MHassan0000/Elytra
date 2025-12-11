import { useState } from 'react';
import { ChevronUp } from 'lucide-react';

interface VoteButtonsProps {
    issueId: number;
    initialVotes: number;
    userVote?: 'up' | 'down' | null;
    onVote: (issueId: number, voteType: 'up' | 'down' | null) => Promise<void>;
}

const VoteButtons = ({ issueId, initialVotes, userVote, onVote }: VoteButtonsProps) => {
    const [votes, setVotes] = useState(initialVotes);
    const [currentVote, setCurrentVote] = useState<'up' | 'down' | null>(userVote || null);
    const [loading, setLoading] = useState(false);

    const handleVote = async () => {
        if (loading) return;

        try {
            setLoading(true);

            // Optimistic UI update
            let newVotes = votes;
            let newVote: 'up' | 'down' | null = 'up';

            if (currentVote === 'up') {
                // Remove vote
                newVotes = votes - 1;
                newVote = null;
            } else {
                // New vote
                newVotes = votes + 1;
            }

            setVotes(newVotes);
            setCurrentVote(newVote);

            // Call API
            await onVote(issueId, newVote);
        } catch (error) {
            // Revert on error
            setVotes(votes);
            setCurrentVote(currentVote);
            console.error('Vote failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-1 bg-[#151A25] border border-white/5 rounded-xl p-2">
            {/* Upvote */}
            <button
                onClick={handleVote}
                disabled={loading}
                className={`p-1.5 rounded-lg transition-all ${currentVote === 'up'
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'text-slate-400 hover:bg-white/5 hover:text-orange-400'
                    }`}
            >
                <ChevronUp size={20} strokeWidth={2.5} />
            </button>

            {/* Vote Count */}
            <span className={`text-sm font-bold min-w-8 text-center ${currentVote === 'up' ? 'text-orange-400' : 'text-white'}`}>
                {votes}
            </span>
        </div>
    );
};

export default VoteButtons;
