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
      initialRouteName="Films"
      screenOptions={screenOptions}
    >
      <MovieStack.Screen name="Films" component={MovieScreen} />
      <MovieStack.Screen name="Details" component={DetailsMovieScreen} />
      <MovieStack.Screen name="Create" component={CreateMovieScreen} />
    </MovieStack.Navigator>
  );
};

export default MovieStackNavigator;
