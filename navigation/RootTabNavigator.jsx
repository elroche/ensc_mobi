import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import SeanceStackNavigator from "./SeanceStackNavigator";
import CinemaStackNavigator from "./CinemaStackNavigator";
import MovieStackNavigator from "./MovieStackNavigator";

const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Icons will be different if the tab is focused
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Accueil") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Les cinémas") {
              iconName = focused ? "warehouse" : "warehouse";
            } else if (route.name === "Les films") {
              iconName = focused ? "movie-open" : "movie-open-outline";
            } else if (route.name === "Les séances") {
              iconName = focused
                ? "ticket-confirmation"
                : "ticket-confirmation-outline";
            }
            // You can return any component that you like here!
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#1F3976",
          tabBarInactiveTintColor: "gray",
          // Hiding tab navigator header to show only stack header
          headerShown: false,
        })}
      >
        <Tab.Screen name="Accueil" component={HomeStackNavigator} />
        <Tab.Screen name="Les cinémas" component={CinemaStackNavigator} />
        <Tab.Screen name="Les films" component={MovieStackNavigator} />
        <Tab.Screen name="Les séances" component={SeanceStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootTabNavigator;
