import LatestUpdates from "@/components/project/LatestUpdates";
import dayjs from "dayjs";
import { getProject } from "@/app/api/project/getProject";
import CreateUpdateForm from "@/components/updates/CreteUpdateForm";

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

export default async function Update({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  const { project: projectData, isOwner } = await getProject({
    projectId: projectId,
  });
  return (
    <section className="grid grid-cols-1 px-8 py-4 gap-4 container">
      <CreateUpdateForm />
      <div>
        <LatestUpdates list={latestUpdateList} />
      </div>
    </section>
  );
}
