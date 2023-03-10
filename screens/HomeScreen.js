import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import FlatButton from "../components/UI/FlatButton";

const avatarPlaceholderImg = require("../assets/images/avatar-placeholder.jpg");

function HomeScreen() {
  return (
    <View style={styles.homeContainer}>
      <StatusBar style="auto" />
      <View style={styles.welcomeHeading}>
        <View>
          <Text>MARCH 1, 2023</Text>
          <Text>Welcome, Hoang!</Text>
        </View>
        <Image source={avatarPlaceholderImg} style={styles.avatarImg} />
      </View>
      <View style={styles.scenariosContainer}>
        <Text>Scenarios</Text>
        <FlatButton style={styles.scenarioBtn}>Go out</FlatButton>
        <FlatButton style={styles.scenarioBtn}>Morning</FlatButton>
      </View>
      <View style={styles.devicesContainer}>
        <Text>Devices</Text>
        <Text>
          To add a new device, please manually connect it to the central server.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  welcomeHeading: {
    backgroundColor: "green",
  },
  scenariosContainer: {
    backgroundColor: "orange",
  },
  devicesContainer: {
    backgroundColor: "red",
  },
  avatarImg: {
    width: 50,
    height: 50,
  },
  scenarioBtn: {
    backgroundColor: "blue",
  },
});

export default HomeScreen;
