import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import styles from "../theme/styles";
import { fetchCinemasApi } from "../api/CinemaApi";
import { fetchCinemasByVilleApi } from "../api/CinemaApi";


const CinemaScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cinemas, setCinemas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrer les cinémas selon la recherche de l'utilisateur
  const filteredCinemas = cinemas.filter((cinema) => {
    return cinema.ville.toLowerCase().includes(searchQuery.toLowerCase());
  });
  

  // Cette fonction permet de récupérer la liste de tous les cinémas
  const loadCinemas = async () => {
    setLoading(true);
    setError(false);
    try {
      let cinemas = [];
      if (searchQuery) {
        cinemas = await fetchCinemasByVilleApi(searchQuery);
      } else {
        cinemas = await fetchCinemasApi();
      }
      setCinemas(cinemas);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Charger la liste de tous les cinémas lorsqu'on arrive sur la page
    const unsubscribe = navigation.addListener('focus', () => {
      loadCinemas();
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    // Afficher un indicateur de chargement si la page est en train de charger
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1b69bc" />
      </View>
    );
  }

  if (error) {
    // Afficher un message d'erreur si une erreur se produit lors de la récupération de la liste des cinémas
    return (
      <View style={styles.container}>
        <Text>Une erreur s'est produite dans la récupération des cinemas</Text>
      </View>
    );
  }

  // Cette fonction est appelée lorsqu'on clique sur un cinéma
  const onPressCinema = (cinema) => {
    navigation.navigate("Details", { cinemaId: cinema.id });
  };

  // Cette fonction est appelée lorsqu'on clique sur le bouton "Ajouter un cinéma"
  const addCinema = () => {
    navigation.navigate("Create");
  };
  
  // Afficher la liste de tous les cinémas filtrés par la recherche de l'utilisateur
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher par ville"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <ScrollView>
        {filteredCinemas.map((cinema) => (
          <TouchableOpacity
            key={cinema.id}
            style={styles.cinemaContainer}
            onPress={() => onPressCinema(cinema)}
          >
            <Text style={styles.cinemaName}>{cinema.nom}</Text>
            <Text style={styles.cinemaLocation}>{cinema.ville}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.buttonContainer} onPress={addCinema}>
          <Text style={styles.buttonText}>Ajouter un cinéma</Text>
        </TouchableOpacity>
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
  searchBar: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize : 14,
  },
});

export default CinemaScreen;
