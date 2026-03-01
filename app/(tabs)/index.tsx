// app/(tabs)/index.tsx
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import EmptyFeed from "../../components/feed/EmptyFeed";
import FeedFilter from "../../components/feed/FeedFilter";
import FeedHeader from "../../components/feed/FeedHeader";
import TransactionCard from "../../components/feed/TransactionCard";
import { Transaction } from "../../types/transaction";

// Dummy data
const DUMMY: Transaction[] = [
  {
    id: "1",
    type: "sent",
    name: "Aman",
    avatar: "👨",
    amount: "0.5",
    token: "SOL",
    time: "2m ago",
  },
  {
    id: "2",
    type: "received",
    name: "Neha",
    avatar: "👩",
    amount: "2",
    token: "USDC",
    time: "1h ago",
  },
  {
    id: "3",
    type: "sent",
    name: "Rahul",
    avatar: "🧑",
    amount: "1",
    token: "SOL",
    time: "3h ago",
  },
  {
    id: "4",
    type: "received",
    name: "Priya",
    avatar: "🦊",
    amount: "0.25",
    token: "SOL",
    time: "1d ago",
  },
  {
    id: "5",
    type: "sent",
    name: "Aman",
    avatar: "👨",
    amount: "5",
    token: "USDC",
    time: "2d ago",
  },
];

type Filter = "all" | "sent" | "received";

export default function FeedScreen() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = DUMMY.filter((tx) =>
    filter === "all" ? true : tx.type === filter,
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <FeedHeader />
            <FeedFilter active={filter} onChange={setFilter} />
          </>
        }
        renderItem={({ item }) => <TransactionCard tx={item} />}
        ListEmptyComponent={<EmptyFeed />}
        contentContainerStyle={filtered.length === 0 && styles.emptyList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    paddingTop: 56,
  },
  emptyList: {
    flex: 1,
  },
});
