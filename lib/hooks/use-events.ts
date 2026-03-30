"use client";

import { useState, useEffect, useCallback } from "react";
import type { SpecialEvent } from "@/lib/types";
import api from "@/lib/api/client";

export function useSpecialEvents() {
  const [events, setEvents] = useState<SpecialEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/special-events");
      setEvents(res.data.data ?? []);
    } catch {
      setError("Failed to load events");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  return { events, isLoading, error, refetch: fetchEvents };
}
