import { getSupabase, SUPABASE_CONFIG_ERROR } from "@/lib/supabase"
import type { Category } from "@/types/category"

export async function fetchActiveCategories(): Promise<Category[]> {
  const supabase = getSupabase()

  if (!supabase) {
    throw new Error(SUPABASE_CONFIG_ERROR)
  }

  const { data, error } = await supabase
    .from("categories")
    .select("id, title, icon, premium, sort_order, active")
    .eq("active", true)
    .order("sort_order", { ascending: true })

  if (error) throw error

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    icon: row.icon,
    premium: row.premium,
    sort_order: row.sort_order,
  }))
}
