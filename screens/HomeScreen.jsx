import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import styles from "../theme/styles";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>This is the home screen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
