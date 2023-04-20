import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const ButtonOutline = ({ text, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => onPress()} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonOutline;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    marginTop: 2,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
  },
  buttonText: {
    color: "red",
    fontWeight: "500",
    fontSize: 16,
  },
});
