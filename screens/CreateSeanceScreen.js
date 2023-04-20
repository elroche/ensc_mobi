import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../theme/styles";
import Button from "../components/Button";
import { addSeance } from "../api/SeanceApi";

export const CreateSeanceScreen = ({ navigation }) => {
  const [date, setDate] = useState("");
  const [filmId, setFilmId] = useState("");
  const [salleId, setSalleId] = useState("");
  const [cinemaId, setCinemaId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitSeance = () => {
    if (date !== "" && filmId !== "" && salleId !== "" && cinemaId !== "") {
      try {
        const seance = addSeance(date, filmId, salleId, cinemaId);
        console.log("New seance created:", seance);
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
    <KeyboardAvoidingView
      style={styles.container && styleScreen.container}
      behavior="padding"
    >
      <Text style={styles.title}>Ajouter une séance</Text>
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
          <Text style={styleScreen.label}>Date</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setDate}
            value={date}
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <View style={styleScreen.inputContainer}>
            <Text style={styleScreen.label}>Cinéma</Text>
            <TextInput
              style={styleScreen.input}
              onChangeText={setCinemaId}
              value={cinemaId}
            />
          </View>
          <Text style={styleScreen.label}>Film</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setFilmId}
            value={filmId}
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Salle</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setSalleId}
            value={salleId}
          />
        </View>
      </View>
      <Button text="Ajouter" onPress={() => handleSubmitSeance()} />
    </KeyboardAvoidingView>
  );
};

export default CreateSeanceScreen;

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
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
});
