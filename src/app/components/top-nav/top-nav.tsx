import { Typography } from "../typography/typography";
import "./top-nav.scss";

export const TopNav: React.FC<{}> = () => {
  return (
    <div id="top-nav">
      <div id="top-nav-left">
        <a href="/">
          <Typography variant="h2">some-molasses</Typography>
        </a>
      </div>
      <div id="top-nav-items">
        <NavItem>employers</NavItem>
        <NavItem>readers</NavItem>
        <NavItem>players</NavItem>
        <NavItem>portfolio</NavItem>
      </div>
    </div>
  );
};

const NavItem: React.FC<{
  children: React.ReactNode;
  // label: string;
}> = ({ children }) => {
  return (
    <button className="top-nav-item">
      <Typography variant="regular">{children}</Typography>
    </button>
  );
};
