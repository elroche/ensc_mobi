import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../components/Button";
import IconButton from "../components/IconButton";


const MovieRoomCard = ({item, onEdit, onDelete }) => {

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>Salle {item.numeroSalle}</Text>
                </View>
            </View>
            <Text style={styles.cardSubtitle}>Nombre de place:</Text>
            <Text style={styles.cardText}> {item.nbPlace}</Text>
            <View style={styles.buttonContainer}>
              <IconButton
                  onPress={() => onEdit()}
                  color="#1b69bc"
                  style={styles.deleteButton}
                >
                  <MaterialCommunityIcons name={"pencil"} size={20} color="white"/>
                </IconButton>
                <IconButton
                  onPress={() => onDelete()}
                  color="#ff0000"
                  style={styles.deleteButton}
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
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "stretch",
        marginTop: 10,
    },
    button: {
        marginRight: 5,
    },
    deleteButton: {
        marginLeft: 5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
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

export default MovieRoomCard;
