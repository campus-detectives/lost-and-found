import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const DropdownList = ({ items,index }) => {
  var [selectedItem, setSelectedItem] = useState('');

  selectedItem=items[index+1]["value"]

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedItem}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
      >
        {items.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    color: '#FFFFFF', // White text
    width: 300,
  },
});

export default DropdownList;
