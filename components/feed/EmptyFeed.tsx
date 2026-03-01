// components/feed/EmptyFeed.tsx
import { StyleSheet, Text, View } from "react-native";

type Props = { loading?: boolean };

export default function EmptyFeed({ loading }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>⚡</Text>
      <Text style={styles.title}>
        {loading ? "Loading..." : "No transactions yet"}
      </Text>
      <Text style={styles.sub}>
        {loading ? "" : "Send SOL to someone to get started"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  emoji: { fontSize: 40 },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: -0.4,
  },
  sub: {
    fontSize: 13,
    color: "#444444",
  },
});
