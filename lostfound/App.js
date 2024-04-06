import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import DropdownList from './dropdown'; // assuming DropdownList is in the same directory


const items = [
  { label: 'Select Item', value: '' },
  { label: 'Earpods', value: 'earpods' },
  { label: 'Umbrella', value: 'umbrella' },
  { label: 'Stationary', value: 'stationary' },
];

const App = () => {
  const [photo, setPhoto] = useState(null);
  const [selectedItem, setSelectedItem] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const handleSubmit = () => {
    // Here you can handle the submission of the form data
    console.log("Photo:", photo);
    console.log("Selected Item:", selectedItem);
    console.log("Description:", description);
    console.log("Selected Place:", selectedPlace);
    // You can send the data to your backend or perform any other action
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.imagePicker}>
          {photo ? <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} /> : <Text style={styles.text}>Select Photo</Text>}
        </View>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <DropdownList items={items} index={-1}/>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Item Description"
        placeholderTextColor="#fff" 
        onChangeText={text => setDescription(text)}
        multiline
      />
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={selectedPlace}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedPlace(itemValue)}
        >
          <Picker.Item label="Select Place" value=""/>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#1a1a1a", // Dark gray background
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#FFFFFF', // White border
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#333333', // Dark gray image picker background
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#FFFFFF', // White border
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#262626', // Dark gray input container background
    color: '#FFFFFF', // White text
    borderRadius: 14,
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFFFFF', // White border
    borderRadius: 5,
    padding: 10,
    width: 300,
    marginBottom: 20,
    backgroundColor: '#262626', // Dark gray input background
    color: '#FFFFFF', // White text
    borderRadius: 14,
    height: 50,
  },
  picker: {
    height: 50,
    width: 300,
    color: '#FFFFFF', // White text
  },
  button: {
    backgroundColor: '#007BFF', // Blue button background
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF', // White button text
    fontWeight: 'bold',
  },
  text: {
    color: '#FFFFFF', // White text
  }
});


export default App;
