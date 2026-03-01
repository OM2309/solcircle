import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Contact } from "../../types/contact";

type Props = {
  contacts: Contact[];
  selected: Contact | null;
  onSelect: (c: Contact) => void;
};

export default function ContactPicker({ contacts, selected, onSelect }: Props) {
  if (contacts.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          No contacts — add one in People tab
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Send to</Text>
      <FlatList
        data={contacts}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isSelected = selected?.id === item.id;
          return (
            <TouchableOpacity
              style={[styles.item, isSelected && styles.itemSelected]}
              onPress={() => onSelect(item)}
            >
              <Text style={styles.avatar}>{item.avatar}</Text>
              <Text style={[styles.name, isSelected && styles.nameSelected]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  label: {
    fontSize: 11,
    color: "#444444",
    letterSpacing: 0.4,
    paddingHorizontal: 20,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  list: { paddingHorizontal: 20, gap: 10 },
  item: {
    alignItems: "center",
    gap: 6,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    backgroundColor: "#111111",
    minWidth: 64,
  },
  itemSelected: {
    borderColor: "#FFFFFF",
    backgroundColor: "#1A1A1A",
  },
  avatar: { fontSize: 24 },
  name: {
    fontSize: 11,
    color: "#444444",
    fontWeight: "500",
  },
  nameSelected: { color: "#FFFFFF" },
  empty: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  emptyText: {
    fontSize: 13,
    color: "#333333",
  },
});
