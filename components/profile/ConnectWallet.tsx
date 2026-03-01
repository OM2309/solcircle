// components/profile/ConnectWallet.tsx
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onCreate: () => void;
};

export default function ConnectWallet({ onCreate }: Props) {
  const handleCreate = () => {
    Alert.alert(
      "Create Wallet",
      "A new Solana devnet wallet will be created and saved securely on your device.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Create", onPress: onCreate },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>◎</Text>
      <Text style={styles.title}>SolCircle</Text>
      <Text style={styles.sub}>
        Create a Solana wallet to send and receive payments
      </Text>
      <TouchableOpacity style={styles.btn} onPress={handleCreate}>
        <Text style={styles.btnText}>Create Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 12,
  },
  emoji: {
    fontSize: 56,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.8,
  },
  sub: {
    fontSize: 13,
    color: "#444444",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 8,
  },
  btn: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000000",
  },
});
