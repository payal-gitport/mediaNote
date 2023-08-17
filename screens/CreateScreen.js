import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { addNote } from "../store/noteSlice";
import WebView from "react-native-webview";
import TextEditorWebView from "../components/TextEditorWebView";
// import ImageViewer from "../components/ImageViewer";
// import PlaceholderImage from "../assets/images/bot.png";

const CreateScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const webViewRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaType, setMediaType] = useState(null);
  const [mediaUri, setMediaUri] = useState(null);

  // const handleMediaUpload = (type) => {
  //   const options = {
  //     mediaType: type,
  //   };
  //   launchImageLibrary(options, (response) => {
  //     if (!response.didCancel && !response.error) {
  //       setMediaType(type);
  //       setMediaUri(response.uri);
  //     }
  //   });
  // };

  // const pickImageAsync = async () => {
  //   console.log("In pickImageAsync");
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setSelectedImage(result.assets[0].uri);
  //     console.log(result);
  //   } else {
  //     alert("You did not select any image.");
  //   }
  // };
  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      console.log(imageUri);
      webViewRef.current.injectJavaScript(
        `addImage("https://download.samplelib.com/jpeg/sample-clouds-400x300.jpg")`
      );
    }
  };

  const handleSaveNote = () => {
    const timestamp = new Date().toISOString(); // Get the current timestamp
    const note = {
      title: title,
      content: content,
      mediaType: mediaType,
      mediaUri: mediaUri,
      timestamp: timestamp,
    };
    dispatch(addNote(note)); // Dispatch the addNote action
    navigation.goBack();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ flex: 1 }}>
        <TextEditorWebView />
      </View>
    </SafeAreaView>
  );
};

export default CreateScreen;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: 30,
  },
  topbarStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d3e3ed",
    borderRadius: 10,
  },
  input: {
    paddingHorizontal: 10,
    marginTop: 30,
    fontSize: 20,
  },
  bottomIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
  },
  iconStyle: {
    padding: 7,
    backgroundColor: "#d3e3ed",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    color: "#579BC3",
  },
});
