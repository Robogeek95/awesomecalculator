import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CalcButton({
  onPress,
  label = "",
  color = "white",
  backgroundColor = "black",
  style = {},
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: backgroundColor }, style]}
    >
      <Text style={[styles.text, { color: color }]}>{label}</Text>
      {/* <View style={{ flex: 1, backgroundColor: "pink" }}></View> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 70,
    borderRadius: 35,
    margin: 8,
    flex: 1,
  },
  text: {
    fontSize: 30,
    // fontWeight: "bold",
  },
});
