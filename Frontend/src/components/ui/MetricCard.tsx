interface MetricCardProps {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    iconBgColor?: string;
}

const MetricCard = ({
    label,
    value,
    icon,
    iconBgColor = 'bg-blue-600'
}: MetricCardProps) => {
    return (
        <div className="metric-card p-6 card-hover-lift">
            <div className="flex items-center justify-between mb-4">
                {icon && (
                    <div className={`w-12 h-12 rounded-xl ${iconBgColor} flex items-center justify-center text-2xl shadow-lg`}>
                        {icon}
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-slate-400 text-sm font-medium mb-2">{label}</h3>
                <p className="text-white text-3xl font-bold animate-countUp">{value}</p>
            </div>
        </div>
    );
};

export default MetricCard;
