import { getSupabase } from "@/lib/supabase"
import type { Category } from "@/types/category"

export async function fetchActiveCategories(): Promise<Category[]> {
  const { data, error } = await getSupabase()
    .from("categories")
    .select("id, title, icon, premium, sort_order")
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
