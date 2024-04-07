import React, { useState } from "react";
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
  useWindowDimensions,
  ScrollView,
  DisplayDataUrlAsImage,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
// import { Picker } from "@react-native-community/picker";

export default function HomeScreen_student({ navigation }) {
  const username = "HEET BRIJESH JHAVERI";
  const windowHeight = useWindowDimensions().height - 150;
  const [selectedValue, setSelectedValue] = useState("Select a Category");
  const [filtered_list, setFilteredList] = useState([]);

  const dataUrl = ""; //demo uri

  const DisplayDataUrlAsImage = ({ dataUrl }) => {
    return (
      <Image source={{ uri: dataUrl }} style={{ width: 55, height: 55 }} />
    );
  };

  const [regname, onChangeRegName] = React.useState("");
  const [regnum, onChangeRegNum] = React.useState("");

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5d2d33" />
      <ScrollView style={{ flex: 1, padding: 5 }}>
        <View>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 40,
              padding: 10,
            }}
          >
            Register
          </Text>
        </View>

        <View
          style={{
            borderWidth: 2,
            borderColor: "white",
            margin: 5,
            width: 300,
            height: 300,
            alignSelf: "center",
          }}
        >
          <DisplayDataUrlAsImage
            dataUrl={dataUrl}
            style={{ width: 500, height: 500 }}
          />
        </View>

        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: "#2d2d64",
            borderRadius: 20,
            marginTop: 10,
            borderWidth: 2,
            justifyContent: "space-around",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: 30,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={{ marginLeft: 15, marginTop: 20 }}>
              <Text style={styles.lable}>Registration Name</Text>
              <TextInput
                style={[styles.input, { height: 40, width: 270 }]}
                onChangeText={onChangeRegName}
                value={regname}
              />
              <Text style={styles.lable}>Registration Number</Text>
              <TextInput
                style={[styles.input, { height: 40, width: 270 }]}
                onChangeText={onChangeRegNum}
                value={regnum}
              />
              <Pressable style={styles.button1}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  Claim
                </Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
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
  row_icon: { height: 55, width: 55, borderRadius: 10 },
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
  input: {
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#262626",
    color: "white",
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