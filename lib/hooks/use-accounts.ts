"use client";

import { useState, useEffect, useCallback } from "react";
import type { IncomeTransaction, ExpenseTransaction } from "@/lib/types";
import api from "@/lib/api/client";

export function useIncomeTransactions(period: "weekly" | "monthly" | "yearly" = "monthly") {
  const [transactions, setTransactions] = useState<IncomeTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get(`/api/transactions/income?period=${period}`);
      setTransactions(res.data.data ?? []);
    } catch {
      setError("Failed to load income data");
    } finally {
      setIsLoading(false);
    }
  }, [period]);

  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

  return { transactions, isLoading, error, refetch: fetchTransactions, setTransactions };
}

export function useExpenseTransactions(period: "weekly" | "monthly" | "yearly" = "monthly") {
  const [transactions, setTransactions] = useState<ExpenseTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get(`/api/transactions/expense?period=${period}`);
      setTransactions(res.data.data ?? []);
    } catch {
      setError("Failed to load expense data");
    } finally {
      setIsLoading(false);
    }
  }, [period]);

  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

  return { transactions, isLoading, error, refetch: fetchTransactions, setTransactions };
}
