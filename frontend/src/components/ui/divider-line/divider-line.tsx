import React from 'react';

interface DividerLineProps {
    color: string;
}

const DividerLine: React.FC<DividerLineProps> = ({ color }) => (
    <div className={`h-0.5 w-full bg-${color}`} />
);

export default DividerLine;