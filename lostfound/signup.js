import React from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  StatusBar,
  Image,
  onChangeText,
  Pressable,
} from "react-native";

export default function Signup({ navigation }) {
  const [username, onChangeText] = React.useState("");
  const [regnum, onChangeRegNum] = React.useState("");
  const [password, onChangePass] = React.useState("");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <StatusBar backgroundColor="#5d2d33" />

          <View style={styles.center}>
            {/* <Image
              style={[styles.logo, styles.h1]}
              source={require("../../assets/download.jpeg")}
            /> */}

            <Text
              style={{
                paddingTop: 3,
                fontSize: 36,
                color: "white",
              }}
            >
              Sign up
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
                <Text style={styles.lable}>Password</Text>
                <TextInput
                  style={[styles.input, { height: 40, width: 270 }]}
                  onChangeText={onChangeRegNum}
                  value={regnum}
                />
                <Text style={styles.lable}>Confirm Password</Text>
                <TextInput
                  style={[styles.input, { height: 40, width: 270 }]}
                  onChangeText={onChangePass}
                  value={password}
                />

                <Pressable style={styles.button1}>
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
                  
                  onPress={() => navigation.navigate("signin")}
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
                    Already Signed up? Sign in
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b18",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },

  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "black",
    borderWidth: 2,
  },

  center: {
    marginTop: "0%",
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
