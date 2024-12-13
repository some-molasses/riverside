import React from "react";
import "./typography.scss";

type TypographyVariant = "h1" | "h2" | "regular";

export const Typography: React.FC<{
  children: React.ReactNode;
  variant: TypographyVariant;
}> = ({ children, variant }) => {
  const getClassName = () => {
    switch (variant) {
      case "h1":
        return "type-h1";
      case "h2":
        return "type-h2";
      case "regular":
        return "type-regular";
    }
  };

  return <span className={`typography ${getClassName()}`}>{children}</span>;
};
