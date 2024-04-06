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

  const lostItemList = [
    //api end point
    { items: "A1", price: "B1", desc: "this is decription" },
    { items: "A2", price: "B2", desc: "this is decription" },
    { items: "A3", price: "B3", desc: "this is decription" },
    { items: "A5", price: "B4", desc: "this is decription" },
    { items: "A1", price: "B5", desc: "this is decription" },
    { items: "A6", price: "B6", desc: "this is decription" },
    { items: "A7", price: "B7", desc: "this is decription" },
    { items: "A3", price: "B8", desc: "this is decription" },
    { items: "A2", price: "B9", desc: "this is decription" },
    { items: "A10", price: "B10", desc: "this is decription" },
    { items: "A11", price: "B11", desc: "this is decription" },
  ];

  fl = [];

  const renderItem = ({ item }) => (
    <View style={styles.rows}>
      <DisplayDataUrlAsImage dataUrl={dataUrl} style={styles.row_icon} />
      <View style={{ padding: 10 }}>
        <Text>Type: {item.items}</Text>
        <Text>Description: {item.desc}</Text>
      </View>
    </View>
  );

  const filter = (itemValue) => {
    for (var i = 0; i < lookout.length; i++) {
      if (itemValue == lookout[i].items) {
        fl.push(lookout[i]);
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
            margin: 20,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("UploadScreen_student")}
          >
            <View
              style={{
                height: 40,
                width: 150,
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
          <Pressable onPress={() => navigation.navigate("Alert")}>
            <View
              style={{
                height: 40,
                width: 150,
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
            <Picker.Item label="Bottle" value="A1" />
            <Picker.Item label="pen" value="A2" />
            <Picker.Item label="Python" value="A3" />
            <Picker.Item label="C++" value="A4" />
            <Picker.Item label="Ruby" value="A5" />
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
});
