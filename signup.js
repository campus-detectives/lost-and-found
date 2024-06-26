import React from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Pressable,
  Image,
} from "react-native";
import API from "./Api";

export default function Signup({ navigation }) {
  const [username, onChangeText] = React.useState("");
  const [regnum, onChangeRegNum] = React.useState("");
  const [password, onChangePass] = React.useState("");

  const onPressContinue = () => {
    if (regnum === password) {
      API.register(username, password).then((err) => {
        if (err !== null) {
          console.log(err);
        } else {
          navigation.navigate("Signin");
        }
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <StatusBar backgroundColor="#141e3c" />
          <View style={styles.center}>
            <View style={styles.box}>
              <Text style={styles.textSignup}>Sign up</Text>
              <View style={{ marginLeft: 15, marginTop: 0 }}>
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
                  onChangeText={onChangeRegNum}
                  value={regnum}
                />
                <Text style={styles.lable}>Confirm Password</Text>
                <TextInput
                  secureTextEntry={true}
                  style={[styles.input, { height: 40, width: 270 }]}
                  onChangeText={onChangePass}
                  value={password}
                />

                <Pressable style={styles.button1} onPress={onPressContinue}>
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
                  onPress={() => navigation.navigate("Signin")}
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
  logo: {
    width: 300,
    height: 300,
    borderRadius: 75,
    borderColor: "black",
    verticalAlign: "center",
    alignSelf: "center",
    marginTop: 220,
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 75,
    verticalAlign: "center",
    alignSelf: "center",
    marginTop: 220,
  },
  container: {
    flex: 1,
    backgroundColor: "#141e3c",
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
  box: {
    backgroundColor: "#0f0f0f",
    height: 450,
    width: 350,
    borderRadius: 20,
    marginTop: 0,
    borderWidth: 0,
    elevation: 10,
  },

  textSignup: {
    fontSize: 36,
    color: "white",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
  },
});
