import React, {MouseEventHandler} from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, className, children }) => (
    <button className={`px-5 py-2.5 min-w-36 bg-accent text-white font-bold shadow-btn rounded-md transition-all hover:bg-accent-dark active:shadow-btn-clicked active:translate-y-1 ${className}`}
            onClick={onClick}
            disabled={disabled}>
        {children}
    </button>
);

export default Button;