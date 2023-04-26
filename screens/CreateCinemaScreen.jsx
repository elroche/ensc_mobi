import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import Button from "../components/Button";
import styles from "../theme/styles";
import { addCinemaApi } from "../api/CinemaApi";

export const CreateCinemaScreen = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [responsable, setResponsable] = useState("");
  const [prixPlace, setPrixPlace] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitCinema = () => {
    if (
      nom !== "" &&
      adresse !== "" &&
      codePostal !== "" &&
      ville !== "" &&
      responsable !== "" &&
      prixPlace !== ""
    ) {
      try {
        const cinema = addCinemaApi(
          nom,
          adresse,
          codePostal,
          ville,
          responsable,
          prixPlace
        );
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrorMessage("Attention ! Veuillez remplir tous les champs."); // Affichage d'un message d'erreur
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.main && styleScreen.container]}>
          <Text style={styles.title}>Ajouter un cinéma</Text>
          <Text style={styles.text}>
            Afin d'ajouter un cinéma, veuillez saisir les données suivantes :
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
              <Text style={styleScreen.label}>Prix de la place </Text>
              <TextInput
                style={styleScreen.input}
                onChangeText={setPrixPlace}
                value={prixPlace}
              />
            </View>
          </View>
          <Button text="Ajouter" onPress={() => handleSubmitCinema()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateCinemaScreen;

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
