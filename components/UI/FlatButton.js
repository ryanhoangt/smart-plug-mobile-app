import { Pressable, Text, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function FlatButton({ children, onPress, style, fontSize, textAlign }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
      onPress={onPress}
    >
      <View>
        <Text
          style={[
            styles.buttonText,
            { fontSize: fontSize || 16, textAlign: textAlign || "center" },
          ]}
        >
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: Colors.orangePrimary,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans-bold",
  },
});
