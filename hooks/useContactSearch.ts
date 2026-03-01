// hooks/useContactSearch.ts
import { Contact } from "../types/contact";

export function useContactSearch(contacts: Contact[], query: string) {
  if (!query.trim()) return contacts;

  const q = query.toLowerCase();
  return contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(q) || c.address.toLowerCase().includes(q),
  );
}
