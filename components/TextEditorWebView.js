import React, { useRef, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
} from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
// import RNFetchBlob from "rn-fetch-blob";
// import RNFS from "react-native-fs";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { addNote } from "../store/noteSlice";

const TextEditorWebView = () => {
  const webViewRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editorContent, setEditorContent] = useState("");

  // console.log("editorContent", editorContent);
  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      console.log(imageUri);
      webViewRef.current.injectJavaScript(
        `addImage("https://img.freepik.com/premium-vector/job-exam-test-vector-illustration_138676-243.jpg")`
      );
    }
  };
  const handleAddVideo = async () => {
    webViewRef.current.injectJavaScript(
      `addVideo("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4")`
    );
  };
  const handleAddAudio = async () => {
    webViewRef.current.injectJavaScript(
      `addAudio("https://file-examples.com/storage/fe7bb0e37864d66f29c40ee/2017/11/file_example_MP3_700KB.mp3")`
    );
  };

  const handleMessage = (event) => {
    const receivedContent = event.nativeEvent.data;
    // const plainTextContent = receivedContent.replace(/<[^>]+>/g, "");
    // Replace block-level tags with a newline and then strip all HTML tags
    const plainTextContent = editorContent
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/?(div|p|h[1-6]|li|ul|ol)[^>]*>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .trim();

    console.log("Editor Plain Text Content:", plainTextContent);
    // Create a temporary DOM element to parse the HTML content
    console.log(receivedContent);
    // setEditorContent(receivedContent);

    try {
      const timestamp = new Date().toISOString();
      const note = {
        title: title,
        content: receivedContent,
        timestamp: timestamp,
      };
      dispatch(addNote(note));
      navigation.goBack();
    } catch (error) {
      console.error("Error getting content from WebView:", error);
    }
  };

  const handleSaveContent = async () => {
    const jsCode = await webViewRef.current.injectJavaScript(`buttonClicked()`);
    console.log("jsCode", jsCode);
    await webViewRef.current.injectJavaScript(jsCode);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbarStyle}>
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          onPress={handleBack}
        />
        <Pressable style={styles.saveButton} onPress={handleSaveContent}>
          <Text style={{ fontSize: 20, color: "#579BC3" }}>Save Content</Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.inputTitle}
        placeholder="Title"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />
      <WebView
        style={styles.input}
        ref={webViewRef}
        source={require("./richTextEditor.html")}
        javaScriptEnabled={true}
        originWhitelist={["*"]}
        onMessage={handleMessage}
      />
      <View style={styles.bottomIcons}>
        <Ionicons
          style={styles.iconStyle}
          name="image-outline"
          size={24}
          color="black"
          onPress={handleAddImage}
        />
        <Ionicons
          style={styles.iconStyle}
          name="videocam-outline"
          size={24}
          color="black"
          onPress={handleAddVideo}
        />
        <Ionicons
          style={styles.iconStyle}
          name="mic-outline"
          size={24}
          color="black"
          onPress={handleAddAudio}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  topbarStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  saveButton: {
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d3e3ed",
    borderRadius: 10,
  },
  bottomIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  inputTitle: {
    paddingHorizontal: 20,
    marginTop: 20,
    fontSize: 24,
  },
  input: {
    // paddingHorizontal: 10,
    marginTop: 20,
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

export default TextEditorWebView;
