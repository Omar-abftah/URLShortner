// Empty in dev (Vite proxies /api to the backend); set VITE_API_URL for deployed builds.
export const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

export async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      // Backend error shape: { error: { message, details? } }
      const first = Array.isArray(data?.error?.details) ? data.error.details[0]?.msg : null;
      message = first || data?.error?.message || message;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(message);
  }
  return res.json();
}
