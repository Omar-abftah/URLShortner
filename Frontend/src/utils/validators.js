export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function normalizeUrl(input) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    return url.hostname.includes(".") ? url.href : null;
  } catch {
    return null;
  }
}

export const isValidAlias = (v) => /^[a-zA-Z0-9_-]{4,32}$/.test(v);
