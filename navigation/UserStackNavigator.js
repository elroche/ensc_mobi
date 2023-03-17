import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "../screens/UserScreen";
import { screenOptions } from "../theme/styles";

// Screen stack for user tab
const UserStack = createNativeStackNavigator();

const UserStackNavigator = () => {
  return (
    <UserStack.Navigator initialRouteName="User" screenOptions={screenOptions}>
      <UserStack.Screen name="User" component={UserScreen} />
    </UserStack.Navigator>
  );
};

export default UserStackNavigator;
