import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CalcDisplay({ display = "" }) {
  const textSize =
    display.length <= 6
      ? styles.text_xl
      : display.length <= 9
      ? styles.text_md
      : styles.text_sm;

  return (
    <View style={[styles.container]}>
      <Text style={[styles.text, textSize]}>{display}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    textAlign: "right",
    color: "white",
  },
  text_sm: {
    fontSize: 40,
  },
  text_md: {
    fontSize: 55,
  },
  text_xl: {
    fontSize: 70,
  },
});
