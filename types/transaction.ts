// types/transaction.ts
export type TxType = "sent" | "received";

export interface Transaction {
  id: string;
  type: TxType;
  name: string; // "Aman", "Neha"
  avatar: string; // emoji
  amount: string; // "0.5"
  token: string; // "SOL" | "USDC"
  time: string; // "2m ago"
}
