// app/(tabs)/send.tsx
import { StyleSheet, Text, View } from "react-native";
export default function SendScreen() {
  return (
    <View style={s.container}>
      <Text style={s.text}>Send</Text>
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
