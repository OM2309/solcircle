import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Contact } from "../../types/contact";

type Props = {
  contact: Contact;
  onDelete: (id: string) => void;
};

export default function ContactRow({ contact, onDelete }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{contact.avatar}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.address}>
          {contact.address.slice(0, 6)}...{contact.address.slice(-6)}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(contact.id)}>
        <Text style={styles.delete}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#161616",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 20 },
  info: { flex: 1 },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    color: "#444444",
    fontFamily: "monospace",
  },
  delete: {
    fontSize: 14,
    color: "#333333",
    paddingHorizontal: 8,
  },
});
