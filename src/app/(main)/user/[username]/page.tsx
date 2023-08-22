import { Suspense } from "react";
import { getUser } from "@/app/api/user/getUser";
import ProjectsCard from "@/components/profile/ProjectsCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LatestUpdates from "@/components/project/LatestUpdates";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUser({
    username: params.username,
  });

  return (
    <main className="grid grid-cols-3 grid-rows-4 p-12 gap-4 h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>@{user.username}</CardDescription>
        </CardHeader>
      </Card>
      <div className="row-start-2 row-end-5">
        <LatestUpdates list={[]} />
      </div>
      <Card className="h-full col-start-2 col-end-4 row-start-1 row-end-5">
        <CardHeader className="flex flex-row justify-between items-start">
          <CardTitle className="inline">Projects</CardTitle>
          <div className="relative flex items-start h-full">
            <Input placeholder="Search..." />
            <Search className="absolute right-3" />
          </div>
        </CardHeader>
      </Card>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      {/* <ProfileHeader user={user} />
        <ProjectsCard projects={user.profileToProject} /> */}
      {/* </Suspense> */}
    </main>
  );
}
