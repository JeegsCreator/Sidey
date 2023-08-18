import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { profile as profileType } from "@prisma/client";
import { useEffect, useState } from "react";

export function useUser() {
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [user, setUser] = useState<{ user: User; profile: profileType } | null>(
    null,
  );
  useEffect(() => {
    const getUser = async () => {
      const supabase = createClientComponentClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return null;

      const { data: profile } = (await supabase
        .from("profile")
        .select()
        .filter("id", "eq", user?.id)
        .single()) as { data: profileType };

      if (!profile) {
        window.location.replace("http://localhost:3000/signup");
        return null;
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
    { user: User; profile: profileType } | null,
    boolean,
  ];
}
