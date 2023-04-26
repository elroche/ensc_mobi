import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CinemaCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.main}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/cinemas/cinema.jpg")}
              style={styles.image}
            />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{item.nom}</Text>
            <Text style={styles.cardSubtitle} numberOfLines={3}>
              à {item.ville}
            </Text>
          </View>
          <View>
            <MaterialCommunityIcons name="chevron-right" size={25} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#c0c0c0",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.5,
    elevation: 3,
  },
  cardText: {
    alignItems: "flex-start",
    paddingHorizontal: 12,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 6,
    marginLeft: 2,
    marginVertical: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
    marginTop: 4,
    color:"#1F3976"
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#555",
    paddingBottom: 15,
  },
  buttonContainer: {
    alignItems: "flex-end",
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
  },
  logoContainer: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginRight: 5,
  },
});

export default CinemaCard;
