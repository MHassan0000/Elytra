interface CircularProgressProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    label?: string;
}

const CircularProgress = ({
    percentage,
    size = 120,
    strokeWidth = 8,
    color = '#3b82f6',
    label = ''
}: CircularProgressProps) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                className="circular-progress"
                width={size}
                height={size}
            >
                {/* Background circle */}
                <circle
                    className="circular-progress-bg"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                    className="circular-progress-fill"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    stroke={color}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{percentage}%</span>
                {label && <span className="text-xs text-slate-400 mt-1">{label}</span>}
            </div>
        </div>
    );
};

export default CircularProgress;
