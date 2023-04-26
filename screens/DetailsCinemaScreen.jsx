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
import { fetchCinemaApi } from "../api/CinemaApi";
import Button from "../components/Button";

const DetailsCinemaScreen = ({ navigation, route }) => {
  const { cinemaId } = route.params;
  const [cinema, setCinema] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: cinema.nom });
  }, [cinema.nom]);

  const loadCinema = async () => {
    setLoading(true);
    setError(false);

    try {
      const cinema = await fetchCinemaApi(cinemaId);
      setCinema(cinema);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCinema();
  }, []);

  useEffect(() => {
    const reloadCinema = async () => {
      try {
        const cinema = await fetchCinemaApi(cinemaId);
        setCinema(cinema);
      } catch (e) {
        setError(true);
      }
    };
    reloadCinema();
  }, [cinema]);

  const editCinema = async () => {
    navigation.navigate("Edit", { cinema: cinema });
  };

  const onPressMovieRooms = async () => {
    navigation.navigate("MovieRooms", { cinemaId: cinemaId });
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
          <Text style={styles.title}>{cinema.nom}</Text>
          <Image
            source={require("../assets/cinemas/cinema.jpg")}
            style={styleScreen.image}
          />
          <View style={styles.descriptionContainer}>
            <Text style={styleScreen.label}>Adresse :</Text>
            <Text>
              {cinema.adresse}, {cinema.codePostal} {cinema.ville}
            </Text>
            <Text style={{ marginTop: 15 }}>
              <Text style={styleScreen.label}>Responsable : </Text>
              {cinema.responsable}
            </Text>
            <Text style={{ marginTop: 15 }}>
              <Text style={styleScreen.label}>Prix d'une place : </Text>
              {cinema.prixPlace}€
            </Text>
          </View>
          <View style={styleScreen.buttonView}>
            <Button
              style={styleScreen.buttonScreen}
              text={"Modifier"}
              onPress={() => editCinema()}
            />
            <Button
              style={styleScreen.buttonScreen}
              text={"Afficher les salles"}
              onPress={() => onPressMovieRooms()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsCinemaScreen;

const styleScreen = StyleSheet.create({
  label: {
    fontWeight: 700,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 20,
    alignSelf: "center",
  },
  editButton: {
    alignSelf: "center",
  },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonScreen: {
    alignSelf: "center",
  },
});
