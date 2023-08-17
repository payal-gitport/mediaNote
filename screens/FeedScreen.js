import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { LongText } from "../util/util";

const FeedScreen = () => {
  const navigation = useNavigation();
  const userNotes = useSelector((state) => state.notes.userNotes);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleTimeString()}   ${date.toLocaleDateString()}`;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.titleText}>Notes</Text>
      <ScrollView style={styles.scrollContainer}>
        {userNotes.map((note, index) => (
          <View key={index} style={styles.noteContainer}>
            <LongText
              style={styles.noteTitle}
              text={note.title}
              textLength={note.title.length}
              maxLength={35}
            />
            <LongText
              style={styles.noteContent}
              text={note.content}
              textLength={note.content.length}
              maxLength={60}
            />
            <Text style={styles.noteTimestamp}>
              {formatTimestamp(note.timestamp)}
            </Text>
          </View>
        ))}
      </ScrollView>
      <Pressable
        style={styles.newButton}
        onPress={() => navigation.navigate("Create")}
      >
        <Text style={{ fontSize: 24, color: "white", fontWeight: "500" }}>
          + New
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 20,
    marginHorizontal: 30,
    paddingTop: 20,
  },
  titleText: {
    fontSize: 20,
    paddingLeft: 10,
    paddingBottom: 20,
  },
  newButton: {
    position: "absolute",
    bottom: 100,
    right: 0,
    padding: 10,
    margin: 10,
    backgroundColor: "#579BC3",
    width: 120,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  noteContainer: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "white",
  },
  noteTitle: {
    fontWeight: "600",
    marginBottom: 10,
  },
  noteContent: {
    marginBottom: 10,
  },
  noteTimestamp: {
    fontSize: 10,
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
});
