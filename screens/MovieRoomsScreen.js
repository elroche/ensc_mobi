
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from "react-native";
import styles from "../theme/styles";
import { fetchMovieRoomsApi } from "../api/MovieRoomApi";
import MovieRoomCard from "../components/MovieRoomCard";
import Button from "../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const MovieRoomsScreen = ({ navigation, route }) => {
    const { cinemaId } = route.params;
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


    return(
        <ScrollView>
            <View style={[styles.container, styleScreen.containerScreen ]}>
                <View style={styleScreen.ButtonScreen}>
                    {movieRooms.length > 0 ? ( <Button text={"Ajouter une salle !"} onPress={() => addMovieRoom()} />):(<Text></Text>)}                    
                </View>
              {movieRooms.length > 0 ? (
                movieRooms.map((movieRoom) => {
                  return (
                    <View style={styleScreen.movieRoomCard}>
                        <MovieRoomCard
                          key={movieRoom.id}
                          item={movieRoom}
                        />
                    </View>
                  );
                })
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text style={styleScreen.noMovieRoom}>
                    Il n'y a pas encore de salle à ce cinéma...
                  </Text>
                  <Button
                    text={"Ajouter une salle !"}
                    onPress={() => addMovieRoom()}
                  />
                </View>
              )}
            </View>
        </ScrollView>
    );
};

const styleScreen = StyleSheet.create({
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
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    ButtonScreen: {
        width: "100%",
        marginBottom: 15,
    },


    
  });

export default MovieRoomsScreen;