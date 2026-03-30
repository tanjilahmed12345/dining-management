"use client";

import { useState, useEffect, useCallback } from "react";
import type { Confirmation } from "@/lib/types";

export function useParticipants(date?: string) {
  const [participants, setParticipants] = useState<Confirmation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParticipants = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with API call
      setParticipants([]);
    } catch {
      setError("Failed to load participants");
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => { fetchParticipants(); }, [fetchParticipants]);

  return { participants, isLoading, error, refetch: fetchParticipants };
}
