import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import styles from "../theme/styles";
import Card from "../components/Card";

const CinemaScreen = ({ navigation }) => {
  const onPressCinema = () => {
    navigation.navigate("Cinema");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Les cinémas</Text>
      <Card onPress={() => onPressCinema()} />
    </View>
  );
};

export default CinemaScreen;
