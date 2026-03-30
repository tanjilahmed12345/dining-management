"use client";

import { useState, useEffect, useCallback } from "react";
import type { MenuItem } from "@/lib/types";
import api from "@/lib/api/client";

export function useMenus() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/menus");
      setMenus(res.data.data ?? []);
    } catch {
      setError("Failed to load menus");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchMenus(); }, [fetchMenus]);

  return { menus, isLoading, error, refetch: fetchMenus, setMenus };
}
