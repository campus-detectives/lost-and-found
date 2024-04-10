import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  Image,
  Pressable,
  FlatList,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import API from "./Api";

export default function HomeScreen_student({ route, navigation }) {
  const username = API.user.username.toUpperCase();

  const windowHeight = useWindowDimensions().height - 150;
  const [selecetdCat, setSelectedCat] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [lookout, setLookout] = useState([]);
  const [claimed, setClaimed] = useState(false);
  const [filtered_id, setFilter_id] = useState(null);
  useEffect(() => {
    API.getItems().then((res) => {
      if (res == null) {
        let temp = API.items;
        setLookout(temp);
      } else {
        console.log(res);
      }
    });
  }, []);
  const DisplayDataUrlAsImage = ({ dataUrl }) => {
    return <Image source={{ uri: dataUrl }} style={styles.row_icon} />;
  };

  fl = [];
  const renderItem = ({ item }) => {
    return (
      <>
        {(selectedPlace === null || selectedPlace === item.location) &&
        (selecetdCat === null || selecetdCat == item.category) &&
        (filtered_id === null || filtered_id.includes(item.id)) &&
        item.claimed === claimed ? (
          <View
            style={[
              styles.rows,
              {
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            <DisplayDataUrlAsImage
              dataUrl={item.image}
              style={styles.row_icon}
            />
            <View style={{ padding: 10 }}>
              <View>
                <Text style={{ color: "white" }}>Type: {item.category}</Text>
                <Text style={{ color: "white" }}>
                  Location: {item.location}
                </Text>
                <Text style={{ color: "white" }}>ID: {item.id}</Text>
              </View>
            </View>
          </View>
        ) : undefined}
      </>
    );
  };

  const filter = (SelectedCat, SelectedPlace, filtered_id) => {
    console.log({ SelectedCat });
    for (var i = 0; i < lookout.length; i++) {
      if (
        SelectedCat == lookout[i].category &&
        lookout[i].id in filtered_id &&
        SelectedPlace == lookout[i].location
      ) {
        fl.push(lookout[i]);
      }
    }

    console.log(fl);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar backgroundColor="#141e3c" />
      <View>
        <View style={styles.headerView}>
          <View>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.usernameText}>{username}</Text>
          </View>
          <View>
            <Pressable
              onPress={() => {
                API.signout();
              }}
            >
              <View style={styles.signoutButton}>
                <Text style={styles.signoutText}>Signout</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.buttons}>
          <Pressable
            onPress={() =>
              navigation.navigate("UploadScreen_student", {
                setSelectedCat,
                setSelectedPlace,
                filter,
                setFilter_id,
              })
            }
          >
            <View style={styles.innerButton}>
              <Text style={styles.innerButtonText}>FILTER</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Contest")}>
            <View style={styles.innerButton}>
              <Text style={styles.innerButtonText}>CONTEST</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              setClaimed(!claimed);
              console.log(claimed);
            }}
          >
            <View style={styles.innerButton}>
              <Text style={styles.innerButtonText}>
                {claimed ? <>UNCLAIMED</> : <>CLAIMED</>}
              </Text>
            </View>
          </Pressable>
        </View>

        <View
          style={{
            padding: 5,
            height: windowHeight,
          }}
        >
          <ScrollView>
            <FlatList
              data={lookout}
              renderItem={renderItem}
              scrollToEnd={true}
              style={{ flexGrow: 1 }}
            />
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141e3c",
  },
  rows: [
    {
      padding: 15,
      marginBottom: 7,
      margin: 2,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#0f0f0f",
    },
    {
      //shadowColor: "#d9f6f7",
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 3,
      elevation: 5,
    },
  ],
  row_icon: {
    height: 75,
    width: 75,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  headerView: [
    {
      borderColor: "white",
      borderBottomWidth: 0.5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#141e3c",
      elevation: 10,
    },
  ],
  welcomeText: {
    color: "#ffffff",
    fontSize: 20,
    textAlignVertical: "center",
    padding: 5,
    marginLeft: 10,
    fontWeight: "900",
  },
  usernameText: {
    color: "#ffffff",
    fontSize: 20,
    textAlignVertical: "center",
    paddingBottom: 10,
    paddingLeft: 10,
    marginLeft: 8,
    fontWeight: "900",
  },
  signoutButton: {
    borderWidth: 0.5,
    borderColor: "#2c2f33",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#610400",
  },
  buttons: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  signoutText: {
    color: "#fff",
  },
  innerButton: {
    height: 40,
    width: 120,
    padding: 5,
    borderRadius: 5,
    elevation: 50,
    backgroundColor: "#6b76d8",
  },
  innerButtonText: {
    color: "black",
    textAlign: "center",
    padding: 5,
  },
});
