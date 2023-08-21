import Avvvatars from "avvvatars-react";
import { Button } from "@/components/ui/button";
import { LinkIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import { User } from "@/app/api/user/user";

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <header className="my-6 flex justify-between items-center container">
      <div className="group flex gap-6 items-center">
        <div className="flex gap-3 items-center relative">
          <Avvvatars value={user.username} style="shape" size={35} />
          <h1 className="text-3xl font-semibold">{user.username}</h1>
          <Button variant="outline" size="icon" asChild>
            <Link
              href={`https://x.com/${user.twitterUser}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
            >
              <TwitterIcon />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href={user?.links ? user.links[0] : ""} className="text-sm">
              <LinkIcon />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
