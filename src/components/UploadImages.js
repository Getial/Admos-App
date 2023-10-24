import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import { API_HOST } from "../utils/constants";
import { colors, theme } from "../utils/desing";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utils/metrics";

export default function UploadImages() {
  const [images, setImages] = useState([]);

  const handleChooseImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      let imgs = [];
      for (let image of result.assets) {
        imgs.push(image);
      }
      setImages(imgs);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append("image", {
        uri: image.uri,
        type: "image/jpeg",
        name: `imagex_${index}.jpg`,
      });
    });
    formData.append("order", 44);
    console.log(formData);

    try {
      const response = await axios.post(`${API_HOST}/evidences/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Aquí puedes hacer algo con la respuesta del servidor
      Alert.alert("Imágenes subidas con éxito", response.data.message);
    } catch (error) {
      console.error("Error al subir las imágenes", error);
      Alert.alert("Error", "Error al subir las imágenes");
    }
  };

  return (
    <View>
      <Button title="Seleccionar Imágenes" onPress={handleChooseImages} />

      <View style={styles.imagesContainer}>
        {images.map((image, index) => (
          <View>
            <Image
              key={index}
              source={{ uri: image.uri }}
              style={styles.image}
            />
            {/* <ActivityIndicator
              size="small"
              color={colors[theme].card}
              style={styles.checkItem}
            /> */}
          </View>
        ))}
      </View>

      <Button
        title="Subir Imágenes"
        onPress={handleUpload}
        disabled={images.length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imagesContainer: {
    width: "100%",
    // height: verticalScale(200),
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: horizontalScale(90),
    height: verticalScale(90),
    margin: moderateScale(5),
  },
  checkItem: {
    position: "absolute",
    top: verticalScale(40),
    left: horizontalScale(40),
  },
});
