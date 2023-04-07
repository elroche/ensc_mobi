import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../theme/styles";
import Card from "../components/Card";
import { fetchMoviesApi } from "../api/MovieApi";
import Button from "../components/Button";

const MovieScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  const loadMovies = async () => {
    setLoading(true);
    setError(false);

    try {
      const movies = await fetchMoviesApi();
      setMovies(movies);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMovies();
  }, []);

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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Les films disponibles</Text>
        <View>
          {movies.length > 0 ? (
            movies.map((movie) => {
              return (
                <Card
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
              <Button text={"Ajouter un film !"} action={() => addMovie()} />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
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
});

export default MovieScreen;
