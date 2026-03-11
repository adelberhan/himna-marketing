import { supabase } from "@/lib/supabaseClient";

export async function fetchPortfolio() {
  const { data, error } = await supabase
    .from("portfolio")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function addPortfolio(item) {
  const { data, error } = await supabase
    .from("portfolio")
    .insert([item])
    .select();
  if (error) throw error;
  return data;
}

export async function updatePortfolio(id, updates) {
  const { data, error } = await supabase
    .from("portfolio")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

export async function deletePortfolio(id) {
  const { error } = await supabase
    .from("portfolio")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
