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
  FlatList,
} from "react-native";

export default function HomeScreen_student({ navigation }) {
  const username = "";

  const menu = [
    //api end point
    { items: "A1", price: "B1" },
    { items: "A2", price: "B2" },
    { items: "A3", price: "B3" },
    { items: "A4", price: "B4" },
    { items: "A5", price: "B5" },
    { items: "A6", price: "B6" },
    { items: "A7", price: "B7" },
    { items: "A8", price: "B8" },
    { items: "A9", price: "B9" },
    { items: "A10", price: "B10" },
    { items: "A11", price: "B11" },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.rows}>
      <View style={{ padding: 10 }}>
        <Text>Name: {item.items}</Text>
        <Text>price: {item.price}</Text>
      </View>
    </View>
  );

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
              <Pressable onPress={() => navigation.navigate("upload")}>
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
            <View style={{ padding: 5, borderColor: "white", borderWidth: 1 }}>
              <FlatList
                data={menu}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                scrollToEnd={true}
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
              />
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
  rows: [
    {
      padding: 15,
      marginBottom: 7,
      margin: 2,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
    },
    {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
  ],
});
