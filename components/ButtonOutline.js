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
    borderColor: "#CE2725",
    borderWidth: 1,
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.5,
    elevation: 3,
  },
  buttonText: {
    color: "#CE2725",
    fontWeight: "500",
    fontSize: 16,
  },
});
