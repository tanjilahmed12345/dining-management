"use client";

import { useState, useEffect, useCallback } from "react";
import type { MenuItem } from "@/lib/types";

export function useMenus() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with API call — const res = await api.get("/api/menus");
      setMenus([]);
    } catch {
      setError("Failed to load menus");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchMenus(); }, [fetchMenus]);

  return { menus, isLoading, error, refetch: fetchMenus, setMenus };
}
