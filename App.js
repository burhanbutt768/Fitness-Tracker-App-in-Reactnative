import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddWorkoutScreen from './screens/AddWorkoutScreen';
import ViewWorkoutScreen from './screens/ViewWorkoutScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Add Workout" component={AddWorkoutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="View Workout" component={ViewWorkoutScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
