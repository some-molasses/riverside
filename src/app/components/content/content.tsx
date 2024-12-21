import "./content.scss";

export const Content: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="content">{children}</div>;
};
