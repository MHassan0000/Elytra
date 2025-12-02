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
            case 'orange': return 'bg-orange-600 border-orange-500';
            case 'purple': return 'bg-purple-600 border-purple-500';
            case 'blue': return 'bg-blue-600 border-blue-500';
            case 'green': return 'bg-green-600 border-green-500';
            default: return 'bg-orange-600 border-orange-500';
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${getColorClasses()} flex items-center justify-center text-2xl`}>
                    {icon}
                </div>
                {trend && (
                    <span className={`text-sm font-bold ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {trend.isPositive ? '↑' : '↓'} {trend.value}%
                    </span>
                )}
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-slate-400 text-sm font-medium">{label}</p>
        </div>
    );
};

export default AdminStatsCard;
