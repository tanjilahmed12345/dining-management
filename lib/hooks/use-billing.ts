"use client";

import { useState, useEffect, useCallback } from "react";
import type { Bill, PaymentRecord } from "@/lib/types";

export function useBills() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBills = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with API call
      setBills([]);
    } catch {
      setError("Failed to load billing data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchBills(); }, [fetchBills]);

  return { bills, isLoading, error, refetch: fetchBills };
}

export function useUserBill(userId?: string) {
  const [bill, setBill] = useState<Bill | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBill = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with API call
      setBill(null);
      setPayments([]);
    } catch {
      setError("Failed to load bill");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchBill(); }, [fetchBill]);

  return { bill, payments, isLoading, error, refetch: fetchBill };
}
