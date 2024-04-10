import React from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import home_std from "./home_std";
import Signin from "./signin";
import Signup from "./signup";
import upload from "./upload";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="upload">
        <Stack.Screen name="Upload" component={upload} />
        <Stack.Screen name="Home" component={home_std} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="signin" component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b18",
  },
});
