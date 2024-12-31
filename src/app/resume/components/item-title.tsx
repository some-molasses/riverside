import {
  Heading3,
  Span,
} from "@/app/components/typography/variants/typography-variants";
import "./item-title.scss";

export const ItemTitle: React.FC<{
  title: string;
  topRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
  noH3?: boolean;
}> = ({ title, topRight, bottomLeft, bottomRight, noH3 }) => {
  return (
    <div className="item-title">
      <div className="top-row">
        {noH3 ? <Span>{title}</Span> : <Heading3>{title}</Heading3>}
        <Span>{topRight}</Span>
      </div>
      {bottomLeft || bottomRight ? (
        <div className="bottom-row">
          <Span>{bottomLeft}</Span>
          <Span>{bottomRight}</Span>
        </div>
      ) : null}
    </div>
  );
};
