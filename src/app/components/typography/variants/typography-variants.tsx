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

export const Heading3: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <h3 className={className}>
    <Typography variant="h3">{children}</Typography>
  </h3>
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
  id?: string;
  className?: string;
}> = ({ children, variant, id, className }) => (
  <span className={className} id={id}>
    <Typography variant={variant ?? "regular"}>{children}</Typography>
  </span>
);
