import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import { colors, fontFamily, theme } from "../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function SettingsScreen() {
  const { logout, auth } = useAuth();
  const cerrarSesion = () => {
    logout();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Icon
        name="user-circle"
        color={colors[theme].placeholder}
        size={moderateScale(150)}
      />
      <View>
        <Text style={styles.text}>{auth.fullname}</Text>
        <Text style={styles.text}>{auth.occupation}</Text>
      </View>
      <Pressable style={styles.btnLogout} onPress={cerrarSesion}>
        <Text style={styles.textBtn}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].background,
    padding: moderateScale(10),
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    color: colors[theme].text,
  },
  btnLogout: {
    // backgroundColor: colors[theme].card,
    alignSelf: "center",
    width: horizontalScale(80),
    paddingVertical: verticalScale(7),
    borderRadius: moderateScale(10),
    marginTop: verticalScale(20),
    borderWidth: moderateScale(1),
    borderColor: colors[theme].card,
  },
  textBtn: {
    color: colors[theme].text,
    textAlign: "center",
  },
});
