import { request } from "./client";

const toLink = (u) => ({
  id: u.id,
  code: u.code,
  url: u.target,
  clicks: u.clicks ?? 0,
  createdAt: u.created_at,
  expiresAt: u.expires_at,
});

export async function listLinks(token) {
  const docs = await request("/api/v1/urls/", { token });
  return docs.map(toLink);
}

export async function createLink(token, { url, alias }) {
  const doc = await request("/api/v1/urls/", {
    method: "POST",
    token,
    body: { target: url, custom_code: alias || null },
  });
  console.log(doc);
  return toLink(doc);
}
