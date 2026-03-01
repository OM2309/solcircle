// hooks/useContacts.ts
import { useEffect, useState } from "react";
import * as storage from "../services/contactStorage";
import { Contact } from "../types/contact";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  // Load on mount
  useEffect(() => {
    storage.getContacts().then((data) => {
      setContacts(data);
      setLoading(false);
    });
  }, []);

  // Add contact
  const addContact = async (name: string, address: string, avatar: string) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      name,
      address,
      avatar,
      createdAt: Date.now(),
    };
    await storage.addContact(newContact);
    setContacts((prev) => [...prev, newContact]);
  };

  // Delete contact
  const removeContact = async (id: string) => {
    await storage.deleteContact(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return { contacts, loading, addContact, removeContact };
}
