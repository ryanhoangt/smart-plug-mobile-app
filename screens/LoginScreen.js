import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

function LoginScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Login Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
