import "./content.scss";

export const Content: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div id="content">{children}</div>;
};
