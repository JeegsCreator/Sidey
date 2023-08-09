import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";

const UserDropdown = () => {
  const supabase = createClientComponentClient();
  const [avatarUrl, setAvatarUrl] = useState("");
  const getProfile = useCallback(async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", session?.user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
    }
  }, [supabase]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border border-slate-300 rounded-md py-1 px-2 flex items-center gap-1">
        <Avatar>
          <AvatarFallback></AvatarFallback>
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <ChevronDown className="text-slate-400" size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Fruits</DropdownMenuLabel>
          <DropdownMenuItem>Apple</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Fruits</DropdownMenuLabel>
          <DropdownMenuItem>Configuration</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
