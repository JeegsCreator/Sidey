import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, Loader2, Plus } from "lucide-react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import clsx from "clsx";
import { useUser } from "@/hooks/useUser";

const UserDropdown = () => {
  const [data, userIsLoading] = useUser();

  if (data) {
    const profile = data.profile;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="border border-slate-300 rounded-md py-1 px-2 flex items-center gap-1">
          <Avatar>
            <AvatarFallback>
              {profile.username?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
            {/* <AvatarImage src={} /> */}
          </Avatar>
          <ChevronDown className="text-slate-400" size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[200px]">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Projects</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/">Your projects</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              {/* <Button asChild size="sm" className="justify-start bg-slate-600"> */}
              <Link href="/project/create">
                <Plus className="mr-2" size={16} />
                Add new project
              </Link>
              {/* </Button> */}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Logged as {profile.username}</DropdownMenuLabel>
            <DropdownMenuItem>Profile setting</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <form action="/api/auth/signout" method="post">
                <button className="w-full text-left">Log Out</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return (
      <Button asChild>
        <Link
          href="/login"
          className={clsx(userIsLoading && "pointer-events-none opacity-50")}
        >
          {userIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Log In
        </Link>
      </Button>
    );
  }
};

export default UserDropdown;
