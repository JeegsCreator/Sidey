import { getProject } from "@/app/api/project/getProject";
import LatestUpdates from "@/components/project/LatestUpdates";
import ProjectDescription from "@/components/project/ProjectDescription";
import { Suspense } from "react";

export default async function ProjectPage({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  const { project: projectData, latestUpdates } = await getProject({
    projectId: projectId,
  });

  return (
    <section className="grid grid-cols-3 px-8 py-4 gap-4 container">
      <Suspense fallback={<p>Loading...</p>}>
        <div className="col-start-1 col-end-3">
          <ProjectDescription markdown={projectData.description} />
        </div>
        <div className="col-start-3 col-end-4">
          <LatestUpdates list={latestUpdates} project={projectData} />
        </div>
      </Suspense>
    </section>
  );
}
