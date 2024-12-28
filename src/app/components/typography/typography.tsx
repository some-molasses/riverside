import React from "react";
import "./typography.scss";

type TypographyVariant = "h1" | "h2" | "h3" | "regular" | "regular-light";

export const Typography: React.FC<{
  children: React.ReactNode;
  id?: string;
  className?: string;
  variant: TypographyVariant;
}> = ({ children, variant, id, className }) => {
  const getClassName = () => {
    switch (variant) {
      case "h1":
        return "type-h1";
      case "h2":
        return "type-h2";
      case "h3":
        return "type-h3";
      case "regular":
        return "type-regular";
      case "regular-light":
        return "type-regular-light";
    }
  };

  return (
    <span className={`typography ${getClassName()} ${className}`} id={id}>
      {children}
    </span>
  );
};
