import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const IconButton = ({ children, onPress, color }) => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => onPress()}
          style={[styles.button, { backgroundColor: color }]}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  };

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
      width: "45%",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: "100%",
      padding: 15,
      marginTop: 2,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontWeight: "500",
      fontSize: 16,
    },
  });