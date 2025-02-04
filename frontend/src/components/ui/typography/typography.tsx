import React, { ElementType, ReactNode } from 'react';
import { getTypographyClasses, variantType } from '@/components/ui/typography/variants.ts';

type Props<T extends keyof JSX.IntrinsicElements> = React.ComponentProps<T>;

type BaseTypographyProps = Props<"p"> &
  Props<"h1"> &
  Props<"h2"> &
  Props<"h3"> &
  Props<"h4"> &
  Props<"h5"> &
  Props<"h6"> &
  Props<"a">;

export interface TypographyProps extends BaseTypographyProps {
    children: ReactNode;
    variant?: variantType;
    as?: ElementType;
    color?: string;
    className?: string;
}

const Typography: React.FC<TypographyProps> = ({ variant = "p", as, color = "text-font-black", className = "", children, ...rest }) => {
    const classes = `${getTypographyClasses(variant)} ${color} ${className}`.trim();
    const props = {className: classes, ...rest};
    let template;

    switch (variant) {
        case "h1":
          template = React.createElement(as || "h1", props, children); break;
        case "h2":
          template = React.createElement(as || "h2", props, children); break;
        case "h3":
          template = React.createElement(as || "h3", props, children); break;
        case "h4":
          template = React.createElement(as || "h4", props, children); break;
        case "h5":
          template = React.createElement(as || "h5", props, children); break;
        case "h6":
          template = React.createElement(as || "h6", props, children); break;
        case "lead":
          template = React.createElement(as || "p", props, children); break;
        case "p":
          template = React.createElement(as || "p", props, children); break;
        case "small":
          template = React.createElement(as || "p", props, children); break;
    }

    return template;
};

export default Typography;