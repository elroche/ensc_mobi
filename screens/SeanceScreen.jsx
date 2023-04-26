import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import styles from "../theme/styles";
import Button from "../components/Button";
import { fetchSeancesApi } from "../api/SeanceApi";
import { fetchCinemasApi } from "../api/CinemaApi";
import SeanceCard from "../components/SeanceCard";
import { Picker } from "@react-native-picker/picker";
import { deleteSeanceApi } from "../api/SeanceApi";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconButton from "../components/IconButton";

const SeanceScreen = ({ navigation }) => {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [seances, setSeances] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [showBox, setShowBox] = useState(true);

  const showConfirmDialog = (seance) => {
    return Alert.alert(
      "Êtes-vous sûr(e) ?",
      "Êtes-vous sûr(e) de vouloir supprimer la séance ?",
      [
        // Le bouton Oui
        {
          text: "Oui",
          onPress: () => {
            handleDeleteSeance(seance.id);
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

  const handleDeleteSeance = async (id) => {
    setShowBox(false);
    await deleteSeanceApi(id);
  };

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

  const onEditSeance = async (seance) => {
    navigation.navigate("Edit", { seance: seance });
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerDelimiter}>
          <Text style={styles.title}>Les séances</Text>
        </View>
        <IconButton onPress={() => addSeance()} color="#1F3976">
          <MaterialCommunityIcons name={"plus"} size={20} color="white" />
        </IconButton>
      </View>

      <View style={styleScreen.selectContainer}>
        <Text style={styleScreen.subtitle}>
          Veuillez sélectionner le cinéma :
        </Text>
        <Picker
          itemStyle={styleScreen.pickerScreen}
          selectedValue={selectedCinema}
          onValueChange={(itemValue) => setSelectedCinema(itemValue)}
        >
          <Picker.Item label="Choisir un cinéma" value="" />
          {cinemas.map((cinema) => (
            <Picker.Item key={cinema.id} label={cinema.nom} value={cinema.id} />
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
        <ScrollView>
          <View style={styles.main}>
            {filterSeancesByCinema().length > 0 ? (
              filterSeancesByCinema().map((seance) => {
                return (
                  <SeanceCard
                    key={seance.id}
                    item={seance}
                    onDelete={() => showConfirmDialog(seance)}
                    onEdit={() => onEditSeance(seance)}
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
        </ScrollView>
      )}
    </SafeAreaView>
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
    paddingHorizontal: 10,
  },
  pickerScreen: {
    height: 120,
    fontSize: 17,
    marginVertical: 10,
  },
});

export default SeanceScreen;
