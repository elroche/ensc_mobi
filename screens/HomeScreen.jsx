import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import styles from "../theme/styles";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Les derniers films à l'affiche</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
