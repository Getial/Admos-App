import { View, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors, theme } from "../utils/desing";

export default function CircleButton({ onPress }) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        <Icon name="plus" size={35} color="#25292e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 70,
    height: 70,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: colors[theme].card,
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: "#fff",
  },
});
