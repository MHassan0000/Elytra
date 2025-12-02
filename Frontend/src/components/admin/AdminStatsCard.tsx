interface AdminStatsCardProps {
    icon: string;
    value: string | number;
    label: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: 'orange' | 'purple' | 'blue' | 'green';
}

const AdminStatsCard = ({ icon, value, label, trend, color = 'orange' }: AdminStatsCardProps) => {
    const getColorClasses = () => {
        switch (color) {
            case 'orange': return 'bg-orange-500 shadow-orange-500/40';
            case 'purple': return 'bg-purple-500 shadow-purple-500/40';
            case 'blue': return 'bg-blue-500 shadow-blue-500/40';
            case 'green': return 'bg-green-500 shadow-green-500/40';
            default: return 'bg-orange-500 shadow-orange-500/40';
        }
    };

    return (
        <div className="glass-card p-5 flex items-center justify-between relative overflow-hidden group hover:translate-y-[-2px] transition-all duration-300">
            <div className="flex flex-col">
                <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">{label}</p>
                <div className="flex items-end gap-2">
                    <h3 className="text-white font-bold text-xl">{value}</h3>
                    {trend && (
                        <span className={`text-xs font-bold mb-1 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {trend.isPositive ? '+' : ''}{trend.value}%
                        </span>
                    )}
                </div>
            </div>

            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl text-white shadow-lg ${getColorClasses()}`}>
                {icon}
            </div>
        </div>
    );
};

export default AdminStatsCard;
