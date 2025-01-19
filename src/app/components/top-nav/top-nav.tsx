"use client";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Typography } from "../typography/typography";
import "./top-nav.scss";

const toggleMobileMenu = () => {
  document.getElementById("mobile-nav-items")?.classList.toggle("active");
};

export const TopNav: React.FC<{}> = () => {
  const items = [
    { href: "/resume", title: "employers" },
    { href: "/portfolio?filter=writing", title: "writing" },
    { href: "/portfolio?filter=coding", title: "coding" },
    { href: "/portfolio", title: "portfolio" },
  ];

  return (
    <div id="top-nav-container">
      <div id="top-nav">
        <div id="top-nav-left">
          <Link href="/">
            <Typography variant="regular" id="nav-title">
              river-stanley.me
            </Typography>
          </Link>
        </div>
        <button id="mobile-nav" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        <div id="desktop-nav-items">
          {items.map(({ href, title }) => (
            <NavItem href={href} key={title}>
              {title}
            </NavItem>
          ))}
        </div>
      </div>
      <div id="mobile-nav-items">
        <div id="mobile-nav-items-inner">
          {items.map(({ href, title }) => (
            <MobileNavItem href={href} key={title}>
              {title}
            </MobileNavItem>
          ))}
        </div>
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

const MobileNavItem: React.FC<{
  children: React.ReactNode;
  href: string;
}> = ({ children, href }) => {
  return (
    <Link href={href} className="mobile-nav-item" onClick={toggleMobileMenu}>
      <div className="contents">
        <Typography variant="regular-light">{children}</Typography>
      </div>
    </Link>
  );
};
