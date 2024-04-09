import React from "react";
import { LogBox } from "react-native";

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
import API from "./Api";
import CamTest from "./camTest";
import Search from "./Search";
import Uploading from "./Uploading";

const Stack = createNativeStackNavigator();

const initialScreen = "HomeScreen_student";

// LogBox.ignoreAllLogs();

export default function App() {
  const initialScreen = "Signin";

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
          name="Upload"
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
        <Stack.Screen
          name="CamTest"
          component={CamTest}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
          }}
        /><Stack.Screen
          name="Uploading"
          component={Uploading}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
