import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import styles from "../theme/styles";
import { fetchMovieApi, deleteMovieApi } from "../api/MovieApi";
import Button from "../components/Button";
import ButtonOutline from "../components/ButtonOutline";
import moment from "moment";
import "moment/locale/fr";

const DetailsMovieScreen = ({ navigation, route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const date = moment(movie.date).locale("fr");
  const formattedDate = date.format("DD/MM/YYYY");
  const totalMinutes = movie.duree;
  const heures = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  useEffect(() => {
    navigation.setOptions({ title: movie.nom });
  }, [movie.nom]);

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

  const deleteMovie = async () => {
    try {
      const movie = await deleteMovieApi(movieId);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const editMovie = async () => {
    navigation.navigate("Edit", { movie: movie });
  };
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.title}>{movie.nom}</Text>
          <Image
            source={require("../assets/movie/movieImage2.avif")}
            style={styleScreen.image}
          />
          <View style={styles.descriptionContainer}>
            <Text style={{ marginTop: 15 }}>
              <Text style={styles.labelDetails}>Genre : </Text>
              {movie.genre}
            </Text>
            <Text style={{ marginTop: 15 }}>
              <Text style={styles.labelDetails}>Réalisateur : </Text>
              {movie.realisateur}
            </Text>
            <View style={{ marginTop: 15 }}>
              <Text style={styles.labelDetails}>Resumé :</Text>
              <Text>{movie.resume}</Text>
            </View>
            <Text style={{ marginTop: 15 }}>
              <Text style={styles.labelDetails}>Date : </Text>
              {formattedDate}
            </Text>
            <Text style={{ marginTop: 15 }}>
              <Text style={styles.labelDetails}>Durée : </Text>
              {heures} heures et {minutes} minutes
            </Text>
          </View>
          <View style={styleScreen.containerButton}>
            <Button text={"Modifier"} onPress={() => editMovie()} />
            <ButtonOutline text={"Supprimer"} onPress={() => deleteMovie()} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsMovieScreen;

const styleScreen = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    borderRadius: 20,
    alignSelf: "center",
  },
  containerButton: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
