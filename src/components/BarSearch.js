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

import { colors, theme, fontFamily } from "../utils/desing";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../utils/metrics";

export default function BarSearch({ searchOrder }) {
  const [searchValue, setSearchValue] = useState("");
  const textInputRef = useRef(null);

  const handlePress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  return (
    <Pressable onPress={handlePress} style={{ position: "absolute", top: 50 }}>
      <View style={styles.container}>
        <Icon name="search" size={15} color={colors[theme].placeholder} />
        <TextInput
          placeholder="Numero de orden o nombre del cliente"
          placeholderTextColor={colors[theme].placeholder}
          style={styles.input}
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
          ref={textInputRef}
          onBlur={() => Keyboard.dismiss()}
        />
        <Pressable
          style={styles.btnSearch}
          onPress={() => searchOrder(searchValue)}>
          <Text style={styles.textBtn}>Buscar</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "93%",
    height: verticalScale(50),
    backgroundColor: colors[theme].input,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // paddingTop: verticalScale(2),
    // position: "absolute",
    // top: verticalScale(0),
    marginLeft: "5%",
    borderRadius: moderateScale(10),
  },
  title: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    fontSize: 32,
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    // backgroundColor: colors[theme].error,
    color: colors[theme].text,
    maxWidth: "70%",
    height: verticalScale(35),
    borderRadius: 5,
    paddingLeft: 5,
    // marginBottom: 25,
    borderBottomWidth: 1,
    borderColor: colors[theme].background,
    fontFamily: fontFamily,
  },
  btnSearch: {
    backgroundColor: colors[theme].card,
    color: colors[theme].text,
    textAlign: "center",
    width: horizontalScale(60),
    height: verticalScale(30),
    // marginHorizontal: horizontalScale(60),
    paddingTop: verticalScale(5),
    borderRadius: moderateScale(15),
    // marginTop: verticalScale(20),
  },
  textBtn: {
    color: colors[theme].text,
    textAlign: "center",
  },
});
