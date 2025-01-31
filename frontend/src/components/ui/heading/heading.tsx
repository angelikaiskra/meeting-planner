import React from 'react';
import "./heading.pcss";

interface HeadingProps {
    children: React.ReactNode;
    tag?: keyof JSX.IntrinsicElements;
    className?: string;
}

const Heading: React.FC<HeadingProps> = ({ tag: Wrapper = "h1", className = "", children }) => (
    <Wrapper className={`heading ${className}`}>
        {children}
    </Wrapper>
);

export default Heading;