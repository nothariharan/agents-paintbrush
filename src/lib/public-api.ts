/** Base URL for public API calls. Empty = same-origin (production web). */
export function publicApiUrl(path: string): string {
  const base = (import.meta.env.VITE_PUBLIC_API_BASE as string | undefined)?.replace(/\/$/, "") ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
