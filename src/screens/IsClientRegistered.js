import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, fontFamily, theme } from "../utils/desing";

const IsClientRegistered = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>¿El cliente esta registrado?</Text>
      <View style={styles.buttonsContainer}>
        <Button
          title="Si, Buscar cliente"
          style={styles.buton}
          onPress={() => navigation.navigate("SearchClient")}
        />
        <Button
          title="No, Registrar nuevo cliente"
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
