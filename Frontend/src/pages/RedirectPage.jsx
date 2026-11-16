import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE } from "../api/client";

// Public route: /:code → forwards to the backend redirect endpoint, which records the click.
export default function RedirectPage() {
  const { code } = useParams();

  useEffect(() => {
    window.location.replace(`${API_BASE}/api/v1/urls/${encodeURIComponent(code)}`);
  }, [code]);

  return null;
}
