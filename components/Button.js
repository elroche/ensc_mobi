import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({ text, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => onPress()} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1b69bc",
    width: "100%",
    padding: 15,
    marginTop: 2,
    borderRadius: 8,
    alignItems: "center",
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
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
