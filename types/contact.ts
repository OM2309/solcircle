export interface Contact {
  id: string; // unique id — Date.now().toString()
  name: string; // "Aman", "Neha"
  address: string; // Solana wallet address
  avatar: string; // emoji — "👨" "🧑" "🦊"
  createdAt: number; // timestamp
}
