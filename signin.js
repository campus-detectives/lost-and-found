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
} from "react-native";
import API from "./Api";

export default function Signin({ navigation }) {
  API.SigninCallback = (signedin) => {
    if (signedin) {
      if (API.user.is_guard) {
        navigation.navigate("HomeScreen_watchman");
      } else {
        navigation.navigate("HomeScreen_student");
      }
    } else {
      navigation.navigate("Signin");
    }
  };

  const [username, onChangeText] = React.useState("Heet");
  const [password, onChangePass] = React.useState("Heetheet");

  const verify = () => {
    API.signin(username, password).then((err) => {
      console.log(err);
    });
  };
  //verify();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: "#141e3c",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <SafeAreaView style={styles.sav}>
            <StatusBar backgroundColor="#141e3c" />

            <View style={[styles.center, styles.h1]}>
              <View style={styles.box}>
                <Text style={styles.textSignin}>Sign in</Text>
                <View style={{ marginLeft: 15, marginTop: 20 }}>
                  <Text style={styles.lable}>Username</Text>
                  <TextInput
                    style={[styles.input, { height: 40, width: 270 }]}
                    onChangeText={onChangeText}
                    value={username}
                  />
                  <Text style={styles.lable}>Password</Text>
                  <TextInput
                    secureTextEntry={true}
                    style={[styles.input, { height: 40, width: 270 }]}
                    onChangeText={onChangePass}
                    value={password}
                  />

                  <Pressable style={styles.button1} onPress={verify}>
                    <Text style={styles.buttonText}>Continue</Text>
                  </Pressable>

                  <Pressable
                    style={{ marginTop: 15 }}
                    onPress={() => navigation.navigate("Signup")}
                  >
                    <Text style={styles.footerText}>
                      Not Signed up? Sign up
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },

  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "black",
    borderWidth: 2,
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
    fontSize: 15,
    paddingRight: 10,
  },
});
