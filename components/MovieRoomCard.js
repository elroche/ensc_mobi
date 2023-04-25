import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "../components/IconButton";


const MovieRoomCard = ({item, onEdit, onDelete }) => {

    return (
        <View style={styles.main}>
            <View style={styles.logoContainer}>
            <Image
              source={require("../assets/cinemas/salleCinema.webp")}
              style={styles.image}
            />
          </View>
            <View>
                <View style={styles.header}>
                    <View style={styles.cardText}>
                        <Text style={styles.cardTitle}>Salle {item.numeroSalle}</Text>
                    </View>
                </View>
                <Text style={styles.cardSubtitle}>Nombre de place:</Text>
                <Text style={styles.cardText}> {item.nbPlace}</Text>
            </View>
            <View>
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
        padding : 4,
        paddingLeft : 6,
        paddingRight : 8,
    },     
    cardText: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 4,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 4,
    },
    cardSubtitle: {
        fontSize: 16,
        color: "#555",
        paddingBottom: 5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    }, 
    logoContainer: {
      width: 100,
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      borderRadius: 6,
    },
});

export default MovieRoomCard;
