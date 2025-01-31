import React from 'react';

interface TagProps {
    value: string;
    className?: string;
}

const Tag: React.FC<TagProps> = ({ className, value }) => (
    <div className={`${className}`}>
        {value}
    </div>
);

export default Tag;