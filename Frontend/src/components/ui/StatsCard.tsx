interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-600 transition-colors">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-2xl">
                    {icon}
                </div>
                {trend && (
                    <span className={`text-sm font-bold ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {trend.isPositive ? '↑' : '↓'} {trend.value}%
                    </span>
                )}
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-slate-400 text-sm font-medium">{title}</p>
        </div>
    );
};

export default StatsCard;
