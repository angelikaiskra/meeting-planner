import { Warning } from "@phosphor-icons/react";

const variants = {
    warning: {
        icon: <Warning aria-hidden="true" color="#FFCA38" size={20} weight="bold" />
    },
};

interface AlertProps {
    variant?: keyof typeof variants;
    children: React.ReactNode;
}

const Alert = ({ variant = "warning", children }: AlertProps) => {
    return (
        <div className="p-4 border border-gray-200 rounded-lg gap-x-3 flex items-center text-font-black text-sm bg-white">
            {variants[variant].icon}

            <span>
                {children}
            </span>
        </div>
    );
}

export default Alert;