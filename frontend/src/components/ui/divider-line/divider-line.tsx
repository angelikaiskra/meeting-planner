import React from 'react';

interface DividerLineProps {
  className?: string;
  color?: string;
}

const DividerLine: React.FC = ({className = "", color = "bg-gray-200"}: DividerLineProps) => (
    <div className={`h-0.5 w-full ${color} ${className}`} />
);

export default DividerLine;