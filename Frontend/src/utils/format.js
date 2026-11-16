// Short links are served (and counted) by the backend redirect endpoint.
export const shortUrl = (code) => `${window.location.origin}/${code}`;

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

export const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};
