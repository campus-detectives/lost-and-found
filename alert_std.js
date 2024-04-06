import React from "react";
import { View, Text, StyleSheet } from "react-native";

const alert = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>only if minimum goal is reached</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Background color of the screen
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black", // Color of the text
  },
});

export default alert;
