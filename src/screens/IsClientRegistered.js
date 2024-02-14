import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";
import { colors, fontFamily, theme } from "../utils/desing";

const IsClientRegistered = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={navigation.goBack} style={styles.buttonBack}>
        <Icon
          name="arrow-left"
          color={colors[theme].card}
          size={30}
          style={styles.iconPlus}
        />
      </Pressable>
      <Text style={styles.title}>¿El cliente esta registrado?</Text>
      <View style={styles.buttonsContainer}>
        <Button
          title="Si, Buscar cliente"
          color={colors[theme].card}
          style={styles.buton}
          onPress={() => navigation.navigate("SearchClient")}
        />
        <Button
          title="No, Registrar nuevo cliente"
          color={colors[theme].card}
          style={styles.buton}
          onPress={() => navigation.navigate("NewClientRegister")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].background,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBack: {
    position: "absolute",
    top: verticalScale(50),
    left: horizontalScale(30),
  },
  title: {
    color: colors[theme].title,
    fontSize: 25,
    marginBottom: 40,
    fontFamily: fontFamily,
  },
  buttonsContainer: {
    height: 100,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  buton: {
    fontFamily: fontFamily,
  },
});

export default IsClientRegistered;
