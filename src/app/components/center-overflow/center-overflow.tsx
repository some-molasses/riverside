import "./center-overflow.scss";

export const CenterOverflow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="center-overflow">
      <div className="center-overflow-inner">{children}</div>
    </div>
  );
};
