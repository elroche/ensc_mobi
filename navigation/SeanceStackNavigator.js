import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SeanceScreen from "../screens/SeanceScreen";
import { screenOptions } from "../theme/styles";

// Screen stack for user tab
const SeanceStack = createNativeStackNavigator();

const SeanceStackNavigator = () => {
  return (
    <SeanceStack.Navigator
      initialRouteName="Seance"
      screenOptions={screenOptions}
    >
      <SeanceStack.Screen
        name="Seance"
        component={SeanceScreen}
        options={{ title: "Les séances" }}
      />
    </SeanceStack.Navigator>
  );
};

export default SeanceStackNavigator;
