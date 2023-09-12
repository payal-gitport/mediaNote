import { Image, StyleSheet } from "react-native";

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;

  //TODO:update it now
  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    borderRadius: 18,
  },
});
