import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import styles from "../theme/styles";
import Button from "../components/Button";
import { editMovieRoomApi } from "../api/MovieRoomApi";

const EditMovieRoomScreen = ({ navigation, route }) => {
  const { movieRoom } = route.params;
  const movieRoomId = movieRoom.id;
  const [cinemaId, setCinemaId] = useState(movieRoom.cinemaId.toString());
  const [nbPlace, setNbPlace] = useState(movieRoom.nbPlace.toString());
  const [numeroSalle, setNumeroSalle] = useState(
    movieRoom.numeroSalle.toString()
  );

  const [errorMessage, setErrorMessage] = useState("");

  const handleEditMovieRoom = async () => {
    if (nbPlace !== "") {
      try {
        const movieRoom = await editMovieRoomApi(
          movieRoomId,
          cinemaId,
          nbPlace,
          numeroSalle
        );
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrorMessage("Attention ! Veuillez remplir tous les champs."); // Affichage d'un message d'erreur
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container && styleScreen.container}
      behavior="padding"
    >
      <Text style={styles.title}>Modifier une salle</Text>
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
          <Text style={styleScreen.label}>Nombre de place</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setNbPlace}
            value={nbPlace}
            keyboardType="numeric"
          />
        </View>
      </View>
      <Button text="Modifier" onPress={() => handleEditMovieRoom()} />
    </KeyboardAvoidingView>
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
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
});
