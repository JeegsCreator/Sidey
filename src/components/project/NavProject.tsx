"use client";

import { usePathname, useParams } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuNavLink,
} from "../ui/navigation-menu";
import { Separator } from "../ui/separator";
import { getPathnameRoute } from "@/lib/utils";
import Link from "next/link";

const NavProject = () => {
  const pathname = usePathname();
  const params = useParams();
  const route = getPathnameRoute(pathname);
  const isOverview = (): boolean => {
    return route !== "updates" && route !== "discussion";
  };
  return (
    <nav className="mt-10 relative">
      <NavigationMenu className="px-20">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuNavLink active={isOverview()} asChild>
              <Link href={`/project/${params.projectId}`}>Overview</Link>
            </NavigationMenuNavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuNavLink active={route === "updates"} asChild>
              <Link href={`/project/${params.projectId}/updates`}>Updates</Link>
            </NavigationMenuNavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuNavLink active={route === "discussion"} asChild>
              <Link href={`/project/${params.projectId}/discussion`}>
                Discussion
              </Link>
            </NavigationMenuNavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Separator className="absolute bottom-0" />
    </nav>
  );
};

export default NavProject;
