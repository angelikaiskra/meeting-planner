import React, {MouseEventHandler} from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
}

const Button = ({ onClick, disabled = false, className = "", children }: ButtonProps) => (
    <button className={`px-5 py-2.5 w-full md:w-fit md:min-w-36 bg-accent text-sm text-white font-semibold shadow-btn rounded-md transition-all hover:bg-accent-dark active:shadow-btn-clicked active:translate-y-1 ${className}`}
            onClick={onClick}
            disabled={disabled}>
        {children}
    </button>
);

export default Button;