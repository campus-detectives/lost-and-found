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
    navigation.navigate("Uploading");
    API.addItem(itemData).then((err) => {
      if (err !== null) {
        console.log(err);
        navigation.navigate("Upload");
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
              height: 40,
              width: 150,
              color: "white",
              borderRadius: 5,
              marginBottom: 20,
              padding: 10,
              alignItems: "center",
              backgroundColor: "#ffbf00",
              borderRadius: 10,
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
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Bottle" value="Bottle" />
          <Picker.Item label="Pen" value="Pen" />
          <Picker.Item label="Earpods" value="Earpods" />
          <Picker.Item label="Laptop" value="Laptop" />
          <Picker.Item label="Charger" value="Charger" />
          <Picker.Item label="Phone" value="Phone" />
          <Picker.Item label="Pen/Pencil" value="Pen_pencil" />
          <Picker.Item label="Book" value="Book" />
          <Picker.Item label="Wallet" value="Wallet" />
          <Picker.Item label="Keys" value="Keys" />
          <Picker.Item label="Bag" value="Bag" />
          <Picker.Item label="ID Card" value="Id_card" />
          <Picker.Item label="Lunch Box" value="Lunch_box" />
          <Picker.Item label="Calculator" value="Calculator" />
          <Picker.Item label="Earphones" value="Earphones" />
          <Picker.Item label="Headphones" value="Headphones" />
          <Picker.Item label="Ear Rings" value="Ear_rings" />
          <Picker.Item label="Nose Rings" value="Nose_rings" />
          <Picker.Item label="Shoes" value="Shoes" />

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
    backgroundColor: "#141e3c",
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
    backgroundColor: "#d9f6f7", // Dark gray input container background
    color: "black", // White text
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
    color: "black", // White text
    borderRadius: 14,
    height: 50,
  },
  picker: {
    height: 50,
    width: 300,
    color: "black", // White text
  },
  button: {
    backgroundColor: "#6b76d8",
    padding: 10,
    borderRadius: 10,
    width: 150,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: "black", // White text
  },
});
