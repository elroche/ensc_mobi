import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CinemaScreen from "../screens/CinemaScreen";
import { screenOptions } from "../theme/styles";

// Screen stack for cinema tab
const CinemaStack = createNativeStackNavigator();

const CinemaStackNavigator = () => {
  return (
    <CinemaStack.Navigator
      initialRouteName="User"
      screenOptions={screenOptions}
    >
      <CinemaStack.Screen name="User" component={CinemaScreen} />
    </CinemaStack.Navigator>
  );
};

export default CinemaStackNavigator;
