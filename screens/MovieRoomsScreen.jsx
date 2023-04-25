﻿import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import styles from "../theme/styles";
import { fetchMovieRoomsApi } from "../api/MovieRoomApi";
import MovieRoomCard from "../components/MovieRoomCard";
import Button from "../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MovieRoomsScreen = ({ navigation, route }) => {
  const { cinemaId } = route.params;
  const [cinema, setCinema] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movieRooms, setMovieRooms] = useState([]);

  const loadMovieRooms = async () => {
    setLoading(true);
    setError(false);
    try {
      const movieRooms = await fetchMovieRoomsApi(cinemaId);
      setMovieRooms(movieRooms);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMovieRooms();
  }, []);

  const editMovieRoom = (movieRoom) => {
    navigation.navigate("MovieRoomEdit", { movieRoom: movieRoom });
  };

  const deleteMovieRoom = (movieRoom) => {
    navigation.navigate("Delete", { movieRoom: movieRoom });
  };

  const addMovieRoom = () => {
    navigation.navigate("MovieRoomCreate");
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
        <Text>Une erreur s'est produite dans la récupération des salles</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styleScreen.containerScreen}>
        <View style={styleScreen.buttonScreen}>
          {movieRooms.length > 0 ? (
            <Button text={"Ajouter !"} onPress={() => addMovieRoom()} />
          ) : (
            <Text></Text>
          )}
        </View>
        {movieRooms.length > 0 ? (
          movieRooms.map((movieRoom) => {
            return (
              <View key={movieRoom.id} style={styleScreen.movieRoomCard}>
                <MovieRoomCard
                  onEdit={() => editMovieRoom(movieRoom)}
                  onDelete={() => deleteMovieRoom(movieRoom)}
                  item={movieRoom}
                />
              </View>
            );
          })
        ) : (
          <View style={styleScreen.containerNoMovieRoom}>
            <Text style={styleScreen.noMovieRoom}>
              Il n'y a pas encore de salle pour ce cinéma...
            </Text>
            <View style={styleScreen.buttonScreen}>
              <Button text={"Ajouter !"} onPress={() => addMovieRoom()} />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styleScreen = StyleSheet.create({
  containerNoMovieRoom: { alignItems: "center", justifyContent: "center" },
  noMovieRoom: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    color: "#00216d",
    marginVertical: 20,
  },
  addCinema: {
    color: "#1b69bc",
    fontWeight: "800",
    marginTop: 8,
    fontSize: 17,
  },

  movieRoomCard: {
    width: "49%",
  },

  containerScreen: {
    alignItems: "center",
    justifyContent: "center",
  },

  buttonScreen: {
    width: "100%",
    marginBottom: 15,
  },
});

export default MovieRoomsScreen;