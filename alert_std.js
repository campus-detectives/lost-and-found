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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

const alert = ({ navigation }) => {
  const username = "HEET BRIJESH JHAVERI";
  const windowHeight = useWindowDimensions().height - 150;

  const matchFound = [
    //api end point //price=>data uri
    { items: "A1", price: "B1", desc: "this is decription", place: "AB1" },
    { items: "A2", price: "B2", desc: "this is decription", place: "AB2" },
    { items: "A3", price: "B3", desc: "this is decription", place: "AB4" },
    { items: "A5", price: "B4", desc: "this is decription", place: "AB1" },
    { items: "A1", price: "B5", desc: "this is decription", place: "AB1" },
    { items: "A6", price: "B6", desc: "this is decription", place: "AB17" },
    { items: "A7", price: "B7", desc: "this is decription", place: "AB14" },
    { items: "A3", price: "B8", desc: "this is decription", place: "AB16" },
    { items: "A2", price: "B9", desc: "this is decription", place: "AB13" },
    { items: "A10", price: "B10", desc: "this is decription", place: "AB31" },
    { items: "A11", price: "B11", desc: "this is decription", place: "AB17" },
  ];

  const [selectedValue, setSelectedValue] = useState("Select a Category");
  const [filtered_list, setFilteredList] = useState([]);

  fl = [];

  const renderItem = ({ item }) => (
    <View style={styles.rows}>
      <View style={{ padding: 10 }}>
        <Text>Type: {item.items}</Text>
        <Text>Description: {item.desc}</Text>
      </View>
    </View>
  );

  const filter = (itemValue) => {
    for (var i = 0; i < matchFound.length; i++) {
      if (itemValue == matchFound[i].place) {
        fl.push(matchFound[i]);
      }
    }
    console.log(fl);
    setFilteredList(fl);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar backgroundColor="#5d2d33" />
      <View>
        <View
          style={{
            borderColor: "white",
            borderBottomWidth: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                textAlignVertical: "center",
                padding: 10,
              }}
            >
              Welcome,
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                textAlignVertical: "center",
                paddingBottom: 10,
                paddingLeft: 10,
              }}
            >
              {username}
            </Text>
          </View>
          <View>
            <Pressable
              onPress={() => {
                /*signout code*/
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "white",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white" }}>Signout</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#2d2d64",
            width: 160,
            height: 60,
            alignSelf: "center",
            marginBottom: 10,
            borderRadius: 10,
            marginTop:10
          }}
        >
          <Picker
            selectedValue={selectedValue}
            style={{
              height: 40,
              width: 140,
              color: "white",
              backgroundColor: "#2d2d64",
              borderRadius: 10,
            }}
            itemStyle={{
              fontSize: 70,
              color: "black", //styling the picker not working
            }}
            placeholder="language"
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue(itemValue);
              filter(itemValue);
            }}
          >
            <Picker.Item label="AB1" value="A1" />
            <Picker.Item label="AB2" value="A2" />
            <Picker.Item label="AB3" value="A3" />
            <Picker.Item label="AB4" value="A4" />
            <Picker.Item label="AB5" value="A5" />
          </Picker>
        </View>

        <View
          style={{
            padding: 5,
            height: windowHeight,
          }}
        >
          <ScrollView>
            <FlatList
              data={filtered_list}
              renderItem={renderItem}
              scrollToEnd={true}
              style={{ flexGrow: 1 }}
            />
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Background color of the screen
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black", // Color of the text
  },
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

export default alert;
