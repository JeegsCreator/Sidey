import LatestUpdates from "@/components/project/LatestUpdates";
import { getProject } from "@/app/api/project/getProject";

export default async function UpdatePage({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  const { project: projectData } = await getProject({
    projectId: projectId,
  });

  return (
    <section className="grid grid-cols-1 px-8 py-4 gap-4 container">
      <div>
        <LatestUpdates list={projectData.update} />
      </div>
    </section>
  );
}
