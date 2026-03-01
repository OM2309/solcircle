// hooks/useWallet.ts
import { Keypair } from "@solana/web3.js";
import { useEffect, useState } from "react";
import {
  deleteWallet,
  generateWallet,
  getBalance,
  loadWallet,
} from "../services/solana";

export function useWallet() {
  const [keypair, setKeypair] = useState<Keypair | null>(null);
  const [balance, setBalance] = useState("0.0000");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWallet().then(async (kp) => {
      if (kp) {
        setKeypair(kp);
        const bal = await getBalance(kp.publicKey.toBase58());
        setBalance(bal);
      }
      setLoading(false);
    });
  }, []);

  const createWallet = async () => {
    const kp = await generateWallet();
    setKeypair(kp);
    setBalance("0.0000");
  };

  const refreshBalance = async () => {
    if (!keypair) return;
    const bal = await getBalance(keypair.publicKey.toBase58());
    setBalance(bal);
  };

  const disconnectWallet = async () => {
    await deleteWallet();
    setKeypair(null);
    setBalance("0.0000");
  };

  return {
    keypair,
    address: keypair?.publicKey.toBase58() ?? null,
    balance,
    loading,
    connected: !!keypair,
    createWallet,
    refreshBalance,
    disconnectWallet,
  };
}
