import React from "react";
import { Text, View, Button } from "react-native";
import styles from "../theme/styles";

const MovieScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the movie screen</Text>
    </View>
  );
};

export default MovieScreen;
