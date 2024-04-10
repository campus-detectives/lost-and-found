import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Image,
} from "react-native";
import API from "./Api";

export default function Introduction({ navigation }) {
  const delay = (n) => new Promise((r) => setTimeout(r, n));
  const delay_navigation = async () => {
    await delay(2000);
    navigation.navigate("Signin");
  };
  delay_navigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141e3c" />
      <Image source={require("./assets/logo.png")} style={styles.logo} />
      <Text style={styles.footerText}>VITrace</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
    backgroundColor: "#141e3c",
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 75,
    borderColor: "black",
    verticalAlign: "center",
    alignSelf: "center",
    marginTop: 220,
  },

  center: {
    paddingTop: "40%",
    alignItems: "center",
    backgroundColor: "#141e3c",
  },

  h1: {
    paddingTop: 10,
    alignItems: "center",
  },

  input: {
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#d9f6f7",
    color: "#23272a",
    marginLeft: 25,
  },
  lable: {
    fontSize: 18,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingRight: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  button1: {
    width: 270,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#6b76d8",
    marginTop: 12,
    justifyContent: "center",
    marginLeft: 25,
  },
  sav: {
    flex: 1,
    justifyContent: "space-around",
  },
  textSignin: {
    fontSize: 36,
    color: "white",
    textAlign: "center",
    marginTop: 30,
  },
  box: {
    backgroundColor: "#0f0f0f",
    height: 400,
    width: 350,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 0,
    elevation: 10,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  footerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
    paddingRight: 10,
    marginTop: -100,
  },
});
