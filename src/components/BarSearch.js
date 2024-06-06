import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useRef } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import useTheme from "../hooks/useTheme";
import { fontFamily } from "../utils/desing";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../utils/metrics";

export default function BarSearch({ searchOrder }) {
  const [searchValue, setSearchValue] = useState("");
  const textInputRef = useRef(null);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handlePress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} style={styles.barSearch}>
        <Icon name="search" size={15} color={theme.placeholder} />
        <TextInput
          placeholder="Numero de orden o nombre del cliente"
          placeholderTextColor={theme.placeholder}
          style={styles.input}
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
          ref={textInputRef}
          onBlur={() => Keyboard.dismiss()}
        />
        <Pressable
          style={styles.btnSearch}
          onPress={() => searchOrder(searchValue)}
        >
          <Text style={styles.textBtn}>Buscar</Text>
        </Pressable>
      </Pressable>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: 20,
      left: 0,
      backgroundColor: theme.background,
      height: verticalScale(55),
    },
    barSearch: {
      width: "93%",
      height: verticalScale(40),
      backgroundColor: theme.input,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingTop: verticalScale(2),
      marginLeft: "5%",
      marginTop: verticalScale(13),
      borderRadius: moderateScale(10),
    },
    input: {
      color: theme.text,
      maxWidth: "70%",
      height: verticalScale(25),
      borderRadius: 5,
      paddingLeft: 5,
      borderBottomWidth: 1,
      borderColor: theme.background,
      fontFamily: fontFamily,
    },
    btnSearch: {
      backgroundColor: theme.card,
      color: theme.text,
      textAlign: "center",
      width: horizontalScale(60),
      height: verticalScale(25),
      paddingTop: verticalScale(5),
      borderRadius: moderateScale(15),
    },
    textBtn: {
      color: theme.text,
      textAlign: "center",
    },
  });
