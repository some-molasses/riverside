import Link from "next/link";
import { Typography } from "../typography/typography";
import "./top-nav.scss";

export const TopNav: React.FC<{}> = () => {
  return (
    <div id="top-nav">
      <div id="top-nav-left">
        <Link href="/">
          <Typography variant="regular" id="nav-title">
            some-molasses
          </Typography>
        </Link>
      </div>
      <div id="top-nav-items">
        <NavItem href="/resume">employers</NavItem>
        <NavItem href="/portfolio?filter=writing">readers</NavItem>
        <NavItem href="/portfolio?filter=game">players</NavItem>
        <NavItem href="/portfolio">portfolio</NavItem>
      </div>
    </div>
  );
};

const NavItem: React.FC<{
  children: React.ReactNode;
  href: string;
}> = ({ children, href }) => {
  return (
    <Link href={href} className="top-nav-item">
      <Typography variant="regular-light">{children}</Typography>
    </Link>
  );
};
