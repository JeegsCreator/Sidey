import Avvvatars from "avvvatars-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LinkIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getUser } from "@/app/api/user/getUser";

export default async function Page() {
  const user = await getUser({
    username: "lukafeller",
  });

  console.log(user);
  return (
    <main>
      <header className="mt-6 flex justify-between items-center container">
        <div className="group flex gap-6 items-center">
          <Suspense fallback={<div>Loading...</div>}>
            <div className="flex gap-3 items-center relative">
              {/* //TODO: Toogle show project logo if exist */}

              <Avvvatars value={user.username} style="shape" />

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
                <Link
                  href={user?.links ? user.links[0] : ""}
                  className="text-sm"
                >
                  <LinkIcon />
                </Link>
              </Button>
            </div>
          </Suspense>
        </div>
      </header>
      <section className="container">
        <p>description</p>
      </section>
    </main>
  );
}
