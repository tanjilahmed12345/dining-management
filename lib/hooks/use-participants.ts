"use client";

import { useState, useEffect, useCallback } from "react";
import type { Confirmation } from "@/lib/types";
import api from "@/lib/api/client";

export function useParticipants(date?: string) {
  const [participants, setParticipants] = useState<Confirmation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParticipants = useCallback(async () => {
    if (!date) { setIsLoading(false); return; }
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get(`/api/confirmations?date=${date}`);
      setParticipants(res.data.data ?? []);
    } catch {
      setError("Failed to load participants");
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  useEffect(() => { fetchParticipants(); }, [fetchParticipants]);

  return { participants, isLoading, error, refetch: fetchParticipants };
}
