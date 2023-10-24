import { Image, StyleSheet } from "react-native";
import React from "react";

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 137,
    borderRadius: 18,
  },
});
