import { Typography } from "../typography";

export const Heading1: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h1>
    <Typography variant="h1">{children}</Typography>
  </h1>
);

export const Heading2: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <h2 className={className}>
    <Typography variant="h2">{children}</Typography>
  </h2>
);

export const Paragraph: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <p className={className}>
    <Typography variant="regular">{children}</Typography>
  </p>
);

export const Span: React.FC<{
  children: React.ReactNode;
  variant?: "regular" | "regular-light";
  className?: string;
}> = ({ children, variant, className }) => (
  <span className={className}>
    <Typography variant={variant ?? "regular"}>{children}</Typography>
  </span>
);
