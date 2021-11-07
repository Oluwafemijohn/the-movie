import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieListScreen from "../screens/MovieListScreen";
import MovieDetailsScreen from "../screens/MovieDetailsScreen";
import Route from "./Route";
import TrailersScreen from "../screens/TrailerScreen";

const Stack = createNativeStackNavigator();
function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
        // headerShown: false,
      }}
    >
      <Stack.Screen name={Route.MOVIES} component={MovieListScreen} />
      <Stack.Screen
        name={Route.MOVIE_DETAILS_SCREEN}
        component={MovieDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Route.TRAILERS}
        component={TrailersScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;
