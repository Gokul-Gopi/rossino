import { Database } from "./database.types";

import type { User as SupabaseUser } from "@supabase/supabase-js";

export type User = SupabaseUser & {
  user_metadata: {
    name: string;
  };
};

export type Dashboard = {
  project: Project;
  settings: Settings;
  tasks: Task[];
  widgets: Widget;
  sessions: Session;
};

export type Project = Database["public"]["Tables"]["projects"]["Row"];

export type Session = Database["public"]["Tables"]["sessions"]["Row"];

export type Task = Database["public"]["Tables"]["tasks"]["Row"];

export type Settings = Database["public"]["Tables"]["settings"]["Row"];

export type Widget = Database["public"]["Tables"]["widgets"]["Row"];
