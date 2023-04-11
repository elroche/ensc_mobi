import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
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
    <View style={styles.container}>
        <View>
        <Text style={styles.title}>{cinema.nom}</Text>
          <Image 
              source={require("../assets/cinemas/salleCinema.webp")}
              style={styleScreen.image}
          />
        <View style={styleScreen.descriptionContainer}>
            <Text style={styleScreen.label}>Adresse :</Text> 
            <Text>{cinema.adresse}, {cinema.codePostal} {cinema.ville}</Text>
            <Text style={{ marginTop: 15 }}> 
                <Text style={styleScreen.label}>Responsable : </Text>
                {cinema.responsable}
            </Text>
            <Text style={{ marginTop: 15 }}> 
                <Text style={styleScreen.label}>Prix d'une place : </Text>
                {cinema.prixPlace}€
            </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button style={styleScreen.editButton} text={"Modifier"} action={() => editCinema()} />
        </View>
      </View>
    </View>
  );
};

export default DetailsCinemaScreen;

const styleScreen = StyleSheet.create({
    label : {
        fontWeight: 700,
    },

    image : {
        width: 300,
        height: 200,
        borderRadius : 20,
        alignSelf: 'center',
    },

    editButton : {
        alignSelf: 'center',
    },

    descriptionContainer : {
        marginTop : 20,
        padding : 10,
        borderRadius : 10,
        backgroundColor : 'white',
    }
});
