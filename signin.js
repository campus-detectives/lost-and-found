import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  useWindowDimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import API from "./Api";

export default function Signin({ navigation }) {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const windowFontScale = useWindowDimensions().fontScale;
  const windowScale = useWindowDimensions().scale;
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

  const [username, onChangeText] = React.useState("Amal");
  const [regnum, onChangeRegNum] = React.useState("");
  const [password, onChangePass] = React.useState("Amalamal");

  const verify = () => {
    API.signin(username, password).then((err) => {
      console.log(err);
    });
  };
  verify();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: "#0b0b18",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <SafeAreaView tyle={{ flex: 1, justifyContent: "space-around" }}>
            <StatusBar backgroundColor="#5d2d33" />

            <View style={[styles.center, styles.h1]}>
              {/* <Image
                style={styles.logo}
                source={require("../../assets/download.jpeg")}
              /> */}

              <Text
                style={{
                  fontSize: 36,
                  color: "white",
                }}
              >
                Sign in
              </Text>
              <View
                style={{
                  backgroundColor: "#2d2d64",
                  height: 355,
                  width: 300,
                  borderRadius: 20,
                  marginTop: 10,
                  borderWidth: 2,
                }}
              >
                <View style={{ marginLeft: 15, marginTop: 20 }}>
                  <Text style={styles.lable}>Username</Text>
                  <TextInput
                    style={[styles.input, { height: 40, width: 270 }]}
                    onChangeText={onChangeText}
                    value={username}
                  />
                  <Text style={styles.lable}>Registration Number</Text>
                  <TextInput
                    style={[styles.input, { height: 40, width: 270 }]}
                    onChangeText={onChangeRegNum}
                    value={regnum}
                  />
                  <Text style={styles.lable}>Password</Text>
                  <TextInput
                    style={[styles.input, { height: 40, width: 270 }]}
                    onChangeText={onChangePass}
                    value={password}
                  />

                  <Pressable style={styles.button1} onPress={verify}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 15,
                      }}
                    >
                      Continue
                    </Text>
                  </Pressable>

                  <Pressable
                    style={{ marginTop: 15 }}
                    onPress={() => navigation.navigate("Signup")}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 15,
                        paddingRight: 10,
                      }}
                    >
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
    backgroundColor: "#0b0b18",
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
    backgroundColor: "#262626",
    color: "white",
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
    backgroundColor: "#ffbf00",
    marginTop: 12,
    justifyContent: "center",
  },
});
