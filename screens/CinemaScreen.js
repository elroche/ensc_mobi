import React from "react";
import { Text, View, Button } from "react-native";
import styles from "../theme/styles";

const CinemaScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the cinema screen</Text>
    </View>
  );
};

export default CinemaScreen;
