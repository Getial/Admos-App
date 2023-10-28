import { Pressable, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function IconButton({ icon, label, onPress }) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <Icon name={icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
