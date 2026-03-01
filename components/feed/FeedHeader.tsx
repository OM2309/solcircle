// components/feed/FeedHeader.tsx
import { StyleSheet, Text, View } from "react-native";

export default function FeedHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>SolCircle</Text>
      <View style={styles.balanceWrapper}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balance}>$0.00</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#161616",
  },
  greeting: {
    fontSize: 13,
    color: "#444444",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  balanceWrapper: {
    gap: 4,
  },
  balanceLabel: {
    fontSize: 12,
    color: "#444444",
  },
  balance: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
});
