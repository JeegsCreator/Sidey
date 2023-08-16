"use client"
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { TwitterIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [user] = useUser()
  return ( <main>
    <header className="mt-6 flex justify-between items-center px-20">
        <div className="group flex gap-6 items-center">
          <div className="flex gap-3 items-center relative">
            {/* //TODO: Toogle show project logo if exist */}
            {/* <Avatar>
                <AvatarImage src="/sidey.svg" />
              </Avatar> */}
            <h1 className="text-3xl font-semibold">Zyruks</h1>
            <Button variant="outline" size="icon" asChild>
              <Link href="/" className="text-sm">
                {/* <FigmaLogo /> */}
                <TwitterIcon />
              </Link>
            </Button>
            <p>@zyruks</p>
          </div>
        </div>
      </header>
      <section>
        <p>description</p>
      </section>
  </main> );
}
 
export default Page;