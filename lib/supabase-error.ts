type PostgrestError = {
  message?: string
  details?: string
  hint?: string
  code?: string
}

function isPostgrestError(err: unknown): err is PostgrestError {
  return typeof err === "object" && err !== null && "message" in err
}

export function logSupabaseError(context: string, err: unknown) {
  console.error(`[${context}] Supabase request failed:`, err)

  if (isPostgrestError(err)) {
    console.error(`[${context}] Supabase error details:`, {
      message: err.message,
      details: err.details,
      hint: err.hint,
      code: err.code,
    })
  }

  if (err instanceof Error && err.stack) {
    console.error(`[${context}] Stack trace:`, err.stack)
  }
}

export function formatSupabaseError(err: unknown, fallback: string): string {
  if (err instanceof Error && err.message) {
    return err.message
  }

  if (isPostgrestError(err) && err.message) {
    const parts = [err.message]

    if (err.code) parts.push(`(code: ${err.code})`)
    if (err.details) parts.push(err.details)
    if (err.hint) parts.push(`Hint: ${err.hint}`)

    return parts.join(" ")
  }

  return fallback
}
