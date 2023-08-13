import axios from "axios";
import React, { useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

import { API_HOST } from "../utils/constants";
import { colors, fontFamily, theme } from "../utils/desing";

export default function SearchClient() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SearchClient</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].background,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      color: colors[theme].title,
      fontFamily: fontFamily,
      fontSize: 32,
      textAlign: "center",
      marginBottom: 25,
    },
})