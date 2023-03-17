import React from "react";
import { Text, View, Button } from "react-native";
import styles from "../theme/styles";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the home screen</Text>
     
    </View>
  );
};

export default HomeScreen;
