import classNames from "classnames";
import React from "react";

const grayColor = "#A9A9A9";
const colors = {
    violet: "#5D3FD3",
    pink: "#FF69B4",
    peach: "#FF8C69",
    yellow: "#FFD700",
    mint: "#2E8B57",
    cyan: "#008B8B",
    sky: "#4682B4",
    lavender: "#800080",
    coral: "#DC143C",
    apricot: "#FF7F50",
    softBlue: "#4169E1",
    lilac: "#9932CC",
    lightGreen: "#228B22",
    butter: "#DAA520",
    rose: "#C71585",
    periwinkle: "#6A5ACD",
    softOrange: "#FF4500",
    pastelRed: "#B22222",
    teal: "#008080"
};

export type AvatarIconProps = {
    content: React.ReactNode;
    color?: keyof typeof colors | "gray" | "random";
    className?: string;
};

export const AvatarIcon = ({
    content,
    color = 'random',
    className = '',
}: AvatarIconProps) => {
    const hexColor = getColor(color);
    const containerStyles = {
        backgroundColor: hexColor,
    };
    const contentStyles = {
        color: hexColor,
    };

    return (
        <div className="relative w-5 h-5">
            <div className={classNames("rounded-full w-full h-full opacity-20 z-10", className)} style={containerStyles}></div>
            <div className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center font-bold text-xs" style={contentStyles}>
                {content}
            </div>
        </div>
    );
};

const getColor = (color: keyof typeof colors | "gray" | "random") => {
    if (color === "gray") return grayColor;
    if (color === "random") return (
        Object.values(colors)[Math.floor(Math.random() * Object.values(colors).length)]
    );

    return colors[color as keyof typeof colors];
};