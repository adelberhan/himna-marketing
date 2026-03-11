import { supabase } from "@/lib/supabaseClient";

export async function fetchAdmins() {
  const { data, error } = await supabase
    .from("admins")
    .select("*");
  if (error) throw error;
  return data;
}
