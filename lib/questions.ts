import { getSupabase, SUPABASE_CONFIG_ERROR } from "@/lib/supabase"
import type { Question } from "@/types/question"

type JoinedCategory = {
  id: number
  title: string
  icon: string | null
  premium: boolean
  sort_order: number
  active: boolean
}

type QuestionRow = {
  id: number
  category_id: number
  prompt_text: string
  premium: boolean
  share_count: number
  categories: JoinedCategory | JoinedCategory[] | null
}

function getJoinedCategory(
  categories: QuestionRow["categories"]
): JoinedCategory | null {
  if (!categories) return null
  if (Array.isArray(categories)) return categories[0] ?? null
  return categories
}

export async function fetchQuestionsByCategoryId(
  categoryId: number
): Promise<Question[]> {
  const supabase = getSupabase()

  if (!supabase) {
    throw new Error(SUPABASE_CONFIG_ERROR)
  }

  const { data, error } = await supabase
    .from("questions")
    .select(
      `
      id,
      category_id,
      prompt_text,
      premium,
      share_count,
      categories (
        id,
        title,
        icon,
        premium,
        sort_order,
        active
      )
    `
    )
    .eq("category_id", categoryId)
    .eq("active", true)
    .order("id", { ascending: true })

  if (error) throw error

  return ((data as QuestionRow[] | null) ?? [])
    .map((row) => {
      const category = getJoinedCategory(row.categories)
      if (!category) return null

      return {
        id: row.id,
        categoryId: row.category_id,
        promptText: row.prompt_text,
        premium: row.premium,
        shareCount: row.share_count,
        categoryTitle: category.title,
      }
    })
    .filter((question): question is Question => question !== null)
}
