import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "../theme/styles";
import Button from "../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
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
  const [date, setDate] = useState(new Date(movie.date));
  const [duree, setDuree] = useState(`${movie.duree}`);
  const [showDatePicker, setShowDatePicker] = useState(false);
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

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false); // Masque le date picker une fois la date sélectionnée
  };

  return (
    <ScrollView>
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
              itemStyle={styleScreen.pickerScreen}
              selectedValue={genre}
              onValueChange={(itemValue) => setGenre(itemValue)}
            >
              {GENRE.map((genre, index) => (
                <Picker.Item key={index} label={genre} value={genre} />
              ))}
            </Picker>
          </View>

          <View style={styleScreen.inputContainer}>
            <Text style={styleScreen.label}>Date</Text>
            <TouchableOpacity
              style={styleScreen.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styleScreen.dateButtonText}>
                Sélectionner une date
              </Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              Date sélectionnée : {date.toLocaleDateString()}
            </Text>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={onDateChange}
              />
            )}
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
        <Button text="Modifier" onPress={() => handleEditMovie()} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default EditMovieScreen;

const styleScreen = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
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
  dateButton: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
    alignItems: "center",
  },
  dateButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  pickerScreen: {
    height: 100,
    fontSize: 14,
  },
});
