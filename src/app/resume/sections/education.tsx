import {
  Heading2,
  Span,
} from "@/app/components/typography/variants/typography-variants";
import { ItemTitle } from "../components/item-title/item-title";

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
      <Span id="cgpa">Cumulative GPA: 88.96%</Span>
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
    <ItemTitle
      title={`Candidate for ${name}`}
      bottomLeft={uni}
      topRight={dates}
      noH3
    />
  </li>
);
