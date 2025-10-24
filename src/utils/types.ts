import type { User } from "@supabase/supabase-js";

export interface IUser extends User {
  user_metadata: {
    name: string;
  };
}
