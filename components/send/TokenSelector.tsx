// components/send/TokenSelector.tsx
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Token = "SOL" | "USDC";

type Props = {
  selected: Token;
  onSelect: (t: Token) => void;
};

export default function TokenSelector({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Token</Text>
      <View style={styles.row}>
        {(["SOL", "USDC"] as Token[]).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.btn, selected === t && styles.btnSelected]}
            onPress={() => onSelect(t)}
          >
            <Text style={styles.tokenEmoji}>{t === "SOL" ? "◎" : "$"}</Text>
            <Text
              style={[
                styles.tokenLabel,
                selected === t && styles.tokenLabelSelected,
              ]}
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 8 },
  label: {
    fontSize: 11,
    color: "#444444",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  row: { flexDirection: "row", gap: 10 },
  btn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    backgroundColor: "#111111",
  },
  btnSelected: {
    borderColor: "#FFFFFF",
    backgroundColor: "#1A1A1A",
  },
  tokenEmoji: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  tokenLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444444",
  },
  tokenLabelSelected: {
    color: "#FFFFFF",
  },
});
