import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import TrainingsScreen from './src/screens/TrainingsScreen';
import GamesScreen from './src/screens/GamesScreen';
import PlayersScreen from './src/screens/PlayersScreen';
import MotivationScreen from './src/screens/MotivationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Trainings" component={TrainingsScreen} />
        <Stack.Screen name="Games" component={GamesScreen} />
        <Stack.Screen name="Players" component={PlayersScreen} />
        <Stack.Screen name="Motivation" component={MotivationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
