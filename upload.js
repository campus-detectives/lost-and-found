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

import * as ImagePicker from "expo-image-picker";
import DropdownList from "./dropdown"; // assuming DropdownList is in the same directory
import API from "./Api";

// const items = [
//   { label: "Select Item", value: "" },
//   { label: "Earpods", value: "earpods" },
//   { label: "Umbrella", value: "umbrella" },
//   { label: "Stationary", value: "stationary" },
// ];

export default function upload({ navigation }) {
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");

  const [uri, setUri] = useState(null);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     setPhoto(result.uri);
  //   }
  // };

  const handleSubmit = () => {
    // Here you can handle the submission of the form data
    console.log("Photo:", photo);
    console.log("Selected Item:", selectedItem);
    console.log("Description:", description);
    console.log("Selected Place:", selectedPlace);
    // TODO
    // uri !=null
    // category selected
    // location selected
    // otherwise dont add item but show error
    let itemData = {
      image: uri,
      category: selectedItem,
      location: selectedPlace,
    };
    API.addItem(itemData).then((err) => {
      if (err !== null) {
        console.log(err);
      } else {
        navigation.navigate("HomeScreen_watchman");
      }
    });
    // You can send the data to your backend or perform any other action
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
          selectedValue={selectedPlace}
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
