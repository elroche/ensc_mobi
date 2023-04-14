import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, TextInput } from "react-native";
import styles from "../theme/styles";
import { fetchMovieApi } from "../api/MovieApi";
import Button from "../components/Button";

const EditCinemaScreen = ({ cinema, onSubmit }) => {
    const [nom, setNom] = useState(cinema.nom);
    const [addresse, setAddresse] = useState(cinema.addresse);
    const [codePostal, setCodePostal] = useState(cinema.codePostal);
    const [ville, setVille] = useState(cinema.ville);
    const [prixPlace, setPrixPlace] = useState(cinema.prixPlace);
    const [responsable, setResponsable] = useState(cinema.responsable);
  
    const handleSubmit = () => {
      const updatedCinema = {
        nom,
        addresse,
        prixPlace,
        responsible,
      };
      onSubmit(updatedCinema);
    };
  
    return (
      <View style={styleScreen.container}>
        <Text style={styleScreen.label}>Nom</Text>
        <TextInput
          style={styleScreen.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styleScreen.label}>Adresse</Text>
        <TextInput
          style={styleScreen.input}
          value={address}
          onChangeText={setAddress}
        />
        <Text style={styleScreen.label}>Prix d'une place</Text>
        <TextInput
          style={styleScreen.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Text style={styleScreen.label}>Responsable</Text>
        <TextInput
          style={styleScreen.input}
          value={responsible}
          onChangeText={setResponsible}
        />
        <Button title="Enregistrer" onPress={handleSubmit} />
      </View>
    );
};

export default EditCinemaScreen;


const styleScreen = StyleSheet.create({
  container: {
    margin: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

