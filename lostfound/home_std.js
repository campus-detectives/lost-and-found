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

export default function home_std({ navigation }) {
  const username = "";
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <StatusBar backgroundColor="#5d2d33" />
          <View
            style={{ borderColor: "white", borderBottomWidth: 2, height: 50 }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                textAlignVertical: "center",
                padding: 10,
              }}
            >
              Welcome
            </Text>
            <View
              style={{
                margin: 20,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Pressable onPress={() => navigation.navigate("lookout")}>
                <View
                  style={{
                    height: 40,
                    width: 150,
                    borderColor: "white",
                    borderWidth: 2,
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: "#2d2d64",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      padding: 5,
                    }}
                  >
                    ADD LOOKOUT
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("alert")}>
                <View
                  style={{
                    height: 40,
                    width: 150,
                    borderColor: "white",
                    borderWidth: 2,
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: "#2d2d64",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      padding: 5,
                    }}
                  >
                    ALERTS
                  </Text>
                </View>
              </Pressable>
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
});
