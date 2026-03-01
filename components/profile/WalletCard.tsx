// components/profile/WalletCard.tsx
import * as Clipboard from "expo-clipboard";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  address: string;
  balance: string;
  onRefresh: () => void; // ← add karo
};

export default function WalletCard({ address, balance, onRefresh }: Props) {
  const short = `${address.slice(0, 6)}...${address.slice(-6)}`;

  const handleCopy = async () => {
    await Clipboard.setStringAsync(address);
    Alert.alert("Copied!", "Wallet address copied to clipboard");
  };

  return (
    <View style={styles.card}>
      {/* Avatar + Refresh */}
      <View style={styles.topRow}>
        <View style={styles.avatarWrapper}>
          <Text style={styles.avatar}>◎</Text>
        </View>
        <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
          <Text style={styles.refreshIcon}>↻</Text>
        </TouchableOpacity>
      </View>

      {/* Balance */}
      <Text style={styles.balanceLabel}>Balance</Text>
      <Text style={styles.balance}>{balance} SOL</Text>

      {/* Address */}
      <TouchableOpacity style={styles.addressRow} onPress={handleCopy}>
        <Text style={styles.address}>{short}</Text>
        <Text style={styles.copyIcon}>⎘</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    backgroundColor: "#111111",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    padding: 28,
    alignItems: "center",
    gap: 8,
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
  },
  avatarWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  avatar: {
    fontSize: 28,
    color: "#FFFFFF",
  },
  refreshBtn: {
    position: "absolute",
    right: 0,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#161616",
    borderWidth: 1,
    borderColor: "#1E1E1E",
  },
  refreshIcon: {
    fontSize: 16,
    color: "#555555",
  },
  balanceLabel: {
    fontSize: 11,
    color: "#444444",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  balance: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -1.5,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#161616",
    borderWidth: 1,
    borderColor: "#1E1E1E",
  },
  address: {
    fontSize: 12,
    color: "#555555",
    fontFamily: "monospace",
  },
  copyIcon: {
    fontSize: 14,
    color: "#444444",
  },
});
