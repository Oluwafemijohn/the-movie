import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppNavigation from "./AppNavigation";
import FavouritesScreen from "../screens/FavouritesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import Route from "./Route";
import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();

function AppBottomTab() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={Route.MOVIES_TAB}
          component={AppNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="movie" size={size} color={color} />
            ),
            title: "Movies",
          }}
        />
        <Tab.Screen
          name={Route.SEARCH}
          component={SearchScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <AntDesign name="search1" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={Route.FAVORITES}
          component={FavouritesScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="favorite" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppBottomTab;
