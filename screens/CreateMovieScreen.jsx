import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import styles from "../theme/styles";
import Button from "../components/Button";
import { addMovieApi } from "../api/MovieApi";
import { GENRE } from "../api/global";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateMovieScreen = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [realisateur, setRealisateur] = useState("");
  const [resume, setResume] = useState("");
  const [genre, setGenre] = useState("");
  const [duree, setDuree] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitMovie = () => {
    // Vérifier si tous les champs sont remplis avant d'envoyer la requête au serveur
    if (
      nom !== "" &&
      realisateur !== "" &&
      resume !== "" &&
      selectedGenre !== "" &&
      date !== "" &&
      duree !== ""
    ) {
      try {
        // Ajouter un nouveau film en appelant l'API addMovieApi avec les informations saisies par l'utilisateur
        const movie = addMovieApi(
          nom,
          realisateur,
          resume,
          selectedGenre,
          date,
          duree
        );
        // Retourner à la page précédente
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    } else {
      // Afficher un message d'erreur si tous les champs ne sont pas remplis
      setErrorMessage("Attention ! Veuillez remplir tous les champs.");
      return;
    }
  };

  const onDateChange = (event, selectedDate) => {
    // Mettre à jour l'état "date" avec la date sélectionnée
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false); // Masque le date picker une fois la date sélectionnée
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.main && styleScreen.container]}>
          <Text style={styles.title}>Ajouter un film</Text>
          <Text style={styles.text}>
            Afin d'ajouter un film, veuillez saisir les données suivantes :
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
                selectedValue={selectedGenre}
                onValueChange={(itemValue) => setSelectedGenre(itemValue)}
              >
                <Picker.Item label="Choisir un genre" value="" />
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
                keyboardType="numeric"
              />
            </View>
          </View>
          <Button text="Ajouter" onPress={() => handleSubmitMovie()} />
        </View>
      </ScrollView>
    </SafeAreaView>
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
