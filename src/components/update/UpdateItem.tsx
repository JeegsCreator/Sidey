import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { UpdateWithProject } from "@/app/api/project/project";
import Link from "next/link";
import { getProjectUrl } from "@/lib/utils";

type UpdateItemProps = {
  update: UpdateWithProject;
};

const UpdateItem = ({ update }: UpdateItemProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{update.title}</CardTitle>
        <Link href={getProjectUrl(update.project)}>
          <CardDescription className="underline">
            {update.project.name}
          </CardDescription>
        </Link>
      </CardHeader>
      <CardContent>
        <ReactMarkdown className="markdown">{update.description}</ReactMarkdown>
      </CardContent>
    </Card>
  );
};

export default UpdateItem;
