import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieScreen from "../screens/MovieScreen";
import { screenOptions } from "../theme/styles";

// Screen stack for movie tab
const MovieStack = createNativeStackNavigator();

const MovieStackNavigator = () => {
  return (
    <MovieStack.Navigator
      initialRouteName="Movie"
      screenOptions={screenOptions}
    >
      <MovieStack.Screen name="Movie" component={MovieScreen} />
    </MovieStack.Navigator>
  );
};

export default MovieStackNavigator;
