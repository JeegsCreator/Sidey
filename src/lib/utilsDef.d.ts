import { SupabaseClient, Session } from "@supabase/supabase-js";

export interface GetUserAndProfileOutput {
  user:
    | {
        session: Session;
      }
    | {
        session: null;
      };
  profile: any;
  error: any | null;
  supabase: SupabaseClient<any, "public", any>;
}
