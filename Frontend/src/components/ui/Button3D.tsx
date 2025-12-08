import React from 'react';

interface Button3DProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: 'primary' | 'blue' | 'red' | 'white' | 'green';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const Button3D: React.FC<Button3DProps> = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    type = 'button',
    className = ''
}) => {
    const sizeClasses = {
        sm: 'w-24 h-8 text-xs',
        md: 'w-28 h-9 text-sm',
        lg: 'w-32 h-10 text-base'
    };

    return (
        <div className={`center ${className}`}>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`btn-3d-${variant} ${sizeClasses[size]}`}
            >
                <div className="top">{children}</div>
                <div className="bottom"></div>
            </button>
        </div>
    );
};

export default Button3D;
