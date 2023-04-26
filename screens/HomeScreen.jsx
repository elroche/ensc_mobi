import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import styles from "../theme/styles";
import MovieCard from "../components/MovieCard";
import { fetchMoviesApi } from "../api/MovieApi";

const HomeScreen = ({ navigation }) => {
  const [lastMovies, setLastMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //Récupération des 3 derniers films ajoutés
  const loadLastMovies = async () => {
    try {
      const movies = await fetchMoviesApi();
      const lastMovies = movies
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
      setLastMovies(lastMovies);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onPressMovie = (movie) => {
    navigation.navigate("Les films", {
      screen: "Details",
      params: {
        movieId: movie.id,
      },
    });
  };

  useEffect(() => {
    loadLastMovies();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00216d" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.main}>
          <View style={styleScreen.imageContainer}>
            <Image
              source={require("../assets/accueilCinema.jpg")}
              style={styleScreen.image}
            />
          </View>
          <View style={styleScreen.lastMovies}>
            <Text style={styleScreen.moviesTitle}>Derniers films ajoutés</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Les films")}>
              <Text style={styleScreen.seeAllMovie}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          <View>
            {lastMovies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  item={movie}
                  onPress={() => onPressMovie(movie)}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styleScreen = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 6,
    marginLeft: 2,
    marginVertical: 4,
  },
  imageContainer: {
    width: 360,
    height: 260,
    alignSelf: "center",
    borderRadius: 30,
    marginRight: 5,
    marginBottom: 16,
  },
  moviesTitle: {
    textAlign: "left",
    fontSize: 22,
    fontWeight: "600",
    color: "#1F3976",
    marginBottom: 16,
  },
  seeAllMovie: {
    textAlign: "right",
    fontWeight: "600",
    marginBottom: 12,
    color: "#1F3976",
  },
  lastMovies: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
});
