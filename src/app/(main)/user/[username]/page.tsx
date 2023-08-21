import { Suspense } from "react";
import { getUser } from "@/app/api/user/getUser";
import ProjectsCard from "@/components/profile/ProjectsCard";
import ProfileHeader from "@/components/profile/ProfileHeader";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUser({
    username: params.username,
  });

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileHeader user={user} />
        <ProjectsCard projects={user.profileToProject} />
      </Suspense>
    </main>
  );
}
