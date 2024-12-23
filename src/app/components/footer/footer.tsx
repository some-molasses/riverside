import Link from "next/link";
import { Typography } from "../typography/typography";
import "./footer.scss";

export const Footer: React.FC<{}> = () => {
  return (
    <div id="footer">
      <FooterItem href="mailto:river.stanley173@gmail.com" />
      <FooterItem href="https://linkedin.com/in/river-stanley/" />
      <FooterItem href="mailto:river.stanley173@gmail.com" />
    </div>
  );
};

const FooterItem: React.FC<{
  href: string;
}> = ({ href }) => {
  return (
    <Link href={href} className="footer-item">
      <Typography variant="regular-light">item</Typography>
    </Link>
  );
};
