import { Suspense } from "react";
import { getProfile } from "@/app/api/user/getUser";
import ProjectsCard from "@/components/profile/ProjectsCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LatestUpdates from "@/components/project/LatestUpdates";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectList from "@/components/profile/ProjectList";
import { Pencil, Twitter } from "lucide-react";
import { isUserOwnerServer } from "@/lib/utilsServer";
export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const profile = await getProfile({
    username: params.username,
  });

  const isOwner = await isUserOwnerServer(profile.id);

  return (
    <main className="grid grid-cols-3 grid-rows-4 p-12 gap-4 h-full max-h-[95vh]">
      <Card className="h-full relative group">
        <CardHeader className="flex justify-between items-center flex-row space-y-0">
          <div className="flex gap-2">
            <Avatar value={profile.username} />
            <div className="flex flex-col">
              <CardTitle>{profile.name}</CardTitle>
              <CardDescription>@{profile.username}</CardDescription>
            </div>
          </div>
          <Button size="icon" variant="outline" asChild>
            <Link
              href={`https://twitter.com/${profile.twitterUser}`}
              target="_blank"
            >
              <Twitter />
            </Link>
          </Button>
          {isOwner && (
            <Button
              size="icon"
              variant="outline"
              className="absolute -right-4 -top-4 w-8 h-8 textx-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Pencil size={16} />
            </Button>
          )}
        </CardHeader>
      </Card>
      <div className="row-start-2 row-end-5">
        <LatestUpdates list={[]} className="h-full" />
      </div>
      <ProjectList
        profileToProject={profile.profileToProject}
        isOwner={isOwner}
      />
    </main>
  );
}
