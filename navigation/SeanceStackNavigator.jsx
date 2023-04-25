import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SeanceScreen from "../screens/SeanceScreen";
import { screenOptions } from "../theme/styles";
import CreateSeanceScreen from "../screens/CreateSeanceScreen";
import EditSeanceScreen from "../screens/EditSeanceScreen";



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
      <SeanceStack.Screen
        name="Create"
        component={CreateSeanceScreen}
        options={{ title: "Ajouter une séance" }}
      />
      <SeanceStack.Screen
        name="Edit"
        component={EditSeanceScreen}
        options={{ title: "Modifier la séance" }}
      />
    </SeanceStack.Navigator>
  );
};

export default SeanceStackNavigator;
