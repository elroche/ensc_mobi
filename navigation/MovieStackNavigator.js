import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieScreen from "../screens/MovieScreen";
import { screenOptions } from "../theme/styles";
import DetailsMovieScreen from "../screens/DetailsMovieScreen";
import CreateMovieScreen from "../screens/CreateMovieScreen";

// Screen stack for movie tab
const MovieStack = createNativeStackNavigator();

const MovieStackNavigator = () => {
  return (
    <MovieStack.Navigator
      initialRouteName="Movie"
      screenOptions={screenOptions}
    >
      <MovieStack.Screen
        name="Movie"
        component={MovieScreen}
        options={{ title: "Films" }}
      />
      <MovieStack.Screen
        name="Details"
        component={DetailsMovieScreen}
        options={{ title: "Détail d'un film" }}
      />
      <MovieStack.Screen
        name="Create"
        component={CreateMovieScreen}
        options={{ title: "Ajouter un film" }}
      />
    </MovieStack.Navigator>
  );
};

export default MovieStackNavigator;
