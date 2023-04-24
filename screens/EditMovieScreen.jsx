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
import { GENRE } from "../api/global";
import { Picker } from "@react-native-picker/picker";
import { editMovieApi } from "../api/MovieApi";

const EditMovieScreen = ({ navigation, route }) => {
  const { movie } = route.params;
  const movieId = movie.id;

  const [nom, setNom] = useState(movie.nom);
  const [realisateur, setRealisateur] = useState(movie.realisateur);
  const [resume, setResume] = useState(movie.resume);
  const [genre, setGenre] = useState(movie.genre);
  const [date, setDate] = useState(movie.date);
  const [duree, setDuree] = useState(`${movie.duree}`);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditMovie = async () => {
    if (
      nom !== "" &&
      genre !== "" &&
      resume !== "" &&
      duree !== "" &&
      date !== "" &&
      realisateur !== ""
    ) {
      try {
        const movie = editMovieApi(
          movieId,
          nom,
          realisateur,
          resume,
          genre,
          date,
          duree
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
      <Text style={styles.title}>Modifier un film</Text>
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
          <Text style={styleScreen.label}>Nom</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setNom}
            value={nom}
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Responsable</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setResponsable}
            value={responsable}
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Adresse</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setAdresse}
            value={adresse}
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Code Postal</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setCodePostal}
            value={codePostal}
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Ville</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setVille}
            value={ville}
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Prix de la place </Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setPrixPlace}
            value={prixPlace}
            keyboardType="numeric"
          />
        </View>
      </View>
      <Button text="Modifier" onPress={() => handleEditMovie()} />
    </KeyboardAvoidingView>
  );
};

export default EditMovieScreen;

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
