import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import styles from "../theme/styles";
import { fetchMoviesApi } from "../api/MovieApi";
import Button from "../components/Button";
import MovieCard from "../components/MovieCard";
import GenrePicker from "../components/GenrePicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "../components/IconButton";

const MovieScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Charge la liste des films
const loadMovies = async () => {
  setLoading(true); // Met en attente l'affichage de la page
  setError(false); // Réinitialise le message d'erreur

  try {
    const movies = await fetchMoviesApi(); // Appelle l'API pour récupérer la liste des films
    const filteredMovies = filterMoviesByGenre(movies, selectedGenre); // Filtrage des films selon le genre sélectionné
    setMovies(filteredMovies); // Met à jour la liste des films
  } catch (e) {
    setError(true); // Affiche un message d'erreur en cas d'échec de la récupération des films
  }
  setLoading(false); // Arrête l'affichage de la page de chargement
};

// Filtrage des films par genre
const filterMoviesByGenre = (movies, genre) => {
  if (!genre) { // Si le genre n'est pas spécifié, retourne la liste complète de films
    return movies;
  }
  return movies.filter((movie) => { // Sinon, filtre la liste de films selon le genre sélectionné
    return genre === "all" || movie.genre === genre;
  });
};

// Sélectionne le genre de film à afficher et recharge la liste des films
const onSelectGenre = (genre) => {
  setSelectedGenre(genre); // Met à jour le genre sélectionné
  loadMovies(); // Recharge la liste des films en fonction du nouveau genre sélectionné
};

// Navigue vers la page de création d'un nouveau film
const addMovie = async () => {
  navigation.navigate("Create"); // Navigue vers la page de création d'un nouveau film
};

// Effectue une nouvelle requête API pour récupérer la liste des films en fonction du genre sélectionné à chaque changement de genre ou de focus de la page
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => { // Ajoute un listener qui réagit au focus de la page
    loadMovies(); // Charge les films correspondant au genre sélectionné
  });
  return unsubscribe; // Retourne une fonction qui retire le listener lorsque la page n'est plus focus
}, [navigation], [selectedGenre]);

// Si la page est en cours de chargement, affiche une page de chargement
if (loading) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#1b69bc" />
    </View>
  );
}

// Si une erreur s'est produite lors de la récupération des films, affiche un message d'erreur
if (error) {
  return (
    <View style={styles.container}>
      <Text>Une erreur s'est produite dans la récupération des films</Text>
    </View>
  );
}

// Navigue vers la page de détails du film sélectionné
const onPressMovie = (movie) => {
  navigation.navigate("Details", { movieId: movie.id });
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerDelimiter}>
          <Text style={styles.title}>Les films disponibles</Text>
        </View>
        <IconButton onPress={() => addMovie()} color="#1F3976">
          <MaterialCommunityIcons name={"plus"} size={20} color="white" />
        </IconButton>
      </View>
      <GenrePicker
        selectedGenre={selectedGenre}
        onSelectGenre={onSelectGenre}
      />
      <ScrollView>
        <View style={styles.main}>
          {movies.length > 0 ? (
            movies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  item={movie}
                  onPress={() => onPressMovie(movie)}
                />
              );
            })
          ) : (
            <View style={{ alignItems: "center" }}>
              <Text style={styleScreen.noMovies}>
                Il n'y a pas encore de films...
              </Text>
              <Button text="Ajouter un film !" onPress={() => addMovie()} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styleScreen = StyleSheet.create({
  noMovies: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    color: "#00216d",
    marginVertical: 20,
  },
  addMovie: {
    color: "#1b69bc",
    fontWeight: "800",
    marginTop: 8,
    fontSize: 17,
  },
  buttonAdd: {
    marginBottom: 10,
  },
});

export default MovieScreen;
