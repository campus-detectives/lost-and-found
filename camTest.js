import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

export default function App({ route, navigation }) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  const windowWidth = useWindowDimensions().width;
  const height = windowWidth * (4 / 3);

  const su = route.params.su;

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let ok = () => {
      //   shareAsync(photo.uri).then(() => {
      //     setPhoto(undefined);
      //   });
      su("data:image/jpg;base64," + photo.base64);
      navigation.navigate("Upload");
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        {/* <Button title="Share" onPress={sharePic} /> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View>
            <Pressable
              style={{
                height: 50,
                width: 100,
                borderWidth: 2,
                borderColor: "black",
                backgroundColor: "#ffbf00",
                bottom: 0,
                marginBottom: 10,
                borderRadius: 10,
                alignItems: "center",
                padding: 10,
              }}
              onPress={ok}
            >
              <View>
                <Text style={{ color: "white" }} t>
                  okay
                </Text>
              </View>
            </Pressable>
          </View>
          {/* {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={savePhoto} />
        ) : undefined} */}
          {/* <Button title="Discard" onPress={() => setPhoto(undefined)} /> */}
          <View>
            <Pressable
              style={{
                height: 50,
                width: 100,
                borderWidth: 2,
                borderColor: "black",
                backgroundColor: "#ffbf00",
                bottom: 0,
                marginBottom: 10,
                borderRadius: 10,
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => setPhoto(undefined)}
            >
              <View>
                <Text style={{ color: "white" }}>Again</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Camera
        style={{
          // flex: ,
          height: height,
          width: windowWidth,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          position: "absolute",
          top: "10%",
        }}
        ref={cameraRef}
      >
        {/* <Button title="Take Pic" onPress={takePic} /> */}

        <StatusBar style="auto" />
      </Camera>
      <Pressable
        style={{
          height: 100,
          width: 100,
          borderRadius: 50,
          borderWidth: 8,
          borderColor: "#d6e0e8",
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          marginBottom: 10,
          left: "40%",
        }}
        onPress={takePic}
      ></Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  //   buttonContainer: {
  //     backgroundColor: "#fff",
  //     alignSelf: "flex-end",
  //   },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
