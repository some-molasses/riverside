export const Page: React.FC<{ children: React.ReactNode; id: string }> = ({
  children,
  id,
}) => {
  return (
    <div id={id} className="page">
      {children}
    </div>
  );
};
