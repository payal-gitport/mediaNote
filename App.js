import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Provider, useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TimerScreen from "./screens/TimerScreen";
import FeedScreen from "./screens/FeedScreen";
import CreateScreen from "./screens/CreateScreen";
import { Ionicons } from "@expo/vector-icons";
import store from "./store/store";
import TextEditor from "./screens/TextEditor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { loginSuccess } from "./store/authSlice";

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: "absolute", paddingTop: 10 },
      }}
    >
      <Tab.Screen
        name="Timer"
        component={TimerScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-list-sharp" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    const isLogged = await AsyncStorage.getItem("isLogged");
    isLogged ? dispatch(loginSuccess()) : null;
    console.log("isLogged", isLogged);
  };

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Create"
              component={CreateScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Editor"
              component={TextEditor}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //       <>
    //         <Stack.Screen
    //           name="Login"
    //           component={LoginScreen}
    //           options={{ headerShown: false }}
    //         />
    //       </>
    //       <>
    //         <Stack.Screen
    //           name="Home"
    //           component={HomeTabs}
    //           options={{ headerShown: false }}
    //         />
    //         <Stack.Screen
    //           name="Create"
    //           component={CreateScreen}
    //           options={{ headerShown: false }}
    //         />
    //       </>
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
