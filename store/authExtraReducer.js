import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSuccess, logout } from "./authSlice";

export const LoginUser = () => {
  return async (dispatch) => {
    try {
      AsyncStorage.setItem("isLogged", "true");
      dispatch(loginSuccess());
    } catch (error) {
      console.log(error, "error in loginuser");
    }
  };
};

export const LogoutUser = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.clear();
      dispatch(logout());
    } catch (error) {
      console.log(error, "error in logoutuser");
    }
  };
};
