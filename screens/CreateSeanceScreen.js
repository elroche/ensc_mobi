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
import {fetchMoviesApi } from "../api/MovieApi";
import { fetchMovieRoomsApi } from "../api/MovieRoomApi";


export const CreateSeanceScreen = ({ navigation }) => {
  const [salleId, setSalleId] = useState("");
  const [cinema, setCinema] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinemaId, setSelectedCinemaId] = useState(null);
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCinemas = async () => {
      const cinemas = await fetchCinemasApi();
      setCinemas(cinemas);
    };
    fetchCinemas();

    const fetchMovies = async () => {
      const movies = await fetchMoviesApi();
      setMovies(movies);
    };
    fetchMovies();
  }, []);


  const handleCinemaChange = (selectedCinemaId) => {
    setSelectedCinemaId(selectedCinemaId);
    const selectedCinema = cinemas.find(c => c.id === selectedCinemaId);
    setCinema(selectedCinema);
  };

  const handleMovieChange = (selectedMovieId) => {
    setSelectedMovieId(selectedMovieId);
    const selectedMovie = movies.find(c => c.id === selectedMovieId);
    setMovie(selectedMovie);
  };
  


  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false); // Masque le date picker une fois la date sélectionnée
  };

  const handleCreateSeance = async () => {
    if (
      selectedMovieId !== "" &&
      salleId !== "" &&
      selectedCinemaId !== null &&
      date !== ""
    ) {
      try {
        const seance = await addSeance(
          date,
          selectedMovieId,
          salleId,
          selectedCinemaId
        );
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrorMessage("Attention ! Veuillez remplir tous les champs.");
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
          <Text style={styleScreen.label}>Film</Text>
          <Picker
            itemStyle={styleScreen.pickerScreen}
            selectedValue={selectedMovieId}
            onValueChange={handleMovieChange}
          >
            {movies.map((movie) => (
              <Picker.Item
                key={movie.id}
                label={movie.nom}
                value={movie.id}
              />
            ))}
          </Picker>
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Cinéma</Text>
          <Picker
            itemStyle={styleScreen.pickerScreen}
            selectedValue={selectedCinemaId}
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
          <Text style={styleScreen.label}>Id de la salle</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setSalleId}
            value={salleId}
            keyboardType="numeric"
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Date</Text>
          <TouchableOpacity
            style={styleScreen.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styleScreen.dateButtonText}>Sélectionner une date</Text>
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
  dateButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },

  pickerScreen: {
    height: 100, 
    fontSize: 14,
  },
});
