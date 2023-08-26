import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { capitalize, getProjectUrl } from "@/lib/utils";
import { Star } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { project } from "@prisma/client";
import { Badge } from "../ui/badge";

dayjs.extend(relativeTime);
dayjs.extend(utc);

const ProjectItem = ({ project }: { project: project }) => {
  return (
    <Link href={getProjectUrl(project)} className="group">
      <Card>
        <CardContent className="p-3">
          <CardTitle className="text-lg flex items-center gap-3">
            <span className="group-hover:underline">{project.name}</span>
            <Badge variant="outline">{capitalize(project.state)}</Badge>
          </CardTitle>
          <CardDescription>{project.tagline}</CardDescription>
        </CardContent>
        <CardFooter className="text-xs text-slate-600 px-3 pb-3 flex gap-3">
          <div className="flex gap-1 items-center">
            <Star size={18} />
            <p>{project.likes}</p>
          </div>
          <div className="flex gap-1">
            <p>Created</p>
            <p>{dayjs.utc(project.createdAt).fromNow()}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectItem;
