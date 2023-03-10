import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

import { Colors } from "../../constants/colors";

function DeviceController({ deviceName }) {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn((prevState) => !prevState);

    // TODO: send POST request to server
  };

  return (
    <View style={styles.deviceContainer}>
      <Text style={styles.deviceNameText}>{deviceName}</Text>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>{isOn ? "On" : "Off"}</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isOn}
          trackColor={{ true: Colors.orangePrimary }}
        />
      </View>
    </View>
  );
}

export default DeviceController;

const styles = StyleSheet.create({
  deviceContainer: {
    backgroundColor: "white",
    width: "44%",
    margin: 10,
    borderRadius: 12,
    padding: 8,
    elevation: 4, // add shadow - android only
    shadowColor: "black", // add shadow - ios only
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  deviceNameText: {
    fontFamily: "be-vietnam",
    color: "rgba(30, 41, 51, 1)",
    fontSize: 18,
  },
  toggleText: {
    color: "#798794",
  },
});
