export type variantType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "lead" | "p" | "small";

const variants = {
  h1: {
    display: "block",
    fontSmoothing: "antialiased",
    letterSpacing: "tracking-normal",
    fontFamily: "font-sans",
    fontSize: "text-5xl",
    fontWeight: "font-bold",
    lineHeight: "leading-tight",
  },
  h2: {
    display: "block",
    fontSmoothing: "antialiased",
    letterSpacing: "tracking-normal",
    fontFamily: "font-sans",
    fontSize: "text-4xl",
    fontWeight: "font-bold",
    lineHeight: "leading-[1.3]",
  },
  h3: {
    display: "block",
    fontSmoothing: "antialiased",
    letterSpacing: "tracking-normal",
    fontFamily: "font-sans",
    fontSize: "text-3xl",
    fontWeight: "font-semibold",
    lineHeight: "leading-snug",
  },
  h4: {
    display: "block",
    fontSmoothing: "antialiased",
    letterSpacing: "tracking-normal",
    fontFamily: "font-sans",
    fontSize: "text-2xl",
    fontWeight: "font-semibold",
    lineHeight: "leading-snug",
  },
  h5: {
    display: "block",
    fontSmoothing: "antialiased",
    letterSpacing: "tracking-normal",
    fontFamily: "font-sans",
    fontSize: "text-xl",
    fontWeight: "font-semibold",
    lineHeight: "leading-snug",
  },
  h6: {
    display: "block",
    fontSmoothing: "antialiased",
    letterSpacing: "tracking-normal",
    fontFamily: "font-sans",
    fontSize: "text-base",
    fontWeight: "font-semibold",
    lineHeight: "leading-relaxed",
  },
  lead: {
    display: "block",
    fontSmoothing: "antialiased",
    fontFamily: "font-sans",
    fontSize: "text-lg",
    fontWeight: "font-medium",
    lineHeight: "leading-relaxed",
  },
  p: {
    display: "block",
    fontSmoothing: "antialiased",
    fontFamily: "font-sans",
    fontSize: "text-base",
    fontWeight: "font-normal",
    lineHeight: "leading-normal",
  },
  small: {
    display: "block",
    fontSmoothing: "antialiased",
    fontFamily: "font-sans",
    fontSize: "text-sm",
    fontWeight: "font-normal",
    lineHeight: "leading-normal",
  }
};

export const getTypographyClasses = (variantType: variantType) => {
  const obj = variants[variantType];
  const {display, fontSmoothing, fontFamily, fontSize, fontWeight, lineHeight} = obj;
  return `${display} ${fontSmoothing} ${fontFamily} ${fontSize} ${fontWeight} ${lineHeight}`;
}