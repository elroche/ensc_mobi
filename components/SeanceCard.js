import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/fr";
import IconButton from "../components/IconButton";

const SeanceCard = ({ item }) => {
  const date = moment(item.date).locale("fr");
  const formattedDate = date.format("DD/MM/YYYY à HH[h]mm");

  return (
    <View style={styles.main}>
      <View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/seances/seance.jpg")}
            style={styles.image}
          />
        </View>
        </View>
        <View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{item.film.nom}</Text>
          <Text style={styles.cardSubtitle}>Salle {item.salle.numeroSalle}</Text>
          <Text style={styles.cardSubtitle}>Le {formattedDate}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <IconButton
          onPress={() => onEdit()}
          color="#1b69bc"
        >
          <MaterialCommunityIcons name={"pencil"} size={20} color="white"/>
        </IconButton>
        <IconButton
          onPress={() => onDelete()}
          color="#CE2725"
        >
          <MaterialCommunityIcons name={"trash-can"} size={20} color="white"/>
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
    shadowColor: "#808080",
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
    paddingHorizontal : 2,
    paddingRight : 4,
    paddingVertical : 4,
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
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
    marginTop: 4,
    width : 168,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#555",
    paddingBottom: 15,
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

export default SeanceCard;
