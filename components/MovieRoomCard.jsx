import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "./IconButton";

const MovieRoomCard = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles.main}>
      <View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/cinemas/salleCinema.webp")}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>Salle {item.numeroSalle}</Text>
        <Text style={styles.cardSubtitle}>
          Nombre de place : {item.nbPlace}
        </Text>
      </View>
      <View>
        <IconButton onPress={() => onEdit()} color="#1F3976">
          <MaterialCommunityIcons name={"pencil"} size={20} color="white" />
        </IconButton>
        <IconButton onPress={() => onDelete()} color="#CE2725">
          <MaterialCommunityIcons name={"trash-can"} size={20} color="white" />
        </IconButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#c0c0c0",
    shadowColor: "#1F3976",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.5,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    paddingRight: 4,
    paddingVertical: 4,
    marginHorizontal: 10,
  },
  cardText: {
    alignItems: "flex-start",
    paddingHorizontal: 12,
    flex: 1,
    flexDirection: "column",
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
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 4,
    marginTop: 4,
    marginBottom: 10,
    width: 168,
    color: "#1F3976",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
    paddingBottom: 15,
  },
  logoContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginRight: 5,
  },
});

export default MovieRoomCard;
