// components/send/AmountInput.tsx
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  value: string;
  onChange: (v: string) => void;
  token: string;
};

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"];

export default function AmountInput({ value, onChange, token }: Props) {
  const handlePress = (key: string) => {
    // Backspace
    if (key === "⌫") {
      onChange(value.slice(0, -1));
      return;
    }

    // Dot duplicate nahi hona chahiye
    if (key === "." && value.includes(".")) return;

    // Leading zero fix — "0" ke baad direct number
    if (key !== "." && value === "0") {
      onChange(key);
      return;
    }

    // Normal append
    onChange(value + key);
  };

  return (
    <View style={styles.container}>
      {/* Display */}
      <View style={styles.display}>
        <Text style={styles.amount} numberOfLines={1} adjustsFontSizeToFit>
          {value || "0"}
        </Text>
        <Text style={styles.token}>{token}</Text>
      </View>

      {/* Numpad — 3x4 grid */}
      <View style={styles.pad}>
        {KEYS.map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => handlePress(key)}
            activeOpacity={0.6}
          >
            <Text style={[styles.keyText, key === "⌫" && styles.backspace]}>
              {key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  display: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 4,
  },
  amount: {
    fontSize: 56,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -2,
  },
  token: {
    fontSize: 14,
    color: "#444444",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  pad: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  key: {
    width: "33.33%",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  keyText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "400",
  },
  backspace: {
    fontSize: 20,
    color: "#555555",
  },
});
