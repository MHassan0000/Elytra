interface StatusBadgeProps {
    status: 'pending' | 'in-progress' | 'resolved' | 'rejected' | 'active' | 'inactive' | 'closed';
    size?: 'sm' | 'md';
}

const StatusBadge = ({ status, size = 'sm' }: StatusBadgeProps) => {
    const getStatusStyle = () => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'in-progress':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'resolved':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'rejected':
            case 'closed':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'active':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'inactive':
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getStatusLabel = () => {
        return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
    };

    const sizeClass = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5';

    return (
        <span
            className={`inline-flex items-center rounded-full font-semibold border ${getStatusStyle()} ${sizeClass}`}
        >
            {getStatusLabel()}
        </span>
    );
};

export default StatusBadge;
