import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import styles from "../theme/styles";
import Button from "../components/Button";
import { editMovieRoomApi } from "../api/MovieRoomApi";

const EditMovieRoomScreen = ({ navigation, route }) => {
  const { movieRoom } = route.params;
  const movieRoomId = movieRoom.id;
  const [cinemaId, setCinemaId] = useState(movieRoom.cinemaId.toString());
  const [nbPlace, setNbPlace] = useState(movieRoom.nbPlace.toString());
  const [numeroSalle, setNumeroSalle] = useState(movieRoom.numeroSalle.toString());
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditMovieRoom = async () => {
    if (nbPlace !== "") { // Vérifie que le champ nbPlace est rempli
      try {
        const movieRoom = await editMovieRoomApi(
          movieRoomId,
          cinemaId,
          nbPlace,
          numeroSalle
        ); // Édite la salle de cinéma avec les nouvelles informations
        navigation.goBack(); // Redirige l'utilisateur vers la page précédente
      } catch (error) {
        console.error(error); // Affiche une erreur en cas d'échec de l'édition
      }
    } else {
      setErrorMessage("Attention ! Veuillez remplir tous les champs."); // Affichage d'un message d'erreur si tous les champs ne sont pas remplis
      return;
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.main && styleScreen.container]}>
        <Text style={styles.title}>Modifier une salle</Text>
        <Text style={styles.text}>
          Pour modifier la salle, veuillez modifier les données suivantes :
        </Text>
        <View style={styleScreen.content}>
          {errorMessage ? (
            <Text
              style={{
                color: "red",
                textAlign: "center",
                fontSize: 16,
                paddingVertical: 10,
              }}
            >
              {errorMessage}
            </Text>
          ) : null}
          <View style={styleScreen.inputContainer}>
            <Text style={styleScreen.label}>Nombre de place : </Text>
            <TextInput
              style={styleScreen.input}
              onChangeText={setNbPlace}
              value={nbPlace}
              keyboardType="numeric"
            />
          </View>
        </View>
        <Button text="Modifier" onPress={() => handleEditMovieRoom()} />
      </View>
    </SafeAreaView>
  );
};

export default EditMovieRoomScreen;

const styleScreen = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  content: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "600",
    color: "#1F3976",
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
});
