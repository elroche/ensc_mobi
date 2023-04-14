import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CinemaScreen from "../screens/CinemaScreen";
import { screenOptions } from "../theme/styles";
import DetailsCinemaScreen from "../screens/DetailsCinemaScreen";
import EditCinemaScreen from "../screens/EditCinemaScreen";

// Screen stack for cinema tab
const CinemaStack = createNativeStackNavigator();

const CinemaStackNavigator = () => {
  return (
    <CinemaStack.Navigator
      initialRouteName="Cinema"
      screenOptions={screenOptions}
    >
      <CinemaStack.Screen name="Cinema" component={CinemaScreen} />
      <CinemaStack.Screen name="Details" component={DetailsCinemaScreen} />
      <CinemaStack.Screen name="Edit" component={EditCinemaScreen} />
    </CinemaStack.Navigator>
  );
};

export default CinemaStackNavigator;
