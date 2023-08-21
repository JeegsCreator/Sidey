import Avvvatars from "avvvatars-react";
import { User } from "@/app/api/user/user";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { capitalize } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

interface ProjectsCardProps {
  projects: User["profileToProject"];
}

const ProjectsCard = ({ projects }: ProjectsCardProps) => {
  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {projects.map(({ project }) => (
            <div className="flex items-center" key={project.id}>
              <Avvvatars value={project.name} style="shape" size={35} />
              <div className="space-y-1">
                <Button variant="link" className="text-base">
                  <Link href={`/project/${project.name}`}>{project.name}</Link>
                </Button>
                <Badge variant="outline">{capitalize(project.state)}</Badge>
              </div>
              <div className="ml-auto font-medium">{project.likes}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsCard;
