import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import styles from "../theme/styles";
import { fetchMovieApi } from "../api/MovieApi";

const DetailsMovieScreen = ({ navigation, route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: movie.name });
  }, [movie.name]);

  const loadMovie = async () => {
    setLoading(true);
    setError(false);

    try {
      const movie = await fetchMovieApi(movieId);
      setMovie(movie);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMovie();
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
        <Text>Une erreur s'est produite dans la récupération du film</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{movie.nom}</Text>
    </View>
  );
};

export default DetailsMovieScreen;

const styleScreen = StyleSheet.create({});
