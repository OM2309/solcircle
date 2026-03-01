import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useWallet } from "../../hooks/useWallet";

export default function ProfileScreen() {
  const { publicKey, connected, connecting, error, connect, disconnect } =
    useWallet();

  const shortAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 6)}...${publicKey.toBase58().slice(-4)}`
    : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>

      {connecting ? (
        <ActivityIndicator size="large" color="#9945FF" />
      ) : connected ? (
        <View style={styles.connectedBox}>
          <Text style={styles.status}>Connected ✓</Text>
          <Text style={styles.address}>{shortAddress}</Text>

          {/* Balance placeholder (real fetch baad mein add karenge) */}
          <Text style={styles.balance}>0.00 SOL</Text>

          <TouchableOpacity style={styles.disconnectBtn} onPress={disconnect}>
            <Text style={styles.disconnectText}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.connectArea}>
          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity style={styles.connectBtn} onPress={connect}>
            <Text style={styles.connectText}>Connect Wallet</Text>
          </TouchableOpacity>

          <Text style={styles.hint}>
            Phantom, Solflare ya Backpack use kar sakte ho
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 32,
  },
  connectArea: {
    alignItems: "center",
    marginTop: 80,
  },
  connectBtn: {
    backgroundColor: "#9945FF", // Solana purple
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 16,
  },
  connectText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  hint: {
    color: "#666666",
    fontSize: 14,
    textAlign: "center",
  },
  connectedBox: {
    backgroundColor: "#161616",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#242424",
  },
  status: {
    color: "#00C896",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  address: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "monospace",
    marginBottom: 20,
  },
  balance: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 32,
  },
  disconnectBtn: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 12,
  },
  disconnectText: {
    color: "#FF5555",
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    color: "#FF5555",
    marginBottom: 16,
    textAlign: "center",
  },
});
