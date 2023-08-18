import { Card, CardContent } from "../ui/card";

import ReactMarkdown from "react-markdown";

// const markdown = `
// # What is Sidey?

// Sidey is a hub to your Side Projects. Share your project with our community and learn from others creators.

// ## Features:
// - Discover the [Best Resources](http://localhost:3000/) to build your side-project
// - get comments with tasty feedback
// - Show the latest updates of your Side Project
// - and more...

// \`code\`

// \`\`\`
// {
//   coloso: "jugoso"
// }
// \`\`\`
// `;

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
