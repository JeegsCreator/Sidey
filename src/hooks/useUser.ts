import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Profile } from "@prisma/client";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation'

export function useUser() {
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [user, setUser] = useState<{ user: User; profile: Profile } | null>(
    null
  );
  useEffect(() => {
    const getUser = async () => {
      const supabase = createClientComponentClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      if (!user) return null
      
      const { data: profile} = await supabase
      .from("Profile")
      .select()
      .filter("id", "eq", user?.id)
      .single() as { data: Profile }

      // if (!profile) return redirect("http://localhost:3000/signup")
      if (!profile)  {
        window.location.replace("http://localhost:3000/signup")
        return null
      }

      return { user, profile };
    };

    getUser()
      .then((user) => {
        setUser(user);
      })
      .finally(() => {
        setUserIsLoading(false);
      });
  });

  return [user, userIsLoading] as [
    { user: User; profile: Profile } | null,
    boolean,
  ];
}
