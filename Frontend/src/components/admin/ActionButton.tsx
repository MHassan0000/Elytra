import { Link } from 'react-router-dom';

interface ActionButtonProps {
    icon: string;
    label: string;
    onClick?: () => void;
    to?: string;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md';
}

const ActionButton = ({ icon, label, onClick, to, variant = 'primary', size = 'md' }: ActionButtonProps) => {
    const getVariantStyle = () => {
        switch (variant) {
            case 'primary':
                return 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/30';
            case 'secondary':
                return 'bg-white/5 hover:bg-white/10 text-white border border-white/10';
            case 'danger':
                return 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30';
            default:
                return 'bg-orange-600 hover:bg-orange-700 text-white';
        }
    };

    const sizeClass = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2.5 text-sm';

    const className = `inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200 ${getVariantStyle()} ${sizeClass}`;

    const content = (
        <>
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
        </>
    );

    if (to) {
        return (
            <Link to={to} className={className}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={className}>
            {content}
        </button>
    );
};

export default ActionButton;
