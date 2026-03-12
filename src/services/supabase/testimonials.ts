import { supabase } from "@/lib/supabaseClient";

interface ITestimonial {
  name: string;
  content: string;
  position: string;
  image: string;
  created_at: string;
}

export interface ITestimonialInput {
  name: string;
  content: string;
  position: string;
  image: string;
}

export async function fetchTestimonials() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function addTestimonial(item: ITestimonialInput) {
  const { data, error } = await supabase
    .from("testimonials")
    .insert([item])
    .select();
  if (error) throw error;
  return data;
}

export async function updateTestimonial(id: string | number, updates: ITestimonialInput) {
  const { data, error } = await supabase
    .from("testimonials")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

export async function deleteTestimonial(id: string | number) {
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
