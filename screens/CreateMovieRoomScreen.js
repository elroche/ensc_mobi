import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../theme/styles";
import Button from "../components/Button";
import { addMovieRoom } from "../api/MovieRoomApi";

const CreateMovieRoomScreen = ({ navigation }) => {
  const [cinemaId, setCinemaId] = useState("");
  const [nbPlace, setNbPlace] = useState("");
  const [numeroSalle, setNumeroSalle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateMovieRoom = async () => {
    if (cinemaId !== "" && nbPlace !== "" && numeroSalle !== "") {
      try {
        const parsedNbPlace = parseInt(nbPlace);
        const parsedNumeroSalle = parseInt(numeroSalle);
        const movieRoom = await addMovieRoom(
          cinemaId,
          parsedNbPlace,
          parsedNumeroSalle
        );
        console.log("Nouvelle salle créée:", movieRoom);
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
      <Text style={styles.title}>Ajouter une salle</Text>
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
      </View>
      <View style={styleScreen.inputContainer}>
        <Text style={styleScreen.label}>Id du cinéma</Text>
        <TextInput
          style={styleScreen.input}
          onChangeText={setCinemaId}
          value={cinemaId}
          keyboardType="numeric"
        />
      </View>
      <View style={styleScreen.inputContainer}>
        <Text style={styleScreen.label}>Nombre de place</Text>
        <TextInput
          style={styleScreen.input}
          onChangeText={setNbPlace}
          value={nbPlace}
          keyboardType="numeric"
        />

        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Numéro de la salle</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setNumeroSalle}
            value={numeroSalle}
            keyboardType="numeric"
          />
        </View>
      </View>
      <Button text="Ajouter" onPress={() => handleCreateMovieRoom()} />
    </KeyboardAvoidingView>
  );
};

export default CreateMovieRoomScreen;

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
