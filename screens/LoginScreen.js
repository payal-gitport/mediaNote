import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { loginSuccess } from "../store/authSlice";
import { LoginUser } from "../store/authExtraReducer";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);

  //change the password security on icon click
  function secureHandler() {
    setIsSecure(!isSecure);
  }

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Both email and password are required.");
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Validation Error",
        "Password must have at least 7 characters, 1 special character, 1 alphanumeric, 1 uppercase, and 1 lowercase letter."
      );
      return;
    }
    // Navigate to home screen if valid
    console.log("on press login");
    dispatch(LoginUser());
  };

  return (
    <View style={{ flex: 1, marginTop: 200, alignItems: "center" }}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, alignItems: "center" }}
        >
          <Text style={styles.titleText}>Log In</Text>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              placeholder="E-mail"
              placeholderTextColor="#a3a4a4"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                height: 60,
                fontSize: 18,
                width: 350,
                marginVertical: 10,
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#a3a4a4"
              secureTextEntry={isSecure}
              autoCapitalize="none"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                height: 60,
                fontSize: 18,
                width: 330,
                marginVertical: 10,
              }}
            />
            <Ionicons
              name={isSecure ? "eye" : "eye-off"}
              size={20}
              color={"black"}
              onPress={secureHandler}
            />
          </View>
          <Pressable style={styles.buttonStyle} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 32,
    color: "#579BC3",
    fontWeight: "700",
  },
  inputContainer: {
    backgroundColor: "#e9e8e8",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "#579BC3",
    borderRadius: 10,
    height: 48,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
