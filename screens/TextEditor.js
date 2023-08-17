import React, { useRef, useState } from "react";
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
// import ImagePicker from "react-native-image-crop-picker";

import * as ImagePicker from "expo-image-picker";
import ImgToBase64 from "react-native-image-base64";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const handleHead = ({ tintColor }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);

const TextEditor = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const richText = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const pickImage = async () => {
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 300,
    //   cropping: true,
    // }).then((image) => {
    //   console.log("Imagemime", image);
    //   this.onPressAddImage(image);
    // });
    await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    }).then((image) => {
      console.log("Imagemime", image);
      convertBase64(image);
    });
  };

  const convertBase64 = (image) => {
    ImgToBase64.getBase64String(image.path)
      .then((base64String) => {
        const str = `data:${image.mime};base64,${base64String}`;
        richText.current.insertImage(str);
      })
      .catch((err) => console.log("err:", err));
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
      <View style={styles.topbarStyle}>
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          onPress={handleBack}
        />
        <Pressable style={styles.saveButton} onPress={handleSaveNote}>
          <Text style={{ fontSize: 20, color: "#579BC3" }}>Save</Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          {/* <Text>Description:</Text> */}
          <RichEditor
            style={[styles.input, { flex: 1 }]}
            placeholder="Start typing... "
            multiline={true}
            numberOfLines={14}
            textAlignVertical={"top"}
            ref={richText}
            onChange={(descriptionText) => {
              console.log("descriptionText:", descriptionText);
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={{ position: "absolute", bottom: 0, padding: 20 }}>
        <RichToolbar
          editor={richText}
          actions={[actions.insertImage, actions.insertVideo]}
          onPressAddImage={() => {
            pickImage();
          }}
          iconMap={{ [actions.heading1]: handleHead }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TextEditor;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
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
