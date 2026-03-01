// services/contactStorage.ts
import * as SecureStore from "expo-secure-store";
import { Contact } from "../types/contact";

const KEY = "solcircle_contacts";

// Get all contacts
export async function getContacts(): Promise<Contact[]> {
  const data = await SecureStore.getItemAsync(KEY);
  return data ? JSON.parse(data) : [];
}

// Save all contacts
export async function saveContacts(contacts: Contact[]): Promise<void> {
  await SecureStore.setItemAsync(KEY, JSON.stringify(contacts));
}

// Add one contact
export async function addContact(contact: Contact): Promise<void> {
  const existing = await getContacts();
  await saveContacts([...existing, contact]);
}

// Delete by id
export async function deleteContact(id: string): Promise<void> {
  const existing = await getContacts();
  await saveContacts(existing.filter((c) => c.id !== id));
}
