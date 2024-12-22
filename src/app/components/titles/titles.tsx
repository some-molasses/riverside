import { Heading1, Span } from "../typography/variants/typography-variants";
import "./titles.scss";

export const Titles: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="titles">
      <Heading1>{title}</Heading1>
      <Span>{subtitle}</Span>
    </div>
  );
};
