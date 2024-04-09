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

export default function HomeScreen_student({ navigation }) {
  const username = API.user.username;
  const windowHeight = useWindowDimensions().height - 150;
  const [lookout, setLookout] = useState([]);
  const [searchID, setSearchID] = useState("");
  const [length, setLength] = useState();
  const [claimed, setClaimed] = useState(false);
  API.lookout = setLookout;
  useEffect(() => {
    API.getItems().then((res) => {
      if (res == null) {
        let temp = API.items;
        setLookout(temp);
        setLength(lookout.length * 20 + windowHeight);
      } else {
        console.log(res);
      }
    });
  }, []);

  const DisplayDataUrlAsImage = ({ dataUrl }) => {
    return <Image source={{ uri: dataUrl }} style={styles.row_icon} />;
  };

  fl = [];

  const renderItem = ({ item }) => (
    <>
      {(item.id == searchID || searchID === "") && item.claimed === claimed ? (
        <View
          style={[
            styles.rows,
            {
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <DisplayDataUrlAsImage dataUrl={item.image} style={styles.row_icon} />
          <View style={{ padding: 10 }}>
            <Text style={{ color: "white" }}>Type: {item.category}</Text>
            <Text style={{ color: "white" }}>Loaction: {item.location}</Text>
            <Text style={{ color: "white" }}>ID: {item.id}</Text>
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
                <Text style={{ color: "white" }}>Signout</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.buttons}>
          <View>
            <Pressable
              onPress={() => navigation.navigate("Upload", { setLookout })}
            >
              <View style={styles.innerButton}>
                <Text style={styles.innnerButtonText}>ADD ITEM</Text>
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
                <Text style={styles.innnerButtonText}>
                  {claimed ? <>CLAIMED</> : <>UNCLAIMED</>}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={{ padding: 5, alignItems: "center" }}>
          <TextInput
            style={styles.filter_id}
            onChangeText={setSearchID}
            value={searchID}
            placeholder="Search Item ID"
            keyboardType="numeric"
            placeholderTextColor="#6b76d8"
          />
        </View>
        <View
          style={{
            padding: 5,
            height: length,
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
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  innerButton: {
    height: 50,
    width: 150,
    padding: 15,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "#6b76d8",
  },
  innnerButtonText: {
    color: "white",
    textAlign: "center",
    verticalAlign: "middle",
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
});
