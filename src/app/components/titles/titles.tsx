import { Heading1, Span } from "../typography/variants/typography-variants";
import "./titles.scss";

export const Titles: React.FC<{
  title: string;
  subtitle?: string;
  white?: boolean;
}> = ({ title, subtitle, white }) => {
  return (
    <div className={`titles${white ? " white" : ""}`}>
      <Heading1>{title}</Heading1>
      {subtitle ? <Span>{subtitle}</Span> : null}
    </div>
  );
};
