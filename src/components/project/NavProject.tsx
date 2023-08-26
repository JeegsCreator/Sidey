import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuNavLink,
} from "../ui/navigation-menu";
import { Separator } from "../ui/separator";

const NavProject = () => {
  return (
    <nav className="mt-10 relative">
      <NavigationMenu className="px-20">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuNavLink active>Overview</NavigationMenuNavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuNavLink>Updates</NavigationMenuNavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuNavLink>Discussion</NavigationMenuNavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Separator className="absolute bottom-0" />
    </nav>
  );
};

export default NavProject;
