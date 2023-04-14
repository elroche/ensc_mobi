import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CinemaScreen from "../screens/CinemaScreen";
import { screenOptions } from "../theme/styles";
import DetailsCinemaScreen from "../screens/DetailsCinemaScreen";
import EditCinemaScreen from "../screens/EditCinemaScreen";
import  CreateCinemaScreen  from "../screens/CreateCinemaScreen";
import MovieRoomsScreen from "../screens/MovieRoomsScreen";



// Screen stack for cinema tab
const CinemaStack = createNativeStackNavigator();

const CinemaStackNavigator = () => {
  return (
    <CinemaStack.Navigator
      initialRouteName="Cinema"
      screenOptions={screenOptions}
    >
      <CinemaStack.Screen
        name="Cinema"
        component={CinemaScreen}
        options={{ title: "Cinémas" }}
      />
      <CinemaStack.Screen
        name="Details"
        component={DetailsCinemaScreen}
        options={{ title: "Détail du cinéma" }}
      />
      <CinemaStack.Screen
        name="Edit"
        component={EditCinemaScreen}
        options={{ title: "Modifier le cinéma" }}
      />
      <CinemaStack.Screen
        name="Create"
        component={CreateCinemaScreen}
        options={{ title: "Ajouter un cinéma" }}
      />
      <CinemaStack.Screen
        name="MovieRooms"
        component={MovieRoomsScreen}
        options={{ title: "Salles du cinéma" }}
      />
    </CinemaStack.Navigator>
  );
};

export default CinemaStackNavigator;
