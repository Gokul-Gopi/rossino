import { createBrowserClient } from "@supabase/ssr";

const createClient = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
  return supabase;
};

const supabase = createClient();

export default supabase;
