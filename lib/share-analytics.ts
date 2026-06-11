import { getSupabase } from "@/lib/supabase"

export async function recordShareEvent(questionId: number): Promise<void> {
  try {
    const supabase = getSupabase()
    if (!supabase) return

    await supabase.from("share_events").insert({
      question_id: questionId,
      created_at: new Date().toISOString(),
    })
  } catch {
    // Silent — analytics must not break the share page
  }
}

export async function incrementShareCount(questionId: number): Promise<void> {
  try {
    const supabase = getSupabase()
    if (!supabase) return

    const { data } = await supabase
      .from("questions")
      .select("share_count")
      .eq("id", questionId)
      .maybeSingle()

    if (!data) return

    await supabase
      .from("questions")
      .update({ share_count: data.share_count + 1 })
      .eq("id", questionId)
  } catch {
    // Silent — share flow should not break if count update fails
  }
}
