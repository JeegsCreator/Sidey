import { getProject } from "@/app/api/project/getProject";
import LatestUpdates from "@/components/project/LatestUpdates";
import ProjectDescription from "@/components/project/ProjectDescription";
import dayjs from "dayjs";
import { Suspense } from "react";

const latestUpdateList = [
  {
    id: 1,
    title: "Project Created",
    description: "Project Created",
    projectId: 1,
    createdAt: dayjs().toDate(),
  },
  {
    id: 2,
    title: "Launch in Product Hunt",
    description: "Launch in Product Hunt",
    projectId: 1,
    createdAt: dayjs("2023-08-06").toDate(),
  },
  {
    id: 3,
    title: "Launch in Product Hunt",
    description: "Launch in Product Hunt",
    projectId: 1,
    createdAt: dayjs("2023-07-06").toDate(),
  },
  {
    id: 4,
    title: "Mi mamá me mima mi mamá",
    description: "Mi mamá me mima mi mamá",
    projectId: 1,
    createdAt: dayjs("2021-07-06").toDate(),
  },
];

export default async function ProjectPage({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  const { project: projectData } = await getProject({
    projectId: projectId,
  });

  return (
    <section className="grid grid-cols-3 px-8 py-4 gap-4 container">
      <Suspense fallback={<p>Loading...</p>}>
        <div className="col-start-1 col-end-3">
          <ProjectDescription markdown={projectData.description} />
        </div>
        <div className="col-start-3 col-end-4">
          <LatestUpdates list={latestUpdateList} />
        </div>
      </Suspense>
    </section>
  );
}
