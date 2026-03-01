import { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import EmptyFeed from "../../components/feed/EmptyFeed";
import FeedFilter from "../../components/feed/FeedFilter";
import FeedHeader from "../../components/feed/FeedHeader";
import TransactionCard from "../../components/feed/TransactionCard";
import { useTransactions } from "../../hooks/useTransactions";
import { useWallet } from "../../hooks/useWallet";

type Filter = "all" | "sent" | "received";

export default function FeedScreen() {
  const { address, balance } = useWallet();
  const { transactions, loading, refresh } = useTransactions(address);

  const [filter, setFilter] = useState<Filter>("all");

  const filtered = transactions.filter((tx) =>
    filter === "all" ? true : tx.type === filter,
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <FeedHeader balance={balance} />
            <FeedFilter active={filter} onChange={setFilter} />
          </>
        }
        renderItem={({ item }) => <TransactionCard tx={item} />}
        ListEmptyComponent={<EmptyFeed loading={loading} />}
        contentContainerStyle={filtered.length === 0 && styles.empty}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            tintColor="#444444"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D", paddingTop: 56 },
  empty: { flex: 1 },
});
