import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from "react-native";
import styles from "../theme/styles";
import { fetchCinemaApi } from "../api/CinemaApi";
import Button from "../components/Button";


const DetailsCinemaScreen = ({ navigation, route }) => {
  const { cinemaId } = route.params;
  const [cinema, setCinema] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: cinema.nom });
  }, [cinema.nom]);

  const loadCinema = async () => {
    setLoading(true);
    setError(false);

    try {
      const cinema = await fetchCinemaApi(cinemaId);
      setCinema(cinema);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCinema();
  }, []);

  const editCinema = async() => {
    navigation.navigate("Edit", {cinemaId: cinemaId})
  }

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
        <Text>Une erreur s'est produite dans la récupération du film</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>{cinema.nom}</Text>
          <Image 
              source={require("../assets/cinemas/salleCinema.webp")}
              style={styleScreen.image}
          />
        <View style={styles.descriptionContainer}>
            <Text style={styles.labelDetails}>Adresse :</Text> 
            <Text>{cinema.adresse}, {cinema.codePostal} {cinema.ville}</Text>
            <Text style={{ marginTop: 15 }}> 
                <Text style={styles.labelDetails}>Responsable : </Text>
                {cinema.responsable}
            </Text>
            <Text style={{ marginTop: 15 }}> 
                <Text style={styles.labelDetails}>Prix d'une place : </Text>
                {cinema.prixPlace}€
            </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button style={{alignSelf: 'center'}} text={"Modifier"} onPress={() => editCinema()} />
        </View>
    </ScrollView>
  );
};

export default DetailsCinemaScreen;

const styleScreen = StyleSheet.create({

    image : {
        width: 300,
        height: 200,
        borderRadius : 20,
        alignSelf: 'center',
    },

    editButton : {
        alignSelf: 'center',
    },
});
