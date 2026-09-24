// One shared API address makes it easy to use a different backend URL later if needed.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

// Shared fetch helper: services call this instead of repeating error and JSON handling.
export async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  // Some server errors may not include JSON, so use an empty object as a safe fallback.
  const body = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new Error(body.message || "Something went wrong. Please try again.");
  return body as T;
}
