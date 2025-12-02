interface AdminStatsCardProps {
    icon: string;
    value: number;
    label: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: string;
}

const AdminStatsCard = ({ icon, value, label, trend }: AdminStatsCardProps) => {
    return (
        <div className="metric-card p-6 card-hover-lift">
            <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-xl icon-box-blue flex items-center justify-center text-2xl">
                    {icon}
                </div>
                {trend && (
                    <span className={`text-sm font-bold ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {trend.isPositive ? '↑' : '↓'} {trend.value}%
                    </span>
                )}
            </div>
            <h3 className="text-4xl font-bold text-white mb-2 animate-countUp">{value.toLocaleString()}</h3>
            <p className="text-slate-400 text-sm font-medium">{label}</p>
        </div>
    );
};

export default AdminStatsCard;
