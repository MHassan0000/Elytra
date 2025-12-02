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
        <div className="glass-card p-5 flex items-center justify-between relative overflow-hidden group hover:translate-y-[-2px] transition-all duration-300">
            <div className="flex flex-col">
                <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-wider">{title}</p>
                <div className="flex items-end gap-2">
                    <h3 className="text-white font-bold text-xl">{value}</h3>
                    {trend && (
                        <span className={`text-xs font-bold mb-1 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {trend.isPositive ? '+' : ''}{trend.value}%
                        </span>
                    )}
                </div>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-xl text-white shadow-lg shadow-blue-500/40">
                {icon}
            </div>
        </div>
    );
};

export default StatsCard;
