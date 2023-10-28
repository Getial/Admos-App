import React, { useState } from "react";
import { Pressable, Text, Image, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome5";

import IconButton from "../components/IconButton";
import CircleButton from "../components/CircleButton";
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from "../utils/metrics";
import { colors, theme, fontFamily } from "../utils/desing";
import EmojiPicker from "../components/EmojiPicker";
import EmojiList from "../components/EmojiList";

export default function EditEvidenceScreen({ navigation, route }) {
  const { img } = route.params;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const onReset = () => {
    // setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    setIsModalVisible(false);
  };

  const styleImg = () => {
    const ratio = img.width / img.height;
    if (ratio > 1) {
      return {
        width: horizontalScale(250 * ratio),
        height: verticalScale(250),
      };
    } else {
      return {
        width: horizontalScale(450 * ratio),
        height: verticalScale(450),
      };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={navigation.goBack} style={styles.buttonBack}>
        <Icon
          name="arrow-left"
          color={colors[theme].card}
          size={moderateScale(30)}
        />
      </Pressable>
      <Text style={styles.title}>Editar evidencia</Text>
      <Image source={{ uri: img.uri }} style={styleImg()} />
      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <IconButton icon="backspace" label="Borrar" onPress={onReset} />
          <CircleButton onPress={onAddSticker} />
          <IconButton icon="check" label="Guardar" onPress={onSaveImageAsync} />
        </View>
      </View>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[theme].background,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBack: {
    position: "absolute",
    top: verticalScale(60),
    left: horizontalScale(30),
  },
  title: {
    color: colors[theme].title,
    fontFamily: fontFamily,
    fontWeight: "bold",
    marginBottom: verticalScale(25),
    fontSize: moderateScale(28),
    position: "absolute",
    top: moderateScale(100),
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
