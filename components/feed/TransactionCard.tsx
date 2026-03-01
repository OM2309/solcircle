// components/feed/TransactionCard.tsx
import { StyleSheet, Text, View } from "react-native";
import { Transaction } from "../../types/transaction";

export default function TransactionCard({ tx }: { tx: Transaction }) {
  const isSent = tx.type === "sent";

  return (
    <View style={styles.card}>
      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{tx.avatar}</Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.description}>
          {isSent ? (
            <>
              <Text style={styles.muted}>you paid </Text>
              <Text style={styles.name}>{tx.name}</Text>
            </>
          ) : (
            <>
              <Text style={styles.name}>{tx.name}</Text>
              <Text style={styles.muted}> sent you</Text>
            </>
          )}
        </Text>
        <Text style={styles.time}>{tx.time}</Text>
      </View>

      {/* Amount */}
      <View style={styles.amountWrapper}>
        <Text
          style={[
            styles.amount,
            isSent ? styles.amountSent : styles.amountReceived,
          ]}
        >
          {isSent ? "-" : "+"}
          {tx.amount}
        </Text>
        <Text style={styles.token}>{tx.token}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#111111",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#161616",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 20 },
  info: { flex: 1, gap: 4 },
  description: { fontSize: 14 },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  muted: {
    fontSize: 14,
    color: "#555555",
  },
  time: {
    fontSize: 11,
    color: "#333333",
  },
  amountWrapper: {
    alignItems: "flex-end",
    gap: 2,
  },
  amount: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  amountSent: {
    color: "#FFFFFF",
  },
  amountReceived: {
    color: "#00C896", // green — received
  },
  token: {
    fontSize: 11,
    color: "#333333",
  },
});
