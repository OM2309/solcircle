// components/profile/WalletStats.tsx
import { StyleSheet, Text, View } from "react-native";

type Props = {
  sent: number;
  received: number;
  contacts: number;
};

export default function WalletStats({ sent, received, contacts }: Props) {
  return (
    <View style={styles.container}>
      <Stat label="Sent" value={sent} />
      <View style={styles.divider} />
      <Stat label="Received" value={received} />
      <View style={styles.divider} />
      <Stat label="Contacts" value={contacts} />
    </View>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "#111111",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    padding: 20,
  },
  stat: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 11,
    color: "#444444",
    letterSpacing: 0.3,
  },
  divider: {
    width: 1,
    backgroundColor: "#1E1E1E",
  },
});
