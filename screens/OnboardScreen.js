import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import FlatButton from "../components/UI/FlatButton.js";

function OnboardScreen() {
  const navigation = useNavigation();

  const getStartedHandler = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Onboard Screen</Text>
      <FlatButton onPress={getStartedHandler}>{"Get Started"}</FlatButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default OnboardScreen;
