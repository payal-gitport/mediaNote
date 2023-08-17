import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const CustomProfileTile = ({ title, icon, onPress }) => {
  return (
    <Pressable style={styles.mainContainer} onPress={onPress}>
      <Ionicons name={icon} size={32} color="black" style={styles.iconStyle} />
      <Text style={{ fontSize: 20 }}>{title}</Text>
    </Pressable>
  );
};

export default CustomProfileTile;

const styles = StyleSheet.create({
  mainContainer: {
    width: 360,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 10,
  },
  iconStyle: {
    paddingLeft: 20,
    paddingRight: 30,
    paddingVertical: 10,
  },
});
