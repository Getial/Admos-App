import React from "react";
import { Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { horizontalScale, verticalScale } from "../utils/metrics";

export default function EditEvidence(image) {
  return (
    <SafeAreaView>
      <Text>Editar evidencia</Text>
      <Image source={{ uri: image }} style={styles.image} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: horizontalScale(400),
    height: verticalScale(400),
  },
});
