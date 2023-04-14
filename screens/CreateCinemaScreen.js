import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React from "react";
import { addCinema } from "../api/CinemaApi";

export const CreateCinemaScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container && styleScreen.container}
      behavior="padding"
    >
      <Text style={styles.title}>Ajouter un cinéma</Text>
      <View style={styleScreen.content}>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Nom</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setNom}
            value={nom}
          />
        </View>
        <View style={styleScreen.inputContainer}>
          <Text style={styleScreen.label}>Durée</Text>
          <TextInput
            style={styleScreen.input}
            onChangeText={setDuree}
            value={duree}
          />
        </View>
      </View>
      <Button text="Ajouter" onPress={() => handleSubmitMovieRoom()} />
    </KeyboardAvoidingView>
  );
};

export default CreateMovieScreen;

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