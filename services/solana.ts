// services/solana.ts
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import * as SecureStore from "expo-secure-store";

const RPC = "https://api.devnet.solana.com";
export const connection = new Connection(RPC, "confirmed");

const KEYPAIR_KEY = "solcircle_keypair";

// ─── Wallet ───────────────────────────────

// Naya wallet generate karo
export async function generateWallet(): Promise<Keypair> {
  const keypair = Keypair.generate();
  const secret = JSON.stringify(Array.from(keypair.secretKey));
  await SecureStore.setItemAsync(KEYPAIR_KEY, secret);
  return keypair;
}

// Saved wallet load karo
export async function loadWallet(): Promise<Keypair | null> {
  const saved = await SecureStore.getItemAsync(KEYPAIR_KEY);
  if (!saved) return null;
  const secret = new Uint8Array(JSON.parse(saved));
  return Keypair.fromSecretKey(secret);
}

// Wallet delete karo
export async function deleteWallet(): Promise<void> {
  await SecureStore.deleteItemAsync(KEYPAIR_KEY);
}

// ─── Balance ──────────────────────────────

export async function getBalance(address: string): Promise<string> {
  try {
    const pubkey = new PublicKey(address);
    const lamports = await connection.getBalance(pubkey);
    return (lamports / LAMPORTS_PER_SOL).toFixed(4);
  } catch {
    return "0.0000";
  }
}

// ─── Send SOL ─────────────────────────────

export async function sendSOL(
  from: Keypair,
  toAddress: string,
  amount: number,
): Promise<string> {
  const toPubkey = new PublicKey(toAddress);
  const lamports = Math.round(amount * LAMPORTS_PER_SOL);

  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey,
      lamports,
    }),
  );

  const sig = await sendAndConfirmTransaction(connection, tx, [from]);
  return sig;
}

// ─── Transactions ─────────────────────────

export interface ParsedTx {
  id: string;
  type: "sent" | "received";
  amount: string;
  token: string;
  time: string;
  signature: string;
}

export async function getTransactions(address: string): Promise<ParsedTx[]> {
  try {
    const pubkey = new PublicKey(address);
    const signatures = await connection.getSignaturesForAddress(pubkey, {
      limit: 20,
    });

    const txs: ParsedTx[] = [];

    for (const sig of signatures) {
      const tx = await connection.getTransaction(sig.signature, {
        maxSupportedTransactionVersion: 0,
      });

      if (!tx || !tx.meta) continue;

      const accounts = tx.transaction.message.getAccountKeys
        ? tx.transaction.message.getAccountKeys().staticAccountKeys
        : (tx.transaction.message as any).accountKeys;

      const myIndex = accounts.findIndex(
        (a: PublicKey) => a.toBase58() === address,
      );

      if (myIndex === -1) continue;

      const pre = tx.meta.preBalances[myIndex];
      const post = tx.meta.postBalances[myIndex];
      const diff = (post - pre) / LAMPORTS_PER_SOL;

      if (Math.abs(diff) < 0.000001) continue;

      const type = diff > 0 ? "received" : "sent";
      const amount = Math.abs(diff).toFixed(4);

      // Time
      const ts = tx.blockTime ? tx.blockTime * 1000 : Date.now();
      const time = formatTime(ts);

      txs.push({
        id: sig.signature,
        type,
        amount,
        token: "SOL",
        time,
        signature: sig.signature,
      });
    }

    return txs;
  } catch {
    return [];
  }
}

// ─── Helpers ──────────────────────────────

export function isValidAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

function formatTime(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}
