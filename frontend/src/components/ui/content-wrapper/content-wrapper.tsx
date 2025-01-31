import React from 'react';

interface ContentWrapperProps {
    children: React.ReactNode,
    className?: string,
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({className = "", children}) => {
    return (
        <div className={`w-full max-w-screen-xl mx-auto px-6 xl:px-0 ${className}`}>
            {children}
        </div>
    );
};

export default ContentWrapper;