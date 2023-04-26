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
import Button from "../components/Button";
import CinemaCard from "../components/CinemaCard";
import { fetchCinemasApi } from "../api/CinemaApi";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "../components/IconButton";
import { fetchCinemasByVilleApi } from "../api/CinemaApi";


const CinemaScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cinemas, setCinemas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCinemas = cinemas.filter((cinema) => {
    return cinema.ville.toLowerCase().includes(searchQuery.toLowerCase());
  });
  

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
    const unsubscribe = navigation.addListener('focus', () => {
      loadCinemas();
    });
    return unsubscribe;
  }, [navigation]);

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
      <View style={styles.header}>
        <View style={styles.headerDelimiter}>
          <Text style={styles.title}>Les cinémas</Text>
        </View>
        <IconButton onPress={() => addCinema()} color="#1F3976">
          <MaterialCommunityIcons name={"plus"} size={20} color="white" />
        </IconButton>
      </View>
      <View>
        <TextInput
          placeholder="Rechercher un cinéma par ville"
          style={styleScreen.searchBar}
          onChangeText={(text) => setSearchQuery(text)}
         />
      </View>
      <ScrollView>
        <View style={styles.main}>
          {filteredCinemas.length > 0 ? (
            filteredCinemas.map((cinema) => {
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
                Aucun cinéma ne correspond à votre recherche...
              </Text>
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
