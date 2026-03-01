// components/profile/WalletActions.tsx
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onReceive: () => void;
  onShare: () => void;
  onDisconnect: () => void;
};

export default function WalletActions({
  onReceive,
  onShare,
  onDisconnect,
}: Props) {
  return (
    <View style={styles.container}>
      <ActionBtn emoji="↓" label="Receive" onPress={onReceive} />
      <ActionBtn emoji="↗" label="Share" onPress={onShare} />
      <ActionBtn emoji="✕" label="Disconnect" onPress={onDisconnect} danger />
    </View>
  );
}

function ActionBtn({
  emoji,
  label,
  onPress,
  danger = false,
}: {
  emoji: string;
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={[styles.emoji, danger && styles.danger]}>{emoji}</Text>
      <Text style={[styles.label, danger && styles.danger]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    backgroundColor: "#111111",
  },
  emoji: { fontSize: 16, color: "#FFFFFF" },
  label: { fontSize: 11, color: "#FFFFFF", fontWeight: "500" },
  danger: { color: "#FF4444" },
});
