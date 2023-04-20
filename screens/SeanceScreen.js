import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import styles from "../theme/styles";
import Button from "../components/Button";
import { fetchSeancesApi } from "../api/SeanceApi";
import { fetchCinemasApi } from "../api/CinemaApi";
import SeanceCard from "../components/SeanceCard";
import { Picker } from "@react-native-picker/picker";

const SeanceScreen = ({ navigation }) => {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [seances, setSeances] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);

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

  const loadSeances = async () => {
    setLoading(true);
    setError(false);

    try {
      const seances = await fetchSeancesApi();
      setSeances(seances);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCinemas();
    loadSeances();
  }, []);

  const filterSeancesByCinema = () => {
    if (selectedCinema) {
      return seances.filter((seance) => seance.cinemaId === selectedCinema);
    }
    return [];
  };

  const addSeance = async () => {
    navigation.navigate("Create");
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
        <Text>Une erreur s'est produite dans la récupération des séances</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Les séances</Text>
        <View style={styleScreen.buttonAdd}>
          <Button text="Ajouter" onPress={() => addSeance()} />
        </View>
        <View style={styleScreen.selectContainer}>
          <Text style={styleScreen.subtitle}>
            Veuillez sélectionner le cinéma :
          </Text>
          <Picker
            selectedValue={selectedCinema}
            onValueChange={(itemValue) => setSelectedCinema(itemValue)}
          >
            {cinemas.map((cinema) => (
              <Picker.Item
                key={cinema.id}
                label={cinema.nom}
                value={cinema.id}
              />
            ))}
          </Picker>
        </View>
        {selectedCinema === null ? (
          <View style={{ alignItems: "center" }}>
            <Text style={styleScreen.noSeances}>
              Veuillez sélectionner un cinéma pour voir les séances.
            </Text>
          </View>
        ) : (
          <View>
            {filterSeancesByCinema().length > 0 ? (
              filterSeancesByCinema().map((seance) => {
                return (
                  <SeanceCard
                    key={seance.id}
                    item={seance}
                    onPress={() => onPressSeance(seance)}
                  />
                );
              })
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text style={styleScreen.noSeances}>
                  Il n'y a pas de séances pour ce cinéma...
                </Text>
                <Button
                  text="Ajouter une séance !"
                  onPress={() => addSeance()}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styleScreen = StyleSheet.create({
  noSeances: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    color: "#00216d",
    marginVertical: 20,
  },
  addSeance: {
    color: "#1b69bc",
    fontWeight: "800",
    marginTop: 8,
    fontSize: 17,
  },
  buttonAdd: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
  },
});

export default SeanceScreen;
