"use client";

import { profileToProject, project } from "@prisma/client";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { InputWithIcon } from "../ui/input";
import { useState } from "react";
import { Profile } from "@/app/api/user/user";
import Empty from "../shared/Empty";
import { Button } from "../ui/button";
import ProjectItem from "../project/ProjectItem";

type ProfileToProject = Profile["profileToProject"];
const ProjectList = ({
  profileToProject,
  isOwner,
}: {
  profileToProject: ProfileToProject;
  isOwner: boolean;
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Card className="max-h-[95vh] col-start-2 col-end-4 row-start-1 row-end-5">
      <CardHeader className="flex flex-row justify-between items-center space-y-0">
        <div className="flex gap-8 items-center">
          <CardTitle className="inline">Projects</CardTitle>
          {isOwner && (
            <Button className="flex gap-1" variant="outline" asChild>
              <Link href="/project/create">
                <Plus size={18} /> Add project
              </Link>
            </Button>
          )}
        </div>
        <InputWithIcon
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.trim())}
          Icon={Search}
        />
      </CardHeader>
      <CardContent className="w-full h-[calc(100%-100px)] px-2">
        {profileToProject.length > 0 ? (
          <ScrollArea className="h-full max-h-full px-4">
            <div className="grid grid-cols-3 gap-3 ">
              {profileToProject
                .filter((data) =>
                  data.project.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()),
                )
                .map((data) => (
                  <ProjectItem key={data.project.id} project={data.project} />
                ))}
            </div>
          </ScrollArea>
        ) : (
          <Empty
            message={
              isOwner ? "You have no projects" : "This user has no projects"
            }
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectList;
