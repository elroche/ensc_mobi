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
        <View style={styleScreen.header}>
          <Text style={styleScreen.homeTitle}>Gestion de vos cinémas</Text>
          <Text style={styleScreen.homeSubtitle}>
            Gérez tous vos cinémas, vos salles, les films proposés, ainsi que
            les séances à travers cette application !
          </Text>
          <View style={styleScreen.imageContainer}>
            <Image
              source={require("../assets/accueilCinema.jpg")}
              style={styleScreen.image}
            />
          </View>
        </View>
        <View style={styles.main}>
          <View style={styleScreen.lastMovies}>
            <Text style={styleScreen.moviesTitle}>Les films récents</Text>
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
  header: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#DBE5FD",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 2,
    padding: 10,
    borderColor: "#CCDBFF",
  },
  homeTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    marginVertical: 10,
    padding: 5,
    color: "#1F3976",
  },
  homeSubtitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "300",
    color: "#1F3976",
    marginBottom: 14,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 6,
    marginLeft: 2,
    marginVertical: 4,
  },
  imageContainer: {
    width: 260,
    height: 160,
    alignSelf: "center",
    borderRadius: 30,
    marginRight: 5,
    marginBottom: 16,
  },
  moviesTitle: {
    textAlign: "left",
    fontSize: 20,
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
