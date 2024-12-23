import {
  faGithub,
  faLinkedin,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import "./footer.scss";

export const Footer: React.FC<{}> = () => {
  return (
    <div id="footer">
      <FooterItem icon={faGithub} href="mailto:river.stanley173@gmail.com" />
      <FooterItem
        icon={faLinkedin}
        href="https://linkedin.com/in/river-stanley/"
      />
      <FooterItem icon={faEnvelope} href="https://github.com/some-molasses" />
    </div>
  );
};

const FooterItem: React.FC<{
  href: string;
  icon: IconDefinition;
}> = ({ href, icon }) => {
  return (
    <Link href={href} className="footer-item">
      <FontAwesomeIcon icon={icon} color={`var(--background-faint)`} />
    </Link>
  );
};
