// app/(tabs)/send.tsx
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AmountInput from "../../components/send/AmountInput";
import ConfirmSheet from "../../components/send/ConfirmSheet";
import ContactPicker from "../../components/send/ContactPicker";
import TokenSelector from "../../components/send/TokenSelector";
import { useContacts } from "../../hooks/useContacts";
import { useWallet } from "../../hooks/useWallet";
import { sendSOL } from "../../services/solana";
import { Contact } from "../../types/contact";

type Token = "SOL" | "USDC";

export default function SendScreen() {
  const { contacts } = useContacts();
  const { keypair, refreshBalance } = useWallet();
  const [selected, setSelected] = useState<Contact | null>(null);
  const [token, setToken] = useState<Token>("SOL");
  const [amount, setAmount] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [sending, setSending] = useState(false);

  const canSend = !!selected && !!amount && amount !== "0" && !!keypair;

  const handleConfirm = async () => {
    if (!keypair || !selected || !amount) return;
    setSending(true);
    try {
      const sig = await sendSOL(keypair, selected.address, parseFloat(amount));
      setConfirm(false);
      setAmount("");
      setSelected(null);
      await refreshBalance();
      Alert.alert(
        "Sent! ✅",
        `${amount} SOL sent to ${selected.name}\n\nSignature:\n${sig.slice(0, 20)}...`,
        [{ text: "OK" }],
      );
    } catch (e: any) {
      Alert.alert("Failed ❌", e?.message || "Transaction failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send</Text>

      <ContactPicker
        contacts={contacts}
        selected={selected}
        onSelect={setSelected}
      />

      <View style={styles.divider} />

      <TokenSelector selected={token} onSelect={setToken} />

      <AmountInput value={amount} onChange={setAmount} token={token} />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.sendBtn, !canSend && styles.sendBtnOff]}
          onPress={() => canSend && setConfirm(true)}
          disabled={!canSend}
          activeOpacity={0.8}
        >
          <Text style={[styles.sendText, !canSend && styles.sendTextOff]}>
            {!keypair
              ? "Create wallet first"
              : selected
                ? amount && amount !== "0"
                  ? `Send ${amount} ${token} to ${selected.name}`
                  : `Send to ${selected.name}`
                : "Select a contact first"}
          </Text>
        </TouchableOpacity>
      </View>

      <ConfirmSheet
        visible={confirm}
        contact={selected}
        amount={amount}
        token={token}
        sending={sending}
        onConfirm={handleConfirm}
        onCancel={() => setConfirm(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D", paddingTop: 56 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  divider: { height: 1, backgroundColor: "#161616", marginVertical: 8 },
  footer: { paddingHorizontal: 20, paddingBottom: 32, paddingTop: 8 },
  sendBtn: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  sendBtnOff: { backgroundColor: "#161616" },
  sendText: { fontSize: 15, fontWeight: "700", color: "#000000" },
  sendTextOff: { color: "#333333" },
});
