import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import styles from "../theme/styles";
import Card from "../components/Card";

const MovieScreen = ({ navigation }) => {
  const onPressMovie = () => {
    navigation.navigate("Movie");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voici tous les films disponibles</Text>
      <View style={styleScreen.card}>
        <Card onPress={() => onPressMovie()} />
      </View>
    </View>
  );
};

const styleScreen = StyleSheet.create({
  card: { marginHorizontal: 30 },
});

export default MovieScreen;
