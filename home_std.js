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

export default function HomeScreen_student({ route, navigation }) {
  const username = "heet"; /*API.user.username;*/
  const windowHeight = useWindowDimensions().height - 150;
  const [selecetdCat, setSelectedCat] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [lookout, setLookout] = useState([]);
  const [filtered_id, setFilter_id] = useState(null);
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
  /* id, found_time, found_by, location, category, image */
  const DisplayDataUrlAsImage = ({ dataUrl }) => {
    return <Image source={{ uri: dataUrl }} style={styles.row_icon} />;
  };
  /*const lookout = [
    //api end point //master list
    { itemID: 1, Cat: "Bottle", Place: "A Block" },
    { itemID: 2, Cat: "Bottle", Place: "A Block" },
    { itemID: 3, Cat: "Bottle", Place: "A Block" },
    { itemID: 4, Cat: "A5", Place: "A Block" },
    { itemID: 1, Cat: "A1", Place: "AB1" },
    { itemID: 1, Cat: "A6", Place: "B6" },
    { itemID: 1, Cat: "A7", Place: "B7" },
    { itemID: 1, Cat: "A3", Place: "B8" },
    { itemID: 1, Cat: "A2", Place: "B9" },
    { itemID: 1, Cat: "A10", Place: "B10" },
    { itemID: 1, Cat: "A11", Place: "B11" },
  ];*/
  //const [filtered_list, setFilteredList] = useState(lookout);
  fl = [];
  const renderItem = ({ item }) => (
    <>
      {(selectedPlace === null || selectedPlace === item.location) &&
      (selecetdCat === null || selecetdCat == item.category) &&
      (filtered_id === null || filtered_id.includes(item.id)) ? (
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
            <View>
              <Text>Type: {item.category}</Text>
              <Text>Location: {item.location}</Text>
              <Text>ID: {item.id}</Text>
            </View>
          </View>
        </View>
      ) : undefined}
    </>
  );

  const filter = (SelectedCat, SelectedPlace, filtered_id) => {
    console.log({ SelectedCat });
    for (var i = 0; i < lookout.length; i++) {
      if (
        SelectedCat == lookout[i].category &&
        lookout[i].id in filtered_id &&
        SelectedPlace == lookout[i].location
      ) {
        fl.push(lookout[i]);
      }
    }

    console.log(fl);
    //setFilteredList(fl);
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
                API.signout();
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
            onPress={() =>
              navigation.navigate("UploadScreen_student", {
                setSelectedCat,
                setSelectedPlace,
                filter,
                setFilter_id,
              })
            }
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
