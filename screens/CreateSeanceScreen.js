import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView, 
  TouchableOpacity,
  ScrollView
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useEffect } from "react";
import styles from "../theme/styles";
import Button from "../components/Button";
import { addSeance } from "../api/SeanceApi";
import { Picker } from "@react-native-picker/picker";
import {fetchCinemasApi } from "../api/CinemaApi";


export const CreateSeanceScreen = ({ navigation }) => {
  const [filmId, setFilmId] = useState("");
  const [salleId, setSalleId] = useState("");
  const [cinema, setCinema] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCinemas = async () => {
      const cinemas = await fetchCinemasApi();
      setCinemas(cinemas);
    };
    fetchCinemas();
  }, []);

const handleCinemaChange = (selectedCinemaId) => {
  const selectedCinema = cinemas.find(c => c.id === selectedCinemaId);
  setCinema(selectedCinema);
}


  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false); // Masque le date picker une fois la date sélectionnée
  };

  const handleCreateSeance = () => {
    if (
      filmId !== "" &&
      salleId !== "" &&
      cinema?.id !== null &&
      date !== ""
    ) {
      try {
        const seance = addSeance(
          date,
          filmId,
          salleId,
          cinema?.id
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
    <ScrollView>
    <KeyboardAvoidingView
      style={[styles.container, styleScreen.container]}
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
          <Text style={styleScreen.label}>Cinéma</Text>
          <Picker
            style={styleScreen.pickerCinema}
            selectedValue={cinema}
            onValueChange={handleCinemaChange}
          >
            {cinemas.map((cinema) => (
              <Picker.Item
                key={cinema.id}
                label={cinema.nom}
                value={cinema.id}
              />
            ))}
          </Picker>
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Date</Text>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.signInButton]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.loginText}>Sélectionner une date</Text>
          </TouchableOpacity>
          <Text style={styles.text}>
            Date sélectionnée : {date.toLocaleDateString()}
          </Text>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              maximumDate={new Date()} // désactive les dates futures
              onChange={onDateChange}
            />
          )}
        </View>
      <Button text="Ajouter" onPress={() => handleCreateSeance()} />
      </View>
    </KeyboardAvoidingView>
    </ScrollView>
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
