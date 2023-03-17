import React from "react";
import { Text, View, Button } from "react-native";
import styles from "../theme/styles";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the login screen</Text>
    </View>
  );
};

export default LoginScreen;
