// components/feed/FeedFilter.tsx
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Filter = "all" | "sent" | "received";

type Props = {
  active: Filter;
  onChange: (f: Filter) => void;
};

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "sent", label: "Sent" },
  { key: "received", label: "Received" },
];

export default function FeedFilter({ active, onChange }: Props) {
  return (
    <View style={styles.container}>
      {FILTERS.map((f) => (
        <TouchableOpacity
          key={f.key}
          style={[styles.btn, active === f.key && styles.btnActive]}
          onPress={() => onChange(f.key)}
        >
          <Text style={[styles.label, active === f.key && styles.labelActive]}>
            {f.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 8,
  },
  btn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    backgroundColor: "#111111",
  },
  btnActive: {
    backgroundColor: "#1E1E1E",
    borderColor: "#333333",
  },
  label: {
    fontSize: 12,
    color: "#444444",
    fontWeight: "500",
  },
  labelActive: {
    color: "#FFFFFF",
  },
});
