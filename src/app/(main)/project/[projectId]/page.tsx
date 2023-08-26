"use client";

import LatestUpdates from "@/components/project/LatestUpdates";
import ProjectDescription from "@/components/project/ProjectDescription";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { isUserOwnerClient, capitalize, getIdFromParams } from "@/lib/utils";
import { profile, project } from "@prisma/client";

const latestUpdateList = [
  {
    id: "1",
    title: "Project Created",
    href: "/",
    createdDate: dayjs().toString(),
  },
  {
    id: "2",
    title: "Launch in Product Hunt",
    href: "/",
    createdDate: dayjs("2023-08-06").toString(),
  },
  {
    id: "3",
    title: "Launch in Product Hunt",
    href: "/",
    createdDate: dayjs("2023-07-06").toString(),
  },
  {
    id: "4",
    title: "Mi mamá me mima mi mamá",
    href: "/",
    createdDate: dayjs("2021-07-06").toString(),
  },
];

export default function Home({ params }: { params: { projectId: string } }) {
  type ProjectState = project & {
    profileToProject: { profile: Pick<profile, "name" | "username"> }[];
  };

  const [projectData, setProjectData] = useState<ProjectState | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const getProject = async () => {
      const supabase = createClientComponentClient();
      type Data = project & {
        profileToProject: {
          profile: Pick<profile, "name" | "username" | "id">;
        }[];
      };
      const { data, error } = await supabase
        .from("project")
        .select("*, profileToProject(profile(name, username, id))")
        .filter("id", "eq", getIdFromParams(params.projectId))
        .filter(
          "profileToProject.projectId",
          "eq",
          getIdFromParams(params.projectId)
        )
        .single();

      const info: Data = data;

      if (error) console.log(error);
      if (info) {
        setProjectData(info);
        console.log(data);
        const ownersId = info.profileToProject.map((p) => p.profile.id);
        const toSet = await isUserOwnerClient(...ownersId);
        setIsOwner(toSet);
      }
    };

    getProject();
  }, [params.projectId]);

  console.log(projectData);
  if (!projectData) return <h1>Error</h1>;

  return (
    <section className="grid grid-cols-3 px-8 py-4 gap-4 container">
      <div className="col-start-1 col-end-3">
        <ProjectDescription markdown={projectData.description} />
      </div>
      <div className="col-start-3 col-end-4">
        <LatestUpdates list={latestUpdateList} />
      </div>
    </section>
  );
}
