import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styles from "../theme/styles";
import Button from "../components/Button";
import CinemaCard from "../components/CinemaCard";
import { fetchCinemasApi } from "../api/CinemaApi";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "../components/IconButton";

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
    navigation.navigate("Details", { cinemaId: cinema.id });
  };

  const addCinema = () => {
    navigation.navigate("Create");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styleScreen.header}>
        <Text style={styles.title}>Les cinémas disponibles</Text>
        <IconButton onPress={() => addCinema()} color="#1b69bc">
          <MaterialCommunityIcons name={"plus"} size={20} color="white" />
        </IconButton>
      </View>
      <ScrollView>
        <View style={styles.main}>
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
              <Button
                text={"Ajouter un cinema !"}
                onPress={() => addCinema()}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styleScreen = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginBottom: 7,
    paddingHorizontal: 10,
  },
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
