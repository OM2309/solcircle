import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddContactModal from "../../components/contacts/AddContactModal";
import ContactRow from "../../components/contacts/ContactRow";
import ContactSearch from "../../components/contacts/ContactSearch";
import EmptyContacts from "../../components/contacts/EmptyContacts";
import { useContacts } from "../../hooks/useContacts";
import { useContactSearch } from "../../hooks/useContactSearch";

export default function ContactsScreen() {
  const { contacts, loading, addContact, removeContact } = useContacts();
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);

  const filtered = useContactSearch(contacts, query);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>People</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModal(true)}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <ContactSearch value={query} onChange={setQuery} />

      {/* List or Empty */}
      {loading ? null : filtered.length === 0 ? (
        <EmptyContacts />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactRow contact={item} onDelete={removeContact} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Modal */}
      <AddContactModal
        visible={modal}
        onClose={() => setModal(false)}
        onSave={addContact}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    paddingTop: 56,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  addBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#242424",
  },
  addBtnText: {
    fontSize: 13,
    color: "#888888",
    fontWeight: "500",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
});
