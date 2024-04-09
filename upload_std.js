import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import Slider from "@react-native-community/slider";
import API from "./Api";
import * as FileSystem from "expo-file-system";

export default function upload({ route, navigation }) {
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [threshold, setThreshold] = useState(69);
  const [uri, setUri] = useState(null);

  const SelectedCat = route.params.setSelectedCat;
  const SelectedPlace = route.params.setSelectedPlace;
  const setFilter_id = route.params.setFilter_id;

  const handleSliderChange = (value) => {
    setThreshold(value.toFixed(0));
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
    if (uri != null) {
      navigation.navigate("Search")
      getDataUri().then((img) => {
        setFilter_id(null);
        if (img != null) {
          API.matchingItem(img, parseFloat(threshold)).then(([res, err]) => {
            let filtered_id = null;
            if (err == null) {
              filtered_id = res.match;
              if (filtered_id === null) {
                filtered_id = [];
              }
            } else {
              console.log(err);
            }
            console.log("f", filtered_id);

            setFilter_id(filtered_id);

            console.log("Selected Cat:", selectedCat);
            console.log("Selected Place:", selectedPlace);
            console.log("Threshold:", threshold);
            SelectedCat(selectedCat === "" ? null : selectedCat);
            SelectedPlace(selectedPlace === "" ? null : selectedPlace);

            navigation.navigate("HomeScreen_student");
          });
        }
      });
    } else {
      setFilter_id(null);
      console.log("Selected Cat:", selectedCat);
      console.log("Selected Place:", selectedPlace);
      console.log("Threshold:", threshold);
      SelectedCat(selectedCat === "" ? null : selectedCat);
      SelectedPlace(selectedPlace === "" ? null : selectedPlace);

      navigation.navigate("HomeScreen_student");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.imagePicker}>
          <Text>Select a Photo</Text>
        </View>
        {uri !== null ? (
          <Image style={styles.Image} source={{ uri: uri }} />
        ) : undefined}
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

      <View style={styles.sliderView}>
        <Text style={styles.sliderText}>Set sensitivity threshold</Text>
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
          thumbTintColor={`rgb(${255 - (threshold * 255) / 100}, ${(threshold * 255) / 100
            }, 0)`}
        />
        <Text style={styles.value}>{threshold}</Text>
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
    marginTop: 110,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#d9f6f7",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#d9f6f7",
    color: "#000",
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
    color: "#000",
  },
  button: {
    backgroundColor: "#6b76d8",
    padding: 10,
    borderRadius: 10,
    width: 150,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: "#FFFFFF",
  },
  Image: {
    height: 300,
    width: 300,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  sliderView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  sliderText: { color: "white", fontWeight: "bold", fontSize: 20 },
  value: { fontSize: 50, color: "white" },
});
