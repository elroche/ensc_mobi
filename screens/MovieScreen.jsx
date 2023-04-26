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

  const loadMovies = async () => {
    setLoading(true);
    setError(false);

    try {
      const movies = await fetchMoviesApi();
      const filteredMovies = filterMoviesByGenre(movies, selectedGenre);
      setMovies(filteredMovies);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  const filterMoviesByGenre = (movies, genre) => {
    if (!genre) {
      return movies;
    }
    return movies.filter((movie) => {
      return genre === "all" || movie.genre === genre;
    });
  };

  const onSelectGenre = (genre) => {
    setSelectedGenre(genre);
    loadMovies();
  };

  const addMovie = async () => {
    navigation.navigate("Create");
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadMovies();
    });
    return unsubscribe;
  }, [navigation], [selectedGenre]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1b69bc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Une erreur s'est produite dans la récupération des films</Text>
      </View>
    );
  }

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
