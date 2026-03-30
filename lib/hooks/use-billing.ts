"use client";

import { useState, useEffect, useCallback } from "react";
import type { Bill, PaymentRecord } from "@/lib/types";
import api from "@/lib/api/client";

export function useBills() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBills = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/bills");
      setBills(res.data.data ?? []);
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
    if (!userId) { setIsLoading(false); return; }
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get(`/api/bills?userId=${userId}`);
      const bills: Bill[] = res.data.data ?? [];
      if (bills.length > 0) {
        setBill(bills[0]);
        const payRes = await api.get(`/api/bills/${bills[0].id}/payments`);
        setPayments(payRes.data.data ?? []);
      } else {
        setBill(null);
        setPayments([]);
      }
    } catch {
      setError("Failed to load bill");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchBill(); }, [fetchBill]);

  return { bill, payments, isLoading, error, refetch: fetchBill };
}
