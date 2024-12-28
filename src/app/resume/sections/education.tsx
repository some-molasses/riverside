import { Typography } from "@/app/components/typography/typography";
import {
  Heading2,
  Span,
} from "@/app/components/typography/variants/typography-variants";

export const EducationSection: React.FC = () => {
  return (
    <section id="education-section">
      <Heading2>Education</Heading2>
      <ul id="degrees-list">
        <EducationLine
          name="Bachelor of Computer Science"
          uni="University of Waterloo"
          dates="2020 – present"
        />
        <EducationLine
          name="Bachelor of Business Administration"
          uni="Wilfrid Laurier University"
          dates="2020 – present"
        />
      </ul>
      <Span>Cumulative GPA: 88.96%</Span>
    </section>
  );
};

const EducationLine: React.FC<{ name: string; uni: string; dates: string }> = ({
  name,
  uni,
  dates,
}) => (
  <li className="education-line">
    <div className="uni-icon"></div>
    <div className="details">
      <div className="left">
        <Typography className="degree" variant="regular">
          Candidate for {name}
        </Typography>
        <Typography className="uni" variant="regular-light">
          {uni}
        </Typography>
      </div>
      <div className="right">
        <Typography className="year" variant="regular-light">
          {dates}
        </Typography>
      </div>
    </div>
  </li>
);
