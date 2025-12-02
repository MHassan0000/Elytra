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
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-lg shadow-slate-950/40 hover:border-blue-500/80 hover:shadow-[0_0_25px_rgba(59,130,246,0.45)] transition-all">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-2xl shadow-[0_0_18px_rgba(56,189,248,0.6)]">
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
