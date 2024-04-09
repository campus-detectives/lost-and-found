import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import API from "./Api";

export default function upload({ route, navigation }) {
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");

  const [uri, setUri] = useState(null);

  const handleSubmit = () => {
    console.log("Selected Item:", selectedItem);
    console.log("Selected Place:", selectedPlace);
    if (uri === null) {
      return;
    }
    let itemData = {
      image: uri,
      category: selectedItem,
      location: selectedPlace,
    };
    API.addItem(itemData).then((err) => {
      if (err !== null) {
        console.log(err);
      } else {
        API.refreshItems(API.lookout);
        navigation.navigate("HomeScreen_watchman");
      }
    });
  };

  return (
    <View style={styles.container}>
      {uri === null ? (
        <Pressable
          onPress={() =>
            navigation.navigate("CamTest", {
              su: setUri,
            })
          }
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "white",
              height: 40,
              width: 150,
              color: "white",
              borderRadius: 5,
              marginBottom: 10,
              padding: 10,
              alignItems: "center",
              backgroundColor: "#ffbf00",
            }}
          >
            <Text>Click Picture</Text>
          </View>
        </Pressable>
      ) : (
        <Image
          style={{
            height: 300,
            width: 300,
            marginBottom: 10,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "white",
          }}
          source={{ uri: uri }}
        />
      )}

      <View style={styles.inputContainer}>
        <Picker
          selectedValue={selectedItem}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Bottle" value="Bottle" />
          <Picker.Item label="pen" value="pen" />
          <Picker.Item label="earpods" value="earpods" />
          <Picker.Item label="laptop" value="laptop" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Picker
          selectedValue={selectedPlace}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedPlace(itemValue)}
        >
          <Picker.Item label="Select Place" value="" />
          <Picker.Item label="A Block" value="A Block" />
          <Picker.Item label="B Block" value="B Block" />
          <Picker.Item label="C Block" value="C Block" />
          <Picker.Item label="D Block" value="D Block" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1a1a1a", // Dark gray background
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: "#FFFFFF", // White border
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "#333333", // Dark gray image picker background
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#FFFFFF", // White border
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#262626", // Dark gray input container background
    color: "#FFFFFF", // White text
    borderRadius: 14,
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFFFFF", // White border
    borderRadius: 5,
    padding: 10,
    width: 300,
    marginBottom: 20,
    backgroundColor: "#262626", // Dark gray input background
    color: "#FFFFFF", // White text
    borderRadius: 14,
    height: 50,
  },
  picker: {
    height: 50,
    width: 300,
    color: "#FFFFFF", // White text
  },
  button: {
    backgroundColor: "#007BFF", // Blue button background
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF", // White button text
    fontWeight: "bold",
  },
  text: {
    color: "#FFFFFF", // White text
  },
});
