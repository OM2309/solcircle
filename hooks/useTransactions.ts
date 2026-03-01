// hooks/useTransactions.ts
import { useCallback, useEffect, useState } from "react";
import { getTransactions, ParsedTx } from "../services/solana";

export function useTransactions(address: string | null) {
  const [transactions, setTransactions] = useState<ParsedTx[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!address) return;
    setLoading(true);
    setError(null);
    try {
      const txs = await getTransactions(address);
      setTransactions(txs);
    } catch (e: any) {
      setError(e?.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  }, [address]);

  // Address change hone pe auto fetch
  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    transactions,
    loading,
    error,
    refresh: fetch,
  };
}
