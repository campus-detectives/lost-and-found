import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import DropdownList from "./dropdown"; // assuming DropdownList is in the same directory
import Slider from "@react-native-community/slider";
import API from "./Api";
import * as FileSystem from "expo-file-system";

export default function upload({ route, navigation }) {
  const [photo, setPhoto] = useState(null);
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [threshold, setThreshold] = useState(60);
  const [uri, setUri] = useState(null);

  const SelectedCat = route.params.setSelectedCat;
  const SelectedPlace = route.params.setSelectedPlace;
  const filter = route.params.filter;
  const setFilter_id=route.params.setFilter_id;

  const handleSliderChange = (value) => {
    setThreshold(value);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    setUri(result.assets[0].uri);
    if (!result.canceled) {
      setPhoto(result.uri);
    }
  };

  const handleSubmit = () => {
    const getDataUri = async () => {
      if (uri == null) {
        return null;
      }
      console.log(uri);
      let base64Image = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      base64Image = "data:image/png;base64," + base64Image;
      return base64Image;
    };

    getDataUri().then((img) => {
      let filtered_id = null;
      if (img != null) {
        API.matchingItem(img).then(([res, err]) => {
          if (err == null) {
            filtered_id = res;
          } else {
            console.log(err);
          }
          console.log(filtered_id);
          console.log("Selected Cat:", selectedCat);
          console.log("Selected Place:", selectedPlace);
          console.log("Threshold:", threshold);
          SelectedCat(selectedCat);
          SelectedPlace(selectedPlace);
          setFilter_id(filtered_id);
          filter(selectedCat, selectedPlace, filtered_id);
          navigation.navigate("HomeScreen_student");
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.imagePicker}>
          <Text>Select a Photo</Text>
        </View>
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
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={selectedCat}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedCat(itemValue)}
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

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Set sensitivity threshold</Text>
        <Slider
          style={{
            width: 300,
            height: 40,
            borderWidth: 1,
            borderColor: "white",
          }}
          minimumValue={0}
          maximumValue={100}
          value={threshold}
          onValueChange={handleSliderChange}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor={`rgb(${255 - (threshold * 255) / 100}, ${
            (threshold * 255) / 100
          }, 0)`}
        />
        <Text>{threshold}</Text>
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
    backgroundColor: "#1a1a1a",
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#333333",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#262626",
    color: "#FFFFFF",
    borderRadius: 14,
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    width: 300,
    marginBottom: 20,
    backgroundColor: "#262626",
    color: "#FFFFFF",
    borderRadius: 14,
    height: 50,
  },
  picker: {
    height: 50,
    width: 300,
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  text: {
    color: "#FFFFFF",
  },
});
