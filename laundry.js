import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
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

export default function Laundry({ navigation }) {
  const windowHeight = useWindowDimensions().height - 150;
  const [lookout, setLookout] = useState([]);
  const [claimed, setClaimed] = useState(false);
  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata([
      {
        category: "Shirt",
        location: 303,
        contact: 1234567890,
        claimed: false,
        claimed_by: "",
      },
      {
        category: "Pants",
        location: 304,
        contact: 1234567891,
        claimed: false,
        claimed_by: "",
      },
      {
        category: "Shirt",
        location: 303,
        contact: 1234567890,
        claimed: true,
        claimed_by: "John Doe",
      },
      {
        category: "Pants",
        location: 304,
        contact: 1234567891,
        claimed: true,
        claimed_by: "John Doe",
      },
    ]);
  }, []);

  fl = [];

  const renderItem = ({ item }) => (
    <>
      {item.claimed === claimed ? (
        <View
          style={[
            styles.rows,
            {
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <Image
            source={require("./assets/laundry.jpg")}
            style={styles.row_icon}
          />
          <View style={{ padding: 10 }}>
            <Text style={{ color: "white" }}>Type: {item.category}</Text>
            <Text style={{ color: "white" }}>Room: {item.location}</Text>
            <Text style={{ color: "white" }}>Contact: {item.contact}</Text>
            {claimed ? (
              <Text style={{ color: "white" }}>
                Claimed By: {item.claimed_by}
              </Text>
            ) : undefined}
          </View>
          {!claimed ? (
            <Pressable
              onPress={() => navigation.navigate("Claim", { item, setLookout })}
              style={{
                position: "absolute",
                right: 10,
              }}
            >
              <View style={styles.claim}>
                <Text style={{ color: "white" }}>Claim</Text>
              </View>
            </Pressable>
          ) : undefined}
        </View>
      ) : undefined}
    </>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar backgroundColor="#141e3c" />
      <View>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome</Text>
          </View>
          <View>
            <Pressable
              onPress={() => {
                API.signout();
              }}
            >
              <View style={styles.signoutButton}>
                <Text style={{ color: "white" }}>Signout</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View>
          <View style={styles.buttons}>
            <Pressable
              onPress={() => {
                navigation.navigate("HomeScreen_student");
              }}
              style={styles.innerButton2}
            >
              <Text style={styles.innerButtonText2}>Home</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.buttons}>
          <View>
            <Pressable onPress={() => {}}>
              <View style={styles.innerButton}>
                <Text style={styles.innerButtonText}>ADD ITEM</Text>
              </View>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => {
                setClaimed(!claimed);
                console.log(claimed);
              }}
            >
              <View style={styles.innerButton}>
                <Text style={styles.innerButtonText}>
                  {claimed ? <>CLAIMED</> : <>UNCLAIMED</>}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={{ padding: 5, alignItems: "center" }}>
        <View
          style={{
            padding: 5,
            height: "100%",
          }}
        >
          <ScrollView>
            <FlatList
              data={data}
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
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#0f0f0f",
      width: 390,
    },
    {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
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
  claim: {
    backgroundColor: "#6b76d8",
    padding: 10,
    width: 60,
    borderRadius: 10,
  },
  header: {
    borderColor: "white",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
  innerButton: {
    height: 40,
    width: 180,
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
  filter_id: {
    borderWidth: 1,
    borderColor: "#6b76d8",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    color: "#6b76d8",
    borderRadius: 14,
    height: 50,
    width: 300,
    margin: "auto",
    padding: 10,
  },
  innerButtonText2: {
    color: "black",
    textAlign: "center",
    padding: 5,
  },
  innerButton2: {
    height: 40,
    width: 385,
    padding: 5,
    borderRadius: 5,
    elevation: 50,
    backgroundColor: "#ffbf00",
  },
});
