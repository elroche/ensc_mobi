import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from "react-native";
import styles from "../theme/styles";
import { fetchMovieApi } from "../api/MovieApi";
import Button from "../components/Button";

const DetailsMovieScreen = ({ navigation, route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    <ScrollView style={styles.container}>
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
            {movie.date}
        </Text>
        <Text style={{ marginTop: 15 }}> 
          <Text style={styles.labelDetails}>Durée : </Text>
            {movie.duree}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button style={{alignSelf: 'center'}} text={"Modifier"} action={() => editMovie()} />
      </View>
    </ScrollView>
  );
};

export default DetailsMovieScreen;

const styleScreen = StyleSheet.create({
  image : {
    width: 300,
    height: 200,
    borderRadius : 20,
    alignSelf: 'center',
},
});
