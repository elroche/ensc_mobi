import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import styles from "../theme/styles";
import Button from "../components/Button";
import { addMovieRoomApi } from "../api/MovieRoomApi";
import { fetchCinemasApi } from "../api/CinemaApi";

const CreateMovieRoomScreen = ({ navigation }) => {
  const [cinema, setCinema] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinemaId, setSelectedCinemaId] = useState(null);
  const [nbPlace, setNbPlace] = useState("");
  const [numeroSalle, setNumeroSalle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Récupérer la liste des cinémas et mettre à jour l'état "cinemas"
    const fetchCinemas = async () => {
      const cinemas = await fetchCinemasApi();
      setCinemas(cinemas);
    };
    fetchCinemas();
  }, []);

  const handleCinemaChange = async (selectedCinemaId) => {
    // Mettre à jour l'état "selectedCinemaId" avec la nouvelle valeur
    setSelectedCinemaId(selectedCinemaId);
    // Trouver le cinéma sélectionné à partir de la liste "cinemas"
    const selectedCinema = cinemas.find((c) => c.id === selectedCinemaId);
    // Mettre à jour l'état "cinema" avec le cinéma sélectionné
    setCinema(selectedCinema);
  };

  const handleCreateMovieRoom = async () => {
    // Vérifier si tous les champs sont remplis avant d'envoyer la requête au serveur
    if (selectedCinemaId !== "" && nbPlace !== "" && numeroSalle !== "") {
      try {
        // Ajouter une nouvelle salle de cinéma en appelant l'API addMovieRoomApi avec les informations saisies par l'utilisateur
        const movieRoom = await addMovieRoomApi(
          selectedCinemaId,
          nbPlace,
          numeroSalle
        );
        // Retourner à la page précédente
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    } else {
      // Afficher un message d'erreur si tous les champs ne sont pas remplis
      setErrorMessage("Attention ! Veuillez remplir tous les champs.");
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.main && styleScreen.container]}>
          <Text style={styles.title}>Ajouter une salle</Text>
          <Text style={styles.text}>
            Afin d'ajouter une salle, veuillez saisir les données suivantes :
          </Text>
          <View style={styleScreen.content}>
            {errorMessage ? (
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                  fontSize: 16,
                  paddingVertical: 10,
                }}
              >
                {errorMessage}
              </Text>
            ) : null}
            <View style={styleScreen.inputContainer}>
              <Text style={styleScreen.label}>Cinéma :</Text>
              <Picker
                itemStyle={styleScreen.pickerScreen}
                selectedValue={selectedCinemaId}
                onValueChange={handleCinemaChange}
              >
                <Picker.Item label="Choisir un cinéma" value="" />
                {cinemas.map((cinema) => (
                  <Picker.Item
                    key={cinema.id}
                    label={cinema.nom}
                    value={cinema.id}
                  />
                ))}
              </Picker>
            </View>
            <View style={styleScreen.inputContainer}>
              <Text style={styleScreen.label}>Nombre de place :</Text>
              <TextInput
                style={styleScreen.input}
                onChangeText={setNbPlace}
                value={nbPlace}
                keyboardType="numeric"
              />
            </View>
            <View style={styleScreen.inputContainer}>
              <Text style={styleScreen.label}>Numéro de la salle :</Text>
              <TextInput
                style={styleScreen.input}
                onChangeText={setNumeroSalle}
                value={numeroSalle}
                keyboardType="numeric"
              />
            </View>
          </View>
          <Button text="Ajouter" onPress={() => handleCreateMovieRoom()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMovieRoomScreen;

const styleScreen = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 15,
  },
  content: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1F3976",
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  pickerScreen: {
    height: 100,
    fontSize: 14,
  },
});
