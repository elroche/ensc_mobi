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
import { addMovie } from "../api/MovieApi";

const CreateMovieScreen = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [realisateur, setRealisateur] = useState("");
  const [resume, setResume] = useState("");
  const [genre, setGenre] = useState("");
  const [date, setDate] = useState("");
  const [duree, setDuree] = useState("");

  const handleSubmitMovie = () => {
    if (
      nom !== "" &&
      realisateur !== "" &&
      resume !== "" &&
      genre !== "" &&
      date !== "" &&
      duree !== ""
    ) {
      try {
        const movie = addMovie(nom, realisateur, resume, genre, date, duree);
        console.log("New movie created:", movie); // Afficher le nouveau film dans la console pour le vérifier
        // Rediriger vers la page précédente
        navigation.goBack();
      } catch (error) {
        console.error(error);
        // Afficher une erreur à l'utilisateur
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container && styleScreen.container}
      behavior="padding"
    >
      <Text style={styles.title}>Ajouter un film</Text>
      <View style={styleScreen.content}>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Nom</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setNom}
            value={nom}
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Réalisateur</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setRealisateur}
            value={realisateur}
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Résumé</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setResume}
            value={resume}
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Genre</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setGenre}
            value={genre}
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Date</Text>
          {/* <DatePicker
            style={styles.datePicker}
            date={date}
            mode="date"
            placeholder="Sélectionner une date"
            format="YYYY-MM-DD"
            minDate="1900-01-01"
            maxDate="2100-01-01"
            confirmBtnText="Confirmer"
            cancelBtnText="Annuler"
            useNativeDriver={true}
            onDateChange={(newDate) => setDate(newDate)}
          /> */}
          <TextInput
            style={styleScreen.input}
            onChangeText={setDate}
            value={date}
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Durée</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setDuree}
            value={duree}
          />
        </View>
      </View>
      <Button text="Ajouter" onPress={() => handleSubmitMovie()} />
    </KeyboardAvoidingView>
  );
};

export default CreateMovieScreen;

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
