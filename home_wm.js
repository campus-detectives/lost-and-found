import React, { useState, useEffect } from "react";
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
import API from "./Api";
// import { Picker } from "@react-native-community/picker";

export default function HomeScreen_student({ navigation }) {
  const username = "HEET BRIJESH JHAVERI";
  const windowHeight = useWindowDimensions().height - 150;
  const [filtered_list, setFilteredList] = useState([]);
  const [lookout, setLookout] = useState([]);
  const [searchID, setSearchID] = useState("");
  useEffect(() => {
    API.getItems().then((res) => {
      if (res == null) {
        let temp = API.items;
        setLookout(temp);
      } else {
        console.log(res);
      }
    });
  }, []);

  const dataUrl = ""; //demo uri

  const DisplayDataUrlAsImage = ({ dataUrl }) => {
    return <Image source={{ uri: dataUrl }} style={styles.row_icon} />;
  };

  // const lostItemList = [
  //   //api end point
  //   { items: "A1", price: "B1", desc: "this is decription" },
  //   { items: "A2", price: "B2", desc: "this is decription" },
  //   { items: "A3", price: "B3", desc: "this is decription" },
  //   { items: "A5", price: "B4", desc: "this is decription" },
  //   { items: "A1", price: "B5", desc: "this is decription" },
  //   { items: "A6", price: "B6", desc: "this is decription" },
  //   { items: "A7", price: "B7", desc: "this is decription" },
  //   { items: "A3", price: "B8", desc: "this is decription" },
  //   { items: "A2", price: "B9", desc: "this is decription" },
  //   { items: "A10", price: "B10", desc: "this is decription" },
  //   { items: "A11", price: "B11", desc: "this is decription" },
  // ];

  fl = [];

  const renderItem = ({ item }) => (
    <>
      {item.id == searchID || searchID === "" ? (
        <View
          style={[
            styles.rows,
            {
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <DisplayDataUrlAsImage dataUrl={item.image} style={styles.row_icon} />
          <View style={{ padding: 10 }}>
            <Text>Type: {item.category}</Text>
            <Text>Loaction: {item.location}</Text>
            <Text>ID: {item.id}</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Claim", { item })}
            style={{
              position: "absolute",
              right: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#ffbf00",
                padding: 10,
                width: 60,
                borderRadius: 10,
              }}
            >
              <Text>Claim</Text>
            </View>
          </Pressable>
        </View>
      ) : undefined}
    </>
  );

  const filter = (itemValue) => {
    for (var i = 0; i < lostItemList.length; i++) {
      if (itemValue == lostItemList[i].items) {
        fl.push(lostItemList[i]);
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
          <View>
            <Pressable onPress={() => navigation.navigate("Upload")}>
              <View
                style={{
                  height: 50,
                  width: 150,
                  padding: 15,
                  paddingLeft: 10,
                  borderRadius: 5,
                  backgroundColor: "#2d2d64",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  ADD ITEM
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={{ padding: 5, alignItems: "center" }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#FFFFFF",
              borderRadius: 5,
              marginBottom: 20,
              backgroundColor: "#262626",
              color: "#FFFFFF",
              borderRadius: 14,
              height: 50,
              width: 300,
              margin: "auto",
              padding: 10,
            }}
            onChangeText={setSearchID}
            value={searchID}
            placeholder="Search Item ID"
            placeholderTextColor="white"
            keyboardType="numeric"
          />
        </View>
        <View
          style={{
            padding: 5,
            height: windowHeight,
          }}
        >
          <ScrollView>
            <FlatList
              data={lookout}
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
  row_icon: { height: 75, width: 75, borderRadius: 10 },
});
