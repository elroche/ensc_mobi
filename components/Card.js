import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Button from "../components/Button";

const Card = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.main}>
        <View style={styles.cardHeader}>
          <Image
            source={require("../assets/cinemas/salleCinema.webp")}
            style={styles.image}
          />
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>
            Je suis ici, à l'hotel de ville
            lfiglhvberbvjhsbvjhsbfkhsdflkjhsdfkhjsdkjfh
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button text={"voir"} action={() => test()} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    marginHorizontal: 15,
  },
  cardText: {
    alignItems: "flex-start",
    paddingHorizontal: 12,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    borderRadius: 7,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#555",
  },
  buttonContainer: {
    alignItems: "flex-end",
    paddingHorizontal: 8,
  },
});

export default Card;
