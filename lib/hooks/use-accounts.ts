"use client";

import { useState, useEffect, useCallback } from "react";
import type { IncomeTransaction, ExpenseTransaction } from "@/lib/types";

export function useIncomeTransactions(period: "weekly" | "monthly" | "yearly" = "monthly") {
  const [transactions, setTransactions] = useState<IncomeTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with API call
      setTransactions([]);
    } catch {
      setError("Failed to load income data");
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // TODO: Replace with API call
      setTransactions([]);
    } catch {
      setError("Failed to load expense data");
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

  return { transactions, isLoading, error, refetch: fetchTransactions, setTransactions };
}
