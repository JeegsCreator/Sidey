import LatestUpdates from "@/components/project/LatestUpdates";
import { getProject } from "@/app/api/project/getProject";
import CreateUpdateForm from "@/components/updates/CreteUpdateForm";
import { getIdFromParams } from "@/lib/utils";

export default async function UpdatePage({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  const { project: projectData, isOwner } = await getProject({
    projectId: projectId,
  });

  return (
    <section className="grid grid-cols-1 px-8 py-4 gap-4 container">
      {isOwner && <CreateUpdateForm projectId={getIdFromParams(projectId)} />}
      <div>
        <LatestUpdates list={projectData.update} />
      </div>
    </section>
  );
}
