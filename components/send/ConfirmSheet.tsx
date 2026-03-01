import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Contact } from "../../types/contact";

type Props = {
  visible: boolean;
  contact: Contact | null;
  amount: string;
  token: string;
  sending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmSheet({
  visible,
  contact,
  amount,
  token,
  sending, // ← yeh missing tha
  onConfirm,
  onCancel,
}: Props) {
  if (!contact) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <Text style={styles.title}>Confirm Payment</Text>

          <View style={styles.summary}>
            <Text style={styles.avatar}>{contact.avatar}</Text>
            <Text style={styles.summaryText}>
              Sending{" "}
              <Text style={styles.highlight}>
                {amount} {token}
              </Text>{" "}
              to <Text style={styles.highlight}>{contact.name}</Text>
            </Text>
            <Text style={styles.address}>
              {contact.address.slice(0, 8)}...{contact.address.slice(-8)}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.confirmBtn, sending && styles.confirmBtnOff]}
            onPress={onConfirm}
            disabled={sending}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.confirmText, sending && styles.confirmTextOff]}
            >
              {sending ? "Sending..." : `Send ${token}`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={onCancel}
            disabled={sending}
          >
            <Text style={styles.cancelText}>Cancel</Text>
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
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  sheet: {
    backgroundColor: "#111111",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    gap: 12,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: "#2A2A2A",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.4,
    textAlign: "center",
  },
  summary: {
    alignItems: "center",
    paddingVertical: 20,
    gap: 8,
  },
  avatar: { fontSize: 48 },
  summaryText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
  },
  highlight: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  address: {
    fontSize: 11,
    color: "#333333",
    fontFamily: "monospace",
  },
  confirmBtn: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  confirmBtnOff: {
    backgroundColor: "#1A1A1A", // ← sending ke waqt dark
  },
  confirmText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000000",
  },
  confirmTextOff: {
    color: "#444444", // ← sending ke waqt muted
  },
  cancelBtn: {
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 14,
    color: "#444444",
  },
});
