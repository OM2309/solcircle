import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AVATARS = ["👨", "👩", "🧑", "🦊", "🐻", "🐼", "🦁", "🤖", "👾", "🧠"];

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, address: string, avatar: string) => void;
};

export default function AddContactModal({ visible, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("👨");

  const handleSave = () => {
    if (!name.trim() || !address.trim()) return;
    onSave(name.trim(), address.trim(), avatar);
    setName("");
    setAddress("");
    setAvatar("👨");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>New Contact</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Avatar picker */}
          <Text style={styles.label}>Avatar</Text>
          <View style={styles.avatarRow}>
            {AVATARS.map((a) => (
              <TouchableOpacity
                key={a}
                style={[
                  styles.avatarOpt,
                  avatar === a && styles.avatarSelected,
                ]}
                onPress={() => setAvatar(a)}
              >
                <Text style={styles.avatarText}>{a}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Inputs */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Aman, Neha..."
            placeholderTextColor="#333333"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Wallet Address</Text>
          <TextInput
            style={styles.input}
            placeholder="7xKp9mNq..."
            placeholderTextColor="#333333"
            value={address}
            onChangeText={setAddress}
            autoCapitalize="none"
          />

          {/* Save */}
          <TouchableOpacity
            style={[styles.saveBtn, (!name || !address) && styles.saveBtnOff]}
            onPress={handleSave}
          >
            <Text style={styles.saveBtnText}>Save Contact</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  sheet: {
    backgroundColor: "#111111",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.4,
  },
  close: {
    fontSize: 16,
    color: "#444444",
  },
  label: {
    fontSize: 11,
    color: "#444444",
    letterSpacing: 0.4,
    marginTop: 8,
  },
  avatarRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 4,
  },
  avatarOpt: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#242424",
  },
  avatarSelected: {
    borderColor: "#FFFFFF",
    backgroundColor: "#222222",
  },
  avatarText: { fontSize: 20 },
  input: {
    backgroundColor: "#161616",
    borderWidth: 1,
    borderColor: "#1E1E1E",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: "#FFFFFF",
  },
  saveBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  saveBtnOff: {
    backgroundColor: "#1A1A1A",
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
  },
});
