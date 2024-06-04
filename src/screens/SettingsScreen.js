import React from "react";
import { View, Text, Pressable, Switch, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { colors, fontFamily } from "../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function SettingsScreen() {
  const { logout, auth } = useAuth();
  const { theme, toggleTheme, currentTheme } = useTheme();

  const isDarkMode = currentTheme === "dark";

  const styles = createStyles(theme);

  const cerrarSesion = () => {
    logout();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Icon
        name="user-circle"
        color={theme.placeholder}
        size={moderateScale(150)}
      />
      <View>
        <Text style={styles.text}>{auth.fullname}</Text>
        <Text style={styles.text}>{auth.occupation}</Text>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
        />
      </View>
      <Pressable style={styles.btnLogout} onPress={cerrarSesion}>
        <Text style={styles.textBtn}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.title,
    },
    subtitle: {
      fontSize: 18,
      marginTop: 10,
      color: theme.subtitle,
    },
    text: {
      color: theme.text,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
    },
    switchLabel: {
      fontSize: 16,
      color: theme.textPrimary,
      marginRight: 10,
    },
    btnLogout: {
      // backgroundColor: colors[theme].card,
      alignSelf: "center",
      width: horizontalScale(80),
      paddingVertical: verticalScale(7),
      borderRadius: moderateScale(10),
      marginTop: verticalScale(20),
      borderWidth: moderateScale(1),
      borderColor: theme.primary,
    },
    textBtn: {
      color: theme.text,
      textAlign: "center",
    },
  });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors[theme].background,
//     padding: moderateScale(10),
//     display: "flex",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//   },
//   text: {
//     color: colors[theme].text,
//   },
//   btnLogout: {
//     // backgroundColor: colors[theme].card,
//     alignSelf: "center",
//     width: horizontalScale(80),
//     paddingVertical: verticalScale(7),
//     borderRadius: moderateScale(10),
//     marginTop: verticalScale(20),
//     borderWidth: moderateScale(1),
//     borderColor: colors[theme].card,
//   },
//   textBtn: {
//     color: colors[theme].text,
//     textAlign: "center",
//   },
// });
