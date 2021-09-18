import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CalculatorScreeen from "./screens/CalculatorScreeen";

export default function App() {
  return (
    <View style={styles.container}>
      <CalculatorScreeen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
