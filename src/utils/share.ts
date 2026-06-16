// Native share with a graceful fallback to the clipboard. Returns what happened
// so callers can show the right confirmation. On mobile this opens the OS share
// sheet (Instagram, X, Messages…); on desktop / unsupported browsers it copies.
export async function shareOrCopy(text: string): Promise<'shared' | 'copied' | 'cancelled'> {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ text })
      return 'shared'
    } catch (e) {
      if ((e as Error)?.name === 'AbortError') return 'cancelled'
      // otherwise fall through to clipboard
    }
  }
  try {
    await navigator.clipboard.writeText(text)
    return 'copied'
  } catch {
    alert(text)
    return 'copied'
  }
}
