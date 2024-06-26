import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  Image,
  Pressable,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import API from "./Api";

export default function HomeScreen_student({ route, navigation }) {
  const item = route.params.item;
  const setLookout = route.params.setLookout;
  const uri = item.image;
  const dataUrl = uri;
  const DisplayDataUrlAsImage = ({ dataUrl }) => {
    return (
      <Image
        source={{ uri: dataUrl }}
        style={{ width: "100%", height: "100%", borderRadius: 20 }}
      />
    );
  };
  const [regnum, onChangeRegNum] = React.useState("");

  const claim = () => {
    let itemData = {
      id: item.id,
      claimed_by: regnum,
    };
    API.claimItem(itemData).then((err) => {
      if (err !== null) {
        console.log(err);
      } else {
        API.refreshItems(setLookout);
        navigation.navigate("HomeScreen_watchman");
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141e3c" />
      <ScrollView style={{ flex: 1, padding: 5 }}>
        <View>
          <Text style={styles.header}>Claim</Text>
        </View>

        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: "#0f0f0f",
            borderRadius: 20,
            marginTop: 10,
            borderWidth: 2,
            justifyContent: "space-around",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: 30,
            paddingTop: 30,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "white",
              margin: 5,
              width: 300,
              height: 300,
              alignSelf: "center",
              borderRadius: 20,
            }}
          >
            <DisplayDataUrlAsImage
              dataUrl={dataUrl}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View>
              <Text style={[styles.lable, { marginTop: 5, marginBottom: -5 }]}>
                ID: {item.id}
              </Text>
            </View>
            <View style={{ marginLeft: 15, marginTop: 20 }}>
              <Text style={styles.lable}>Registration Number</Text>
              <TextInput
                style={[styles.input, { height: 40, width: 270 }]}
                onChangeText={onChangeRegNum}
                value={regnum}
              />
              <Pressable style={styles.button1} onPress={claim}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "white",
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
    backgroundColor: "#141e3c",
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
    backgroundColor: "white",
    color: "#6b76d8",
    borderColor: "#6b76d8",
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
    backgroundColor: "#6b76d8",
  },
  header: {
    color: "white",
    textAlign: "center",
    fontSize: 40,
    padding: 10,
  },
});
