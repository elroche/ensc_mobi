import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useEffect } from "react";
import styles from "../theme/styles";
import Button from "../components/Button";
import { addSeanceApi } from "../api/SeanceApi";
import { Picker } from "@react-native-picker/picker";
import { fetchCinemasApi } from "../api/CinemaApi";
import { fetchMoviesApi } from "../api/MovieApi";
import { fetchMovieRoomsApi } from "../api/MovieRoomApi";

export const CreateSeanceScreen = ({ navigation }) => {
  const [salleId, setSalleId] = useState("");
  const [cinema, setCinema] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinemaId, setSelectedCinemaId] = useState(null);
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movieRoom, setMovieRoom] = useState(null);
  const [movieRooms, setMovieRooms] = useState([]);
  const [selectedMovieRoomId, setSelectedMovieRoomId] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

// Le premier useEffect permet de récupérer la liste de tous les cinémas et de tous les films
// depuis l'API lors du chargement de la page
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

// Le deuxième useEffect permet de récupérer la liste de toutes les salles de projection
// d'un cinéma donné lorsqu'un cinéma est sélectionné dans la liste déroulante
useEffect(() => {
  const fetchRooms = async () => {
    if (selectedCinemaId !== null) {
      setMovieRooms([]);
      setSelectedMovieRoomId(null);
      const MovieRooms = await fetchMovieRoomsApi(selectedCinemaId);
      setMovieRooms(MovieRooms);
    }
  };
  fetchRooms();
}, [selectedCinemaId]);

// Cette fonction est appelée lorsqu'un nouveau cinéma est sélectionné dans la liste déroulante
// Elle permet de récupérer les informations du cinéma sélectionné, la liste des salles de projection,
// et de réinitialiser les informations de la séance sélectionnée
const handleCinemaChange = async (selectedCinemaId) => {
  setSelectedCinemaId(selectedCinemaId);
  const selectedCinema = cinemas.find((c) => c.id === selectedCinemaId);
  setCinema(selectedCinema);
  setSelectedMovieRoomId(null);
  setMovieRooms([]);
  const rooms = await fetchMovieRoomsApi(selectedCinemaId);
  setMovieRooms(rooms);
};

// Cette fonction est appelée lorsqu'un nouveau film est sélectionné dans la liste déroulante
// Elle permet de récupérer les informations du film sélectionné
const handleMovieChange = (selectedMovieId) => {
  setSelectedMovieId(selectedMovieId);
  const selectedMovie = movies.find((m) => m.id === selectedMovieId);
  setMovie(selectedMovie);
};

// Cette fonction est appelée lorsqu'une nouvelle salle de projection est sélectionnée dans la liste déroulante
// Elle permet de récupérer les informations de la salle de projection sélectionnée
const handleMovieRoomChange = (selectedMovieRoomId) => {
  setSelectedMovieRoomId(selectedMovieRoomId);
  const selectedMovieRoom = movieRooms.find(
    (m) => m.id === selectedMovieRoomId
  );
  setMovieRoom(selectedMovieRoom);
};

// Cette fonction est appelée lorsqu'une nouvelle date est sélectionnée dans le date picker
const onDateChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setDate(currentDate);
  setShowDatePicker(false); // Masque le date picker une fois la date sélectionnée
};

  // Cette fonction est appelée lorsqu'on clique sur le bouton "Créer"
// Elle permet d'ajouter une nouvelle séance en appelant l'API
  const handleCreateSeance = async () => {
    if (
      selectedMovieId !== "" &&
      selectedMovieRoomId !== "" &&
      selectedCinemaId !== null &&
      date !== ""
    ) {
      try {
        const seance = await addSeanceApi(
          date,
          selectedMovieId,
          selectedMovieRoomId,
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.main && styleScreen.container]}>
          <Text style={styles.title}>Ajouter une séance</Text>
          <Text style={styles.text}>
            Afin d'ajouter une séance, veuillez saisir les données suivantes :
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
              <Text style={styleScreen.label}>Film :</Text>
              <Picker
                itemStyle={styleScreen.pickerScreen}
                selectedValue={selectedMovieId}
                onValueChange={handleMovieChange}
              >
                <Picker.Item label="Choisir un film" value="" />
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
              <Text style={styleScreen.label}>Cinéma :</Text>
              <Picker
                itemStyle={styleScreen.pickerScreen}
                selectedValue={selectedCinemaId}
                onValueChange={handleCinemaChange}
              >
                <Picker.Item label="Choisir un cinéma" value="" />
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
              <Text style={styleScreen.label}>Numéro de la salle :</Text>
              <Picker
                itemStyle={styleScreen.pickerScreen}
                selectedValue={selectedMovieRoomId}
                onValueChange={handleMovieRoomChange}
              >
                <Picker.Item label="Choisir une salle" value="" />
                {movieRooms.map((movieRoom) => (
                  <Picker.Item
                    key={movieRoom.id}
                    label={movieRoom.numeroSalle.toString()}
                    value={movieRoom.id}
                  />
                ))}
              </Picker>
            </View>
            <View style={styleScreen.inputContainer}>
              <Text style={styleScreen.label}>Date :</Text>
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
          </View>
          <Button text="Ajouter" onPress={() => handleCreateSeance()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateSeanceScreen;

const styleScreen = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
