import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import styles from "../theme/styles";
import Button from "../components/Button";
import CinemaCard from "../components/CinemaCard";
import { fetchCinemasApi } from "../api/CinemaApi";

const CinemaScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cinemas, setCinemas] = useState([]);

  const loadCinemas = async () => {
    setLoading(true);
    setError(false);
    try {
      const cinemas = await fetchCinemasApi();
      setCinemas(cinemas);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCinemas();
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
        <Text>Une erreur s'est produite dans la récupération des cinemas</Text>
      </View>
    );
  }

  const onPressCinema = (cinema) => {
    navigation.navigate("Details", {cinemaId: cinema.id});
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Les cinémas existants</Text>
        <Button text={"Ajouter un cinema !"} action={() => addCinema()} />
        <View style={{ marginTop: 15 }}>
          {cinemas.length > 0 ? (
            cinemas.map((cinema) => {
              return (
                <CinemaCard
                  key={cinema.id}
                  item={cinema}
                  onPress={() => onPressCinema(cinema)}
                />
              );
            })
          ) : (
            <View style={{ alignItems: "center" }}>
              <Text style={styleScreen.noCinemas}>
                Il n'y a pas encore de cinema...
              </Text>
              <Button text={"Ajouter un cinema !"} action={() => addCinema()} />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styleScreen = StyleSheet.create({
  noCinemas: {
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
});

export default CinemaScreen;
