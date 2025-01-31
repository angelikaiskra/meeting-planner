import React from 'react';

interface DividerLineProps {
    color: string;
}

const DividerLine: React.FC<DividerLineProps> = ({ color }) => (
    <div className={`h-px w-full bg-${color}`} />
);

export default DividerLine;