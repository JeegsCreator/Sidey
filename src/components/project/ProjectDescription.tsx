import { Card, CardContent } from "../ui/card";

import ReactMarkdown from "react-markdown";

const ProjectDescription = ({ markdown = "" }: { markdown?: string }) => {
  return (
    <Card>
      <CardContent className="pt-4 pb-8">
        <ReactMarkdown className="markdown">{markdown}</ReactMarkdown>
      </CardContent>
    </Card>
  );
};

export default ProjectDescription;
