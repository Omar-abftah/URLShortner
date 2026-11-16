import { useCallback, useEffect, useState } from "react";
import * as linksApi from "../api/linksApi";
import { useAuth } from "./useAuth";

export function useLinks() {
  const { getToken } = useAuth();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLinks(await linksApi.listLinks(await getToken()));
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback(
    async (data) => {
      const link = await linksApi.createLink(await getToken(), data);
      await refresh();
      return link;
    },
    [getToken, refresh],
  );

  return { links, loading, error, create };
}
