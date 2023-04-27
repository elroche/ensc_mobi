import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import styles from "../theme/styles";
import Button from "../components/Button";
import { editCinemaApi } from "../api/CinemaApi";

const EditCinemaScreen = ({ navigation, route }) => {
  const { cinema } = route.params;
  const cinemaId = cinema.id;
  const [nom, setNom] = useState(cinema.nom);
  const [adresse, setAdresse] = useState(cinema.adresse);
  const [codePostal, setCodePostal] = useState(`${cinema.codePostal}`);
  const [ville, setVille] = useState(cinema.ville);
  const [responsable, setResponsable] = useState(cinema.responsable);
  const [prixPlace, setPrixPlace] = useState(`${cinema.prixPlace}`);
  const [errorMessage, setErrorMessage] = useState("");

  // Fonction appelée lors de la soumission du formulaire d'édition de cinéma
  const handleEditCinema = async () => {
    if (
      nom !== "" &&
      adresse !== "" &&
      codePostal !== "" &&
      ville !== "" &&
      responsable !== "" &&
      prixPlace !== ""
    ) {
      try {
        // Appel à l'API pour modifier le cinéma
        const cinema = editCinemaApi(
          cinemaId,
          nom,
          adresse,
          codePostal,
          ville,
          responsable,
          prixPlace
        );
        navigation.goBack(); // Redirige l'utilisateur vers la page précédente
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrorMessage("Attention ! Veuillez remplir tous les champs."); // Affichage d'un message d'erreur si tous les champs ne sont pas remplis
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.main && styleScreen.container]}>
          <Text style={styles.title}>Modifier un cinéma</Text>
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
              <Text style={styleScreen.label}>Nom</Text>
              <TextInput
                style={styleScreen.input}
                onChangeText={setNom}
                value={nom}
              />
            </View>
            <View style={styleScreen.inputContainer}>
              <Text style={styleScreen.label}>Responsable</Text>
              <TextInput
                style={styleScreen.input}
                onChangeText={setResponsable}
                value={responsable}
              />
            </View>
            <View style={styleScreen.inputContainer}>
              <Text style={styleScreen.label}>Adresse</Text>
              <TextInput
                style={styleScreen.input}
                onChangeText={setAdresse}
                value={adresse}
              />
            </View>
            <View style={styleScreen.inputContainer}>
              <Text style={styleScreen.label}>Code Postal</Text>
              <TextInput
                style={styleScreen.input}
                onChangeText={setCodePostal}
                value={codePostal}
              />
            </View>
            <View style={styleScreen.inputContainer}>
              <Text style={styleScreen.label}>Ville</Text>
              <TextInput
                style={styleScreen.input}
                onChangeText={setVille}
                value={ville}
              />
            </View>
            <View style={styleScreen.inputContainer}>
              <Text style={styleScreen.label}>Prix de la place (€) </Text>
              <TextInput
                style={styleScreen.input}
                onChangeText={setPrixPlace}
                value={prixPlace}
                keyboardType="numeric"
              />
            </View>
          </View>
          <Button text="Modifier" onPress={() => handleEditCinema()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditCinemaScreen;

const styleScreen = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  content: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "600",
    color: "#1F3976",
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
});
