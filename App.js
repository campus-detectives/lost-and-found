import React from "react";
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
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen_student from "./home_std";
import Signin from "./signin";
import Signup from "./signup";
import Upload from "./upload";
import Alert from "./alert_std";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen_student">
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signin"
          component={Signin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeScreen_student"
          component={HomeScreen_student}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="upload"
          component={Upload}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="alert"
          component={alert}
          options={{
            headerShown: false,
          }}
        />
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
