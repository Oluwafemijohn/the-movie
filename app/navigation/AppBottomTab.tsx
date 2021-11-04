import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppNavigation from "./AppNavigation";
import FavouritesScreen from "../screens/FavouritesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function AppBottomTab() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Movies"
          component={AppNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="movie" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Favourites"
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
