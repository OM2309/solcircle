import { StyleSheet, TextInput } from "react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function ContactSearch({ value, onChange }: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search by name..."
      placeholderTextColor="#333333"
      value={value}
      onChangeText={onChange}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#161616",
    borderWidth: 1,
    borderColor: "#1E1E1E",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 12,
  },
});
