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
import { addSeance } from "../api/SeanceApi";

export const CreateSeanceScreen = ({ navigation }) => {
  const [filmId, setFilmId] = useState("");
  const [salleId, setSalleId] = useState("");
  const [cinemaId, setCinemaId] = useState("");
  const date = new Date("1994-10-26");
  const [nbPlaceAchete, setNbPlaceAchete] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateSeance = () => {
    if (
      filmId !== "" &&
      salleId !== "" &&
      cinemaId !== "" &&
      date !== "" &&
      nbPlaceAchete !== ""
    ) {
      try {
        const seance = addSeance(
          filmId,
          salleId,
          cinemaId,
          date,
          nbPlaceAchete
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
      <Text style={styles.title}>Ajouter une séance</Text>
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
          <Text style={styleScreen.label}>Id du film</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setFilmId}
            value={filmId}
            keyboardType="numeric"
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Id de la salle</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setSalleId}
            value={salleId}
            keyboardType="numeric"
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Id du cinéma</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setCinemaId}
            value={cinemaId}
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Nombre de place achetée(s)</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setNbPlaceAchete}
            value={nbPlaceAchete}
            keyboardType="numeric"
          />
        </View>
      </View>
      <Button text="Ajouter" onPress={() => handleCreateSeance()} />

    </KeyboardAvoidingView>
  );
};

export default CreateSeanceScreen;

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
