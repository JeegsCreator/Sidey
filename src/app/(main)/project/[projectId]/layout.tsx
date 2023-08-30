import { getProject } from "@/app/api/project/getProject";
import NavProject from "@/components/project/NavProject";
import HeaderProject from "@/components/project/HeaderProject";

export default async function Layout({
  params: { projectId },
  children,
}: {
  params: { projectId: string };
  children: React.ReactNode;
}) {
  const { project: projectData, isOwner } = await getProject({
    projectId: projectId,
  });
  return (
    <main>
      <HeaderProject projectData={projectData} isOwner={isOwner} />
      <NavProject />
      {children}
    </main>
  );
}
