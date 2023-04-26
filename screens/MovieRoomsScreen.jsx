import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import styles from "../theme/styles";
import { fetchMovieRoomsApi, deleteMovieRoomApi } from "../api/MovieRoomApi";
import MovieRoomCard from "../components/MovieRoomCard";
import Button from "../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "../components/IconButton";

const MovieRoomsScreen = ({ navigation, route }) => {
  const { cinema } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movieRooms, setMovieRooms] = useState([]);
  const [showBox, setShowBox] = useState(true);

  const showConfirmDialog = (movieRoom) => {
    return Alert.alert(
      "Êtes-vous sûr(e) ?",
      "Êtes-vous sûr(e) de vouloir supprimer la salle ?",
      [
        // Le bouton Oui
        {
          text: "Oui",
          onPress: () => {
            handleDeleteMovieRoom(movieRoom.id);
          },
        },
        // Le bouton Non
        // Ne fait rien mais enlève le message
        {
          text: "Non",
        },
      ]
    );
  };

  const handleDeleteMovieRoom = async (id) => {
    setShowBox(false);
    await deleteMovieRoomApi(id);
  };

  const loadMovieRooms = async () => {
    setLoading(true);
    setError(false);
    try {
      const movieRooms = await fetchMovieRoomsApi(cinema.id);
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
            <View style={styles.header}>
              <View style={styles.headerDelimiter}>
                <Text style={styles.title}>{cinema.nom} - Les salles</Text>
              </View>
              <IconButton onPress={() => addMovieRoom()} color="#1F3976">
                <MaterialCommunityIcons name={"plus"} size={20} color="white" />
              </IconButton>
            </View>
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
                  onDelete={() => showConfirmDialog(movieRoom)}
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
              <Button
                text={"Ajouter une salle !"}
                onPress={() => addMovieRoom()}
              />
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
    width: "100%",
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
