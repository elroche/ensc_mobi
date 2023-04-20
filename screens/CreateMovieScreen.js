import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../theme/styles";
import Button from "../components/Button";
import { addMovie } from "../api/MovieApi";
import { GENRE } from "../api/global";
import { Picker } from "@react-native-picker/picker";

const CreateMovieScreen = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [realisateur, setRealisateur] = useState("");
  const [resume, setResume] = useState("");
  const [genre, setGenre] = useState("");
  const [date, setDate] = useState("");
  const [duree, setDuree] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        console.log("New movie created:", movie);
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
    <ScrollView>
      <View style={styles.container && styleScreen.container}>
        <Text style={styles.title}>Ajouter un film</Text>
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
            <Picker
              style={styleScreen.pickerGenre}
              selectedValue={selectedGenre}
              onValueChange={(itemValue) => setSelectedGenre(itemValue)}
            >
              {GENRE.map((genre, index) => (
                <Picker.Item key={index} label={genre} value={genre} />
              ))}
            </Picker>
          </View>

          <View style={styleScreen.inputContainer}>
            <Text style={styleScreen.label}>Date</Text>
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
      </View>
    </ScrollView>
  );
};

export default CreateMovieScreen;

const styleScreen = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 15,
  },
  content: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
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
