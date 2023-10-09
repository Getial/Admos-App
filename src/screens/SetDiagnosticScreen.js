import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  Button,
  FlatList,
  View,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";

import { API_HOST } from "../utils/constants";
import { colors, fontFamily, theme } from "../utils/desing";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../utils/metrics";

export default function SetDiagnosticScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={navigation.goBack} style={styles.buttonBack}>
        <Icon
          name="arrow-left"
          color={colors[theme].card}
          size={moderateScale(30)}
        />
      </Pressable>
      <Text>SetDiagnosticScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].background,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: verticalScale(50),
  },
  buttonBack: {
    position: "absolute",
    top: verticalScale(60),
    left: horizontalScale(30),
  },
});
