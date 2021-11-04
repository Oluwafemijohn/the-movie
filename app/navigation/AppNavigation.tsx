import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieListScreen from '../screens/MovieListScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

const Stack = createNativeStackNavigator();
function AppNavigation() {
    return (
        <Stack.Navigator >
          <Stack.Screen name="MovieListScreen" component={MovieListScreen} />
          <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} />
        </Stack.Navigator>
    );
}

export default AppNavigation;