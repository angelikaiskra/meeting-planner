import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';

const variants = {
    "gray-outline": 'bg-transparent border-1 border-gray-200 text-gray-300 hover:bg-gray-200',
    primary: 'bg-accent border-1 border-accent text-white hover:bg-accent-dark hover:border-accent-dark',
};

const sizes = {
    normal: 'px-5 py-2.5 w-full md:w-fit md:min-w-36 ',
    small: 'py-1 px-3',
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    withAnim?: boolean;
    disabled?: boolean;
    className?: string;
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
};

const Button = ({ onClick, variant = "primary", size = "normal", withAnim = true, disabled = false, className = "", children, ...props }: ButtonProps) => (
    <button className={classNames(
        "text-sm font-semibold rounded-md transition-all cursor-pointer disabled:cursor-default disabled:bg-gray-300",
        withAnim && "shadow-btn active:translate-y-1 active:shadow-btn-clicked",
        variants[variant],
        sizes[size],
        className
    )}
        onClick={onClick}
        disabled={disabled}
        {...props}>
        {children}
    </button>
);

export default Button;