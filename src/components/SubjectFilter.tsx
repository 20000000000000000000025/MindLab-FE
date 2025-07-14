import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const subjects = [
  "전체",
  "수학",
  "과학",
  "영어",
  "국어",
  "사회",
  "역사",
  "프로그래밍",
  "기타"
];

interface SubjectFilterProps {
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
}

export const SubjectFilter = ({ selectedSubject, onSubjectChange }: SubjectFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {subjects.map((subject) => (
        <Button
          key={subject}
          variant={selectedSubject === subject ? "default" : "outline"}
          size="sm"
          onClick={() => onSubjectChange(subject)}
          className="transition-smooth"
        >
          {subject}
        </Button>
      ))}
    </div>
  );
};