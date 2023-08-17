import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const TimerScreen = () => {
  const [timer, setTimer] = useState(10 * 24 * 60 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Reset to 10 days
  const resetTimer = () => {
    setTimer(10 * 24 * 60 * 60);
  };

  // Add 1 day (24 hours)
  const addOneDay = () => {
    setTimer((prevTimer) => prevTimer + 24 * 60 * 60);
  };

  const getWeek = (seconds) => {
    const week = Math.floor(seconds / (7 * 24 * 60 * 60));
    return String(week).padStart(2, "0");
  };
  const getDays = (seconds) => {
    const days = Math.floor((seconds % (7 * 24 * 60 * 60)) / (24 * 60 * 60));
    return String(days).padStart(2, "0");
  };
  const formatTime = (seconds) => {
    if (seconds >= 7 * 24 * 60 * 60) {
      const weeks = Math.floor(seconds / (7 * 24 * 60 * 60));
      const days = Math.floor((seconds % (7 * 24 * 60 * 60)) / (24 * 60 * 60));
      return `${weeks} week${weeks > 1 ? "s" : ""}, ${days} day${
        days > 1 ? "s" : ""
      }`;
    } else if (seconds >= 24 * 60 * 60) {
      const days = Math.floor(seconds / (24 * 60 * 60));
      const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
      return `${days} day${days > 1 ? "s" : ""}, ${hours} hour${
        hours > 1 ? "s" : ""
      }`;
    } else if (seconds >= 60 * 60) {
      const hours = Math.floor(seconds / (60 * 60));
      const minutes = Math.floor((seconds % (60 * 60)) / 60);
      return `${hours} hour${hours > 1 ? "s" : ""}, ${minutes} minute${
        minutes > 1 ? "s" : ""
      }`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes} minute${
        minutes > 1 ? "s" : ""
      }, ${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <View style={styles.unitContainer}>
          <Text style={styles.timerText}>{getWeek(timer)}</Text>
          <Text style={styles.timerText}>{`Week${
            getWeek(timer) > 1 ? "s" : ""
          }`}</Text>
        </View>
        <View style={styles.unitContainer}>
          <Text style={styles.timerText}>{getDays(timer)}</Text>
          <Text style={styles.timerText}>{`Day${
            getDays(timer) > 1 ? "s" : ""
          }`}</Text>
        </View>
      </View>
      {/* <Text style={styles.timerText}>{formatTime(timer)}</Text> */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.resetContainer} onPress={resetTimer}>
          <Ionicons name="refresh" size={24} color="black" />
        </Pressable>
        <Pressable style={styles.plusContainer} onPress={addOneDay}>
          <Text style={{ fontSize: 20, color: "white" }}>+1</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  unitContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 20,
    marginBottom: 20,
  },
  resetContainer: {
    width: 100,
    height: 50,
    backgroundColor: "#e9e8e8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  plusContainer: {
    width: 100,
    height: 50,
    backgroundColor: "#579BC3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",

    width: "80%",
  },
});
