import "./layout.scss";

export const Column: React.FC<{
  children: React.ReactNode;
  id?: string;
  className?: string;
}> = ({ children, id, className }) => {
  return (
    <div className={`column ${className ?? ""}`} id={id}>
      {children}
    </div>
  );
};

export const Row: React.FC<{
  children: React.ReactNode;
  id?: string;
  className?: string;
}> = ({ children, id, className }) => {
  return (
    <div className={`row ${className ?? ""}`} id={id}>
      {children}
    </div>
  );
};
