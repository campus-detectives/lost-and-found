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
import UploadScreen_student from "./upload_std";
import HomeScreen_watchman from "./home_wm";
import Claim from "./claim";

const Stack = createNativeStackNavigator();

const initialScreen = "HomeScreen_student";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialScreen}>
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signin"
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
          name="Alert"
          component={Alert}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UploadScreen_student"
          component={UploadScreen_student}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Claim"
          component={Claim}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeScreen_watchman"
          component={HomeScreen_watchman}
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
