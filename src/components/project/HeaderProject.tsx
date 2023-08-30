import { Project } from "@/app/api/project/project";
import { Button } from "../ui/button";
import Link from "next/link";
import { FigmaLogo, GithubLogo } from "@/lib/logos";
import ButtonIcon from "../shared/ButtonIcon";
import { LinkIcon, PenIcon, PlusIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { capitalize } from "@/lib/utils";

interface HeaderProjectProps {
  projectData: Project;
  isOwner: boolean;
}

const HeaderProject = ({ projectData, isOwner }: HeaderProjectProps) => {
  return (
    <header className="mt-6 flex justify-between items-center px-20">
      <div className="group flex gap-6 items-center">
        <div className="flex flex-col relative gap-2">
          <div className="flex gap-3 items-center">
            <h1 className="text-3xl font-semibold">{projectData.name}</h1>
            {projectData.figmaLink && (
              <Button variant="outline" size="icon" asChild>
                <Link href={projectData.figmaLink} className="text-sm">
                  <FigmaLogo />
                </Link>
              </Button>
            )}
            {projectData.githubLink && (
              <Button variant="outline" size="icon" asChild>
                <Link href={projectData.githubLink} className="text-sm">
                  <GithubLogo />
                </Link>
              </Button>
            )}
            {projectData.projectLink && (
              <ButtonIcon
                variant="outline"
                Icon={LinkIcon}
                href={projectData.projectLink}
              />
            )}
            {isOwner && (
              <ButtonIcon
                Icon={PenIcon}
                size={12}
                variant="ghost"
                className="text-slate-400 opacity-0 invisible group-hover:opacity-100 group-hover:visible"
              />
            )}
          </div>
          <div className="flex gap-2 -bottom-7 text-slate-500 text-sm">
            <Badge>{capitalize(projectData.state)}</Badge>
            <p>
              • Created by{" "}
              <Link
                href={`/user/${projectData.profileToProject[0].profile.username}`}
                className="underline"
              >
                {projectData.profileToProject[0].profile.name}
              </Link>{" "}
              • <span>{projectData.likes}</span> likes
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        {isOwner && (
          <Button className="flex gap-2">
            <PlusIcon size={18} /> Add Update
          </Button>
        )}
      </div>
    </header>
  );
};

export default HeaderProject;
