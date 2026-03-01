// app/(tabs)/profile.tsx
import * as Clipboard from "expo-clipboard";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import ConnectWallet from "../../components/profile/ConnectWallet";
import WalletActions from "../../components/profile/WalletActions";
import WalletCard from "../../components/profile/WalletCard";
import WalletStats from "../../components/profile/WalletStats";
import { useContacts } from "../../hooks/useContacts";
import { useWallet } from "../../hooks/useWallet";

export default function ProfileScreen() {
  const {
    address,
    balance,
    connected,
    createWallet,
    disconnectWallet,
    refreshBalance,
  } = useWallet();
  const { contacts } = useContacts();

  if (!connected) {
    return (
      <View style={styles.container}>
        <ConnectWallet onCreate={createWallet} />
      </View>
    );
  }

  const handleShare = async () => {
    await Clipboard.setStringAsync(address!);
    Alert.alert("Copied!", "Wallet address copied");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <WalletCard
        address={address!}
        balance={balance}
        onRefresh={refreshBalance}
      />
      <WalletActions
        onReceive={() => Alert.alert("Your Address", address!)}
        onShare={handleShare}
        onDisconnect={disconnectWallet}
      />
      <WalletStats sent={0} received={0} contacts={contacts.length} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  content: { paddingTop: 56, paddingBottom: 100, gap: 16 },
});
