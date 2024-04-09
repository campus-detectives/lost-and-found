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
} from "react-native";
import API from "./Api";

export default function Signup({ navigation }) {
  const [claimedItem, onChangeText] = React.useState("");
  const [regNum, onChangeRegNum] = React.useState("");

  const onPressContinue = () => {
    alert("Contest Raised");

    const claim = {
      id: claimedItem,
      contested_by: regNum,
    };
    /* API.contestClaim(claim).then((err) => {
      if (err !== null) {
        console.log(err);
      }
    });*/

    navigation.navigate("HomeScreen_student");
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
              <Text style={styles.textSignup}>Raise Contest</Text>
              <View style={{ marginLeft: 15, marginTop: 0 }}>
                <Text style={styles.lable}>ID of the Claimed Item:</Text>
                <TextInput
                  style={[styles.input, { height: 40, width: 270 }]}
                  onChangeText={onChangeText}
                  value={claimedItem}
                />
                <Text style={styles.lable}>Your Registration:</Text>
                <TextInput
                  secureTextEntry={true}
                  style={[styles.input, { height: 40, width: 270 }]}
                  onChangeText={onChangeRegNum}
                  value={regNum}
                />

                <Pressable style={styles.button1} onPress={onPressContinue}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    Submit
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
    height: 350,
    width: 350,
    borderRadius: 20,
    marginTop: -100,
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
