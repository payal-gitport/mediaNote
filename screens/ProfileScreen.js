import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../store/authSlice";
import CustomProfileTile from "../components/CustomProfileTile";
import { LogoutUser } from "../store/authExtraReducer";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    dispatch(LogoutUser());
    // await AsyncStorage.clear();
    // navigation.replace("LoginScreen");
  };

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>My Account</Text>
        <View>
          <CustomProfileTile
            title={"Change Password"}
            icon={"lock-closed-outline"}
            onPress={() => {}}
          />
          <CustomProfileTile
            title={"Delete all the notes"}
            icon={"trash"}
            onPress={() => {}}
          />
          <CustomProfileTile
            title={"Change Time"}
            icon={"time-outline"}
            onPress={() => {}}
          />
          <CustomProfileTile
            title={"Log Out"}
            icon={"log-out-outline"}
            onPress={handleLogout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 30,
  },
});
