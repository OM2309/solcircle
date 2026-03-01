// app/(tabs)/profile.tsx
import { StyleSheet, Text, View } from "react-native";
export default function ProfileScreen() {
  return (
    <View style={s.container}>
      <Text style={s.text}>Wallet</Text>
    </View>
  );
}
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: "#333333", fontSize: 14 },
});
