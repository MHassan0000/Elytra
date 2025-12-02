import { Link } from 'react-router-dom';

interface QuickActionButtonProps {
    icon: string;
    label: string;
    to: string;
    variant?: 'primary' | 'secondary';
}

const QuickActionButton = ({ icon, label, to, variant = 'primary' }: QuickActionButtonProps) => {
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${variant === 'primary'
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
        >
            <span className="text-2xl">{icon}</span>
            <span>{label}</span>
        </Link>
    );
};

export default QuickActionButton;
