import React from "react";
import { Text, View, Button } from "react-native";
import styles from "../theme/styles";

const UserScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the user screen</Text>
    </View>
  );
};

export default UserScreen;
